import assert from 'assert'
import { MongoClient } from 'mongodb'

export const apply = async () => {
  assert(process.env.DATABASE_URL, 'DATABASE_URL is not defined')
  const client = new MongoClient(process.env.DATABASE_URL)

  try {
    await client.connect()
    const db = client.db()

    await db
      .collection('Account')
      .updateMany(
        { createdAt: { $eq: null } },
        { $set: { createdAt: new Date() } }
      )
    await db
      .collection('Account')
      .updateMany(
        { updatedAt: { $eq: null } },
        { $set: { updatedAt: new Date() } }
      )

    await db
      .collection('Session')
      .updateMany(
        { createdAt: { $eq: null } },
        { $set: { createdAt: new Date() } }
      )
    await db
      .collection('Session')
      .updateMany(
        { updatedAt: { $eq: null } },
        { $set: { updatedAt: new Date() } }
      )

    await db
      .collection('User')
      .updateMany(
        { createdAt: { $eq: null } },
        { $set: { createdAt: new Date() } }
      )
    await db
      .collection('User')
      .updateMany(
        { updatedAt: { $eq: null } },
        { $set: { updatedAt: new Date() } }
      )

    await db
      .collection('VerificationToken')
      .updateMany(
        { createdAt: { $eq: null } },
        { $set: { createdAt: new Date() } }
      )
    await db
      .collection('VerificationToken')
      .updateMany(
        { updatedAt: { $eq: null } },
        { $set: { updatedAt: new Date() } }
      )

    await db
      .collection('Currency')
      .updateMany(
        { createdAt: { $eq: null } },
        { $set: { createdAt: new Date() } }
      )
    await db
      .collection('Currency')
      .updateMany(
        { updatedAt: { $eq: null } },
        { $set: { updatedAt: new Date() } }
      )

    await db
      .collection('Group')
      .updateMany(
        { createdAt: { $eq: null } },
        { $set: { createdAt: new Date() } }
      )
    await db
      .collection('Group')
      .updateMany(
        { updatedAt: { $eq: null } },
        { $set: { updatedAt: new Date() } }
      )

    await db
      .collection('Wallet')
      .updateMany(
        { createdAt: { $eq: null } },
        { $set: { createdAt: new Date() } }
      )
    await db
      .collection('Wallet')
      .updateMany(
        { updatedAt: { $eq: null } },
        { $set: { updatedAt: new Date() } }
      )

    await db
      .collection('Operation')
      .updateMany(
        { createdAt: { $eq: null } },
        { $set: { createdAt: new Date() } }
      )
    await db
      .collection('Operation')
      .updateMany(
        { updatedAt: { $eq: null } },
        { $set: { updatedAt: new Date() } }
      )
  } finally {
    await client.close()
  }
}
