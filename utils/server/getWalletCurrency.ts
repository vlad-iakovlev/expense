import { currencySelector } from '../../api/server/selectors/index.ts'
import { getWalletWhere } from '../../api/server/where/index.ts'
import { prisma } from './prisma.ts'

interface GetWalletDefaultCurrencyParams {
  userId: string
  walletId: string
}

export const getWalletCurrency = async (
  params: GetWalletDefaultCurrencyParams
) => {
  const wallet = await prisma.wallet.findFirstOrThrow({
    where: getWalletWhere({
      userId: params.userId,
      walletId: params.walletId,
    }),
    select: {
      currency: { select: currencySelector },
    },
  })

  return wallet.currency
}
