import { useRootStore } from '../../../contexts/RootStore/RootStore.jsx'
import { Loading } from '../../pages/Loading.jsx'

interface Props {
  children: React.ReactNode
}

export const PageStore = ({ children }: Props) => {
  const { state } = useRootStore()

  return (
    <>
      {!!state.syncedAt && children}
      {!state.syncedAt && <Loading />}
    </>
  )
}
