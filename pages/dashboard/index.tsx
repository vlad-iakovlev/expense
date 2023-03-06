import { NextPage } from 'next'
import { GroupsProvider } from '../../components/contexts/Groups'
import { OperationsProvider } from '../../components/contexts/Operations'
import { WalletsProvider } from '../../components/contexts/Wallets'
import { Dashboard, DashboardSkeleton } from '../../components/Dashboard'
import { CheckSwrContexts } from '../../components/CheckSwrContexts'
import { LoadingProvider } from '../../components/contexts/Loading'
import { ErrorProvider } from '../../components/contexts/Error'
import { CategoriesProvider } from '../../components/contexts/Categories'

const DashboardPage: NextPage = () => (
  <LoadingProvider>
    <ErrorProvider>
      <CategoriesProvider>
        <GroupsProvider>
          <OperationsProvider>
            <WalletsProvider>
              <CheckSwrContexts
                renderLoading={() => <DashboardSkeleton />}
                renderContent={() => <Dashboard />}
              />
            </WalletsProvider>
          </OperationsProvider>
        </GroupsProvider>
      </CategoriesProvider>
    </ErrorProvider>
  </LoadingProvider>
)

export default DashboardPage
