import { NextPage } from 'next'
import { CheckSwrContexts } from '../../components/CheckSwrContexts'
import { CategoriesProvider } from '../../components/contexts/Categories'
import { CurrenciesProvider } from '../../components/contexts/Currencies'
import { ErrorProvider } from '../../components/contexts/Error'
import { GroupsProvider } from '../../components/contexts/Groups'
import { LoadingProvider } from '../../components/contexts/Loading'
import { OperationsProvider } from '../../components/contexts/Operations'
import { StatisticsByCategoryProvider } from '../../components/contexts/StatisticsByCategory'
import { WalletsProvider } from '../../components/contexts/Wallets'
import { Dashboard, DashboardSkeleton } from '../../components/Dashboard'

const DashboardPage: NextPage = () => (
  <LoadingProvider>
    <ErrorProvider>
      <CurrenciesProvider>
        <CategoriesProvider>
          <GroupsProvider>
            <OperationsProvider>
              <WalletsProvider>
                <StatisticsByCategoryProvider>
                  <CheckSwrContexts
                    renderLoading={() => <DashboardSkeleton />}
                    renderContent={() => <Dashboard />}
                  />
                </StatisticsByCategoryProvider>
              </WalletsProvider>
            </OperationsProvider>
          </GroupsProvider>
        </CategoriesProvider>
      </CurrenciesProvider>
    </ErrorProvider>
  </LoadingProvider>
)

export default DashboardPage
