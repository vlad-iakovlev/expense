import { PrismaClient } from '@prisma/client'
import { INITIAL_BALANCE } from '../constants'

export class Expense {
  private groupId = ''

  constructor(private prisma: PrismaClient) {}

  async createWallet(data: {
    name: string
    currency: string
    balance: number
  }) {
    return await this.prisma.wallet.create({
      data: {
        groupId: this.groupId,
        name: data.name,
        currency: data.currency,
        operations: {
          create: [
            {
              description: INITIAL_BALANCE,
              amount: data.balance,
              category: INITIAL_BALANCE,
            },
          ],
        },
      },
    })
  }

  async updateWallet(id: string, data: { name: string; currency: string }) {
    return await this.prisma.wallet.update({
      where: {
        id,
        groupId: this.groupId,
      },
      data: {
        name: data.name,
        currency: data.currency,
      },
    })
  }

  async getWallet(id: string) {
    return await this.prisma.wallet.findFirst({
      where: {
        id,
        groupId: this.groupId,
      },
    })
  }

  async getWallets() {
    return await this.prisma.wallet.findMany({
      where: {
        groupId: this.groupId,
      },
    })
  }

  async createOperation(data: {
    description: string
    amount: number
    category: string
    walletId: string
  }) {
    return await this.prisma.operation.create({
      data: {
        description: data.description,
        amount: data.amount,
        category: data.category,
        walletId: data.walletId,
      },
    })
  }

  async updateOperation(
    id: string,
    data: {
      description: string
      amount: number
      category: string
      walletId: string
    }
  ) {
    return await this.prisma.operation.update({
      where: {
        wallet: {
          groupId: this.groupId,
        },
        id,
      },
      data: {
        description: data.description,
        amount: data.amount,
        category: data.category,
        walletId: data.walletId,
      },
    })
  }

  async deleteOperation(id: string) {
    await this.prisma.operation.delete({
      where: {
        wallet: {
          groupId: this.groupId,
        },
        id,
      },
    })
  }

  async getOperation(id: string) {
    return await this.prisma.operation.findFirst({
      where: {
        wallet: {
          groupId: this.groupId,
        },
        id,
      },
    })
  }

  async getOperationWithWallet(id: string) {
    return await this.prisma.operation.findFirst({
      where: {
        wallet: {
          groupId: this.groupId,
        },
        id,
      },
      include: {
        wallet: true,
      },
    })
  }

  async getLastOperations(params: { walletId?: string; count: number }) {
    const operations = await this.prisma.operation.findMany({
      where: {
        wallet: {
          id: params.walletId,
          groupId: this.groupId,
        },
      },
      orderBy: {
        date: 'desc',
      },
      take: params.count,
    })
    return operations.reverse()
  }

  async getBalances() {
    const wallets = await this.getWallets()

    return Promise.all(
      wallets.map(async (wallet) => {
        const aggregations = await this.prisma.operation.aggregate({
          where: {
            wallet,
          },
          _sum: {
            amount: true,
          },
        })

        return {
          wallet,
          balance: aggregations._sum.amount || 0,
        }
      })
    )
  }

  async renameCategory(from: string, to: string) {
    await this.prisma.operation.updateMany({
      where: {
        wallet: {
          groupId: this.groupId,
        },
        category: from,
      },
      data: {
        category: to,
      },
    })
  }

  async getCategories() {
    const items = await this.prisma.operation.groupBy({
      where: {
        wallet: {
          groupId: this.groupId,
        },
        category: {
          not: INITIAL_BALANCE,
        },
      },
      by: ['category'],
      orderBy: {
        category: 'asc',
      },
    })
    return items.map((item) => item.category)
  }
}
