import { Db } from 'mongodb'

export const apply = async (db: Db) => {
  const userGroups = await db
    .collection('UserGroup')
    .find({}, { projection: { _id: true } })
    .toArray()

  const groups = await db
    .collection('Group')
    .find({}, { projection: { _id: true } })
    .toArray()

  const wallets = await db
    .collection('Wallet')
    .find({}, { projection: { _id: true } })
    .toArray()

  const operations = await db
    .collection('Operation')
    .find({}, { projection: { _id: true } })
    .toArray()

  const { insertedId } = await db.collection('Transaction').insertOne({
    createdAt: new Date(),
    updatedAt: new Date(),
    draft: false,
    userGroupIds: userGroups.map((userGroup) => userGroup._id),
    groupIds: groups.map((group) => group._id),
    walletIds: wallets.map((wallet) => wallet._id),
    operationIds: operations.map((operation) => operation._id),
  })

  await db
    .collection('UserGroup')
    .updateMany({}, { $set: { transactionIds: [insertedId] } })

  await db
    .collection('Group')
    .updateMany({}, { $set: { transactionIds: [insertedId] } })

  await db
    .collection('Wallet')
    .updateMany({}, { $set: { transactionIds: [insertedId] } })

  await db
    .collection('Operation')
    .updateMany({}, { $set: { transactionIds: [insertedId] } })
}
