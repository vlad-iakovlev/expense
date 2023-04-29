import assert from 'assert'
import { useCallback, useMemo } from 'react'
import { generateObjectId } from '../../../utils/client/generateObjectId.ts'
import { useRootStore } from '../RootStore.tsx'
import { getWallets } from '../getters/wallets.ts'
import { WalletsActionTypes } from '../types.tsx'

interface Props {
  groupId?: string
}

export const useWallets = ({ groupId }: Props = {}) => {
  const { state, dispatch } = useRootStore()

  const walletIds = useMemo<string[]>(
    () => getWallets(state, { groupId }).map((wallet) => wallet.id),
    [groupId, state]
  )

  const createWallet = useCallback(() => {
    assert(groupId, 'walletId is not defined')
    const walletId = generateObjectId()

    dispatch({
      type: WalletsActionTypes.CREATE_WALLET,
      payload: { walletId, groupId },
    })

    return walletId
  }, [dispatch, groupId])

  const reorderWallets = useCallback(
    (walletIds: string[]) => {
      assert(groupId, 'walletId is not defined')

      dispatch({
        type: WalletsActionTypes.REORDER_WALLETS,
        payload: { walletIds, groupId },
      })
    },
    [dispatch, groupId]
  )

  return {
    walletIds,
    createWallet,
    reorderWallets,
  }
}
