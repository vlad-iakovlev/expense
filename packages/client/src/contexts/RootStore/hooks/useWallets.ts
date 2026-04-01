import { useRootStore } from '..'
import { useCallback, useMemo } from 'react'
import { v4 as uuid } from 'uuid'
import { getOrderedWallets } from '../getters/wallets'
import { WalletsActionTypes } from '../types'

type UseWalletsProps = {
  groupId?: string
}

export const useWallets = ({ groupId }: UseWalletsProps) => {
  const { state, dispatch } = useRootStore()

  const walletIds = useMemo<string[]>(
    () => getOrderedWallets(state, { groupId }).map((wallet) => wallet.id),
    [groupId, state],
  )

  const createWallet = useCallback(() => {
    if (!groupId) throw new Error('groupId is not defined')
    const walletId = uuid()

    dispatch({
      type: WalletsActionTypes.CREATE_WALLET,
      payload: { walletId, groupId },
    })

    return walletId
  }, [dispatch, groupId])

  return {
    walletIds,
    createWallet,
  }
}
