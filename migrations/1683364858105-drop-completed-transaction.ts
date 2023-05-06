import { Db, ObjectId } from 'mongodb'

interface CompletedTransaction {
  createdAt: Date
  transactionId: ObjectId
}

export const apply = async (db: Db) => {
  const completedTransactions = await db
    .collection<CompletedTransaction>('CompletedTransaction')
    .find({}, { projection: { createdAt: true, transactionId: true } })
    .toArray()

  for (const completedTransaction of completedTransactions) {
    await db
      .collection('Transaction')
      .updateOne(
        { _id: completedTransaction.transactionId },
        { $set: { completedAt: completedTransaction.createdAt } }
      )
  }

  await db.collection('CompletedTransaction').drop()
}
