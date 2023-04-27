import assert from 'assert'
import { MongoClient } from 'mongodb'

export const apply = async () => {
  assert(process.env.DATABASE_URL, 'DATABASE_URL is not defined')
  const client = new MongoClient(process.env.DATABASE_URL)

  try {
    await client.connect()
    const db = client.db()

    const collectionNames = [
      'Account',
      'Session',
      'User',
      'VerificationToken',
      'Group',
      'Wallet',
      'Operation',
    ]

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
  } finally {
    await client.close()
  }
}
