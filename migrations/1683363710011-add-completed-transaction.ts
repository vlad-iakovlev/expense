import { Db } from 'mongodb'

export const apply = async (db: Db) => {
  const transactions = await db
    .collection<{ updatedAt: Date }>('Transaction')
    .find({ draft: false }, { projection: { _id: true, updatedAt: true } })
    .toArray()

  await db.collection('CompletedTransaction').insertMany(
    transactions.map((transaction) => ({
      createdAt: transaction.updatedAt,
      updatedAt: transaction.updatedAt,
      transactionId: transaction._id,
    })),
  )

  await db.collection('Transaction').updateMany({}, { $unset: { draft: '' } })
}
