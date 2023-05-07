import { Db } from 'mongodb'

export const apply = async (db: Db) => {
  const groups = await db.collection('Group').find({}).toArray()

  const userGroups = groups
    .map((group) =>
      (group.userIds as string[]).map((userId) => ({
        createdAt: new Date(),
        updatedAt: new Date(),
        removed: group.removed as boolean,
        userId,
        groupId: group._id,
      }))
    )
    .flat()

  if (userGroups.length) {
    await db.collection('UserGroup').insertMany(userGroups)
  }

  await db.collection('User').updateMany({}, { $unset: { groupId: '' } })
  await db.collection('Group').updateMany({}, { $unset: { userIds: '' } })
}
