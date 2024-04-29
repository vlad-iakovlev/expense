import assert from 'assert'
import React from 'react'
import { v4 as uuid } from 'uuid'
import { getOrderedWallets } from '../getters/wallets.js'
import { useRootStore } from '../index.jsx'
import { WalletsActionTypes } from '../types.jsx'

interface UseWalletsProps {
  groupId?: string
}

export const useWallets = ({ groupId }: UseWalletsProps) => {
  const { state, dispatch } = useRootStore()

  const walletIds = React.useMemo<string[]>(
    () => getOrderedWallets(state, { groupId }).map((wallet) => wallet.id),
    [groupId, state],
  )

  const createWallet = React.useCallback(() => {
    assert(groupId, 'groupId is not defined')
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
