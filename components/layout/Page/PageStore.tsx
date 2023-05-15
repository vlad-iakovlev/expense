import { useRootStore } from '../../../contexts/RootStore/RootStore.tsx'
import { Loading } from '../../pages/Loading.tsx'

interface Props {
  children: React.ReactNode
}

export const PageStore: React.FC<Props> = ({ children }) => {
  const { state } = useRootStore()

  return (
    <>
      {!!state.syncedAt && children}
      {!state.syncedAt && <Loading />}
    </>
  )
}
