import { NextApiRequest } from 'next'
import { currencySelector } from '../../api/server/selectors/index.ts'
import { prisma } from './prisma.ts'

export const getWalletCurrency = async (
  req: NextApiRequest,
  walletId: string
) => {
  const wallet = await prisma.wallet.findFirstOrThrow({
    where: {
      id: walletId,
      group: {
        userIds: {
          has: req.session.user.id,
        },
      },
    },
    select: {
      currency: { select: currencySelector },
    },
  })

  return wallet.currency
}
