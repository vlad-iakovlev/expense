import { Db } from 'mongodb'

const collectionNames = ['Group', 'Wallet', 'Operation']

export const apply = async (db: Db) => {
  for (const collectionName of collectionNames) {
    await db
      .collection(collectionName)
      .updateMany({}, { $set: { removed: false } })
  }
}
