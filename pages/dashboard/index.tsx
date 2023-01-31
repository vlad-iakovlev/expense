import { NextPage } from 'next'
import { GroupsProvider } from '../../components/contexts/Groups'
import { OperationsProvider } from '../../components/contexts/Operations'
import { WalletsProvider } from '../../components/contexts/Wallets'
import { Dashboard } from '../../components/Dashboard'

const DashboardPage: NextPage = () => (
  <GroupsProvider>
    <OperationsProvider>
      <WalletsProvider>
        <Dashboard />
      </WalletsProvider>
    </OperationsProvider>
  </GroupsProvider>
)

export default DashboardPage
