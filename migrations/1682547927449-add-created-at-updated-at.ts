import { Db } from 'mongodb'

const collectionNames = [
  'Account',
  'Session',
  'User',
  'VerificationToken',
  'Currency',
  'Group',
  'Wallet',
  'Operation',
]

export const apply = async (db: Db) => {
  for (const collectionName of collectionNames) {
    await db
      .collection(collectionName)
      .updateMany(
        { createdAt: { $eq: null } },
        { $set: { createdAt: new Date() } }
      )
    await db
      .collection(collectionName)
      .updateMany(
        { updatedAt: { $eq: null } },
        { $set: { updatedAt: new Date() } }
      )
  }
}

export const rollback = async (db: Db) => {
  for (const collectionName of collectionNames) {
    await db
      .collection(collectionName)
      .updateMany({}, { $unset: { createdAt: '', updatedAt: '' } })
  }
}
