import { Transaction } from '@expense/prisma'
import { Modify } from '@/types/utility.js'

export type CompletedTransaction = Modify<Transaction, { completedAt: Date }>
