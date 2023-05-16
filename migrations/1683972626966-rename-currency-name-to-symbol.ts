import { Db } from 'mongodb'

export const apply = async (db: Db) => {
  try {
    await db.collection('Currency').dropIndexes()
  } catch (error) {}

  await db
    .collection('Currency')
    .updateMany({}, { $rename: { name: 'symbol' } })
}
