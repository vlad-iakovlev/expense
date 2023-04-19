import assert from 'assert'
import { GetServerSideProps, NextPage } from 'next'
import { CheckSwrContexts } from '../../components/CheckSwrContexts/CheckSwrContexts.tsx'
import { Group } from '../../components/Group/Group.tsx'
import { CategoriesProvider } from '../../components/contexts/Categories.tsx'
import { CurrenciesProvider } from '../../components/contexts/Currencies.tsx'
import { ErrorProvider } from '../../components/contexts/Error.tsx'
import { GroupProvider } from '../../components/contexts/Group.tsx'
import { LoadingProvider } from '../../components/contexts/Loading.tsx'
import { OperationsProvider } from '../../components/contexts/Operations.tsx'
import { StatisticsByCategoryProvider } from '../../components/contexts/StatisticsByCategory.tsx'
import { WalletsProvider } from '../../components/contexts/Wallets.tsx'

interface Props {
  groupId: string
}

export const getServerSideProps: GetServerSideProps<Props> = async (
  context
) => {
  const groupId = context.query.groupId
  assert(typeof groupId === 'string', 'groupId is not a string')
  return Promise.resolve({ props: { groupId } })
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
