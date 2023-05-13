import assert from 'assert'
import * as fns from 'date-fns'
import * as fs from 'fs'
import { parseArgs } from 'util'
import { formatDateTime } from '../utils/formatDate.ts'
import { parseAmount } from '../utils/parseAmount.ts'
import { prisma } from '../utils/server/prisma.ts'
import { uniqBy } from '../utils/uniqBy.ts'

interface CsvWallet {
  id: string
  name: string
  currency: string
}

interface CsvOperation {
  name: string
  category: string
  date: Date
  incomeAmount: number
  expenseAmount: number
  incomeWallet: string | null
  expenseWallet: string | null
}

const readCsv = async (path: string, adjustDates?: boolean) => {
  const file = await fs.promises.readFile(path, 'utf8')
  const rows = file
    .split(/(?:\r\n|\r|\n)/)
    .filter(Boolean)
    .map((row) => row.split(','))

  const header = rows[0]
  const data = rows.slice(1)

  const rawData = data.reduce<Record<string, string>[]>((acc, row) => {
    const entry = row.reduce<Record<string, string>>((acc, value, index) => {
      acc[header[index]] = value
      return acc
    }, {})

    acc.push(entry)
    return acc
  }, [])

  const wallets = uniqBy(
    rawData.reduce<CsvWallet[]>((acc, entry) => {
      if (entry['Income Wallet']) {
        acc.push({
          id: `${entry['Income Wallet']} ${entry['Income Currency']}`,
          name: entry['Income Wallet'],
          currency: entry['Income Currency'],
        })
      }

      if (entry['Expense Wallet']) {
        acc.push({
          id: `${entry['Expense Wallet']} ${entry['Expense Currency']}`,
          name: entry['Expense Wallet'],
          currency: entry['Expense Currency'],
        })
      }

      return acc
    }, []),
    (wallet) => wallet.id
  )

  const operations = rawData.map<CsvOperation>((entry) => ({
    name: entry.Description,
    category: entry.Category,
    date: new Date(`${entry.Date}T${entry.Time}${adjustDates ? '' : 'Z'}`),
    incomeAmount: parseAmount(entry['Income Amount'] || '0'),
    expenseAmount: parseAmount(entry['Expense Amount'] || '0'),
    incomeWallet: entry['Income Wallet']
      ? `${entry['Income Wallet']} ${entry['Income Currency']}`
      : null,
    expenseWallet: entry['Expense Wallet']
      ? `${entry['Expense Wallet']} ${entry['Expense Currency']}`
      : null,
  }))

  if (adjustDates) {
    const maxDate = operations.reduce(
      (acc, operation) => (operation.date > acc ? operation.date : acc),
      new Date(0)
    )
    const diff = fns.differenceInCalendarDays(new Date(), maxDate) - 1

    operations.forEach((operation) => {
      operation.date = fns.addDays(operation.date, diff)
    })
  }

  return { wallets, operations }
}

void (async () => {
  try {
    const args = parseArgs({
      options: {
        file: {
          type: 'string',
        },
        userId: {
          type: 'string',
        },
        currency: {
          type: 'string',
        },
        adjustDates: {
          type: 'boolean',
        },
      },
    })
    assert(args.values.file, 'file is not defined')
    assert(args.values.userId, 'userId is not defined')
    assert(args.values.currency, 'currency is not defined')

    const csvData = await readCsv(args.values.file, args.values.adjustDates)

    const transaction = await prisma.transaction.create({
      data: {},
      select: { id: true },
    })

    const group = await prisma.group.create({
      data: {
        name: `Imported on ${formatDateTime(new Date())}`,
        defaultCurrency: { connect: { symbol: args.values.currency } },
        userGroups: {
          create: {
            user: { connect: { id: args.values.userId } },
            transactions: { connect: { id: transaction.id } },
          },
        },
        transactions: { connect: { id: transaction.id } },
      },
      select: { id: true },
    })

    const wallets = await prisma.$transaction(
      csvData.wallets.map((wallet) =>
        prisma.wallet.create({
          data: {
            name: wallet.name,
            currency: { connect: { symbol: wallet.currency } },
            group: { connect: { id: group.id } },
            transactions: { connect: { id: transaction.id } },
          },
          select: {
            id: true,
            name: true,
            currency: { select: { symbol: true } },
          },
        })
      )
    )

    const walletIdsMap = wallets.reduce<Record<string, string>>(
      (acc, wallet) => {
        acc[`${wallet.name} ${wallet.currency.symbol}`] = wallet.id
        return acc
      },
      {}
    )

    await prisma.$transaction(
      csvData.operations.map((operation) =>
        prisma.operation.create({
          data: {
            name: operation.name,
            category: operation.category,
            date: operation.date,
            incomeAmount: operation.incomeAmount,
            expenseAmount: operation.expenseAmount,
            incomeWallet: operation.incomeWallet
              ? { connect: { id: walletIdsMap[operation.incomeWallet] } }
              : undefined,
            expenseWallet: operation.expenseWallet
              ? { connect: { id: walletIdsMap[operation.expenseWallet] } }
              : undefined,
            transactions: { connect: { id: transaction.id } },
          },
          select: { id: true },
        })
      )
    )

    await prisma.transaction.update({
      where: { id: transaction.id },
      data: { completedAt: new Date() },
      select: { id: true },
    })

    process.exit(0)
  } catch (error) {
    console.error(error)
    process.exit(1)
  }
})()
