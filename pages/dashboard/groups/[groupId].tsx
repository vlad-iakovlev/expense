import { GetServerSideProps, NextPage } from 'next'
import { CheckSwrContexts } from '../../../components/CheckSwrContexts'
import { CategoriesProvider } from '../../../components/contexts/Categories'
import { CurrenciesProvider } from '../../../components/contexts/Currencies'
import { ErrorProvider } from '../../../components/contexts/Error'
import { GroupProvider } from '../../../components/contexts/Group'
import { LoadingProvider } from '../../../components/contexts/Loading'
import { OperationsProvider } from '../../../components/contexts/Operations'
import { StatisticsByCategoryProvider } from '../../../components/contexts/StatisticsByCategory'
import { WalletsProvider } from '../../../components/contexts/Wallets'
import { Group } from '../../../components/Group'

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
      <CurrenciesProvider>
        <CategoriesProvider groupId={groupId}>
          <GroupProvider groupId={groupId}>
            <OperationsProvider groupId={groupId}>
              <WalletsProvider groupId={groupId}>
                <StatisticsByCategoryProvider groupId={groupId}>
                  <CheckSwrContexts renderContent={() => <Group />} />
                </StatisticsByCategoryProvider>
              </WalletsProvider>
            </OperationsProvider>
          </GroupProvider>
        </CategoriesProvider>
      </CurrenciesProvider>
    </ErrorProvider>
  </LoadingProvider>
)

export default GroupPage
