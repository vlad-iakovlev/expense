import { GetServerSideProps, NextPage } from 'next'
import { GroupProvider } from '../../../components/contexts/Group'
import { OperationsProvider } from '../../../components/contexts/Operations'
import { WalletsProvider } from '../../../components/contexts/Wallets'
import { Group, GroupSkeleton } from '../../../components/Group'
import { CheckSwrContexts } from '../../../components/CheckSwrContexts'
import { LoadingProvider } from '../../../components/contexts/Loading'
import { ErrorProvider } from '../../../components/contexts/Error'
import { CategoriesProvider } from '../../../components/contexts/Categories'

interface Props {
  groupId: string
}

export const getServerSideProps: GetServerSideProps<Props> = async (
  context
) => {
  return {
    props: {
      groupId: String(context.query.groupId),
    },
  }
}

const GroupPage: NextPage<Props> = ({ groupId }) => (
  <LoadingProvider>
    <ErrorProvider>
      <CategoriesProvider>
        <GroupProvider groupId={groupId}>
          <OperationsProvider groupId={groupId}>
            <WalletsProvider groupId={groupId}>
              <CheckSwrContexts
                renderLoading={() => <GroupSkeleton />}
                renderContent={() => <Group />}
              />
            </WalletsProvider>
          </OperationsProvider>
        </GroupProvider>
      </CategoriesProvider>
    </ErrorProvider>
  </LoadingProvider>
)

export default GroupPage
