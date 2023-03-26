import { NextPage } from 'next'
import { useSession } from 'next-auth/react'
import Head from 'next/head'
import { CheckSwrContexts } from '../components/CheckSwrContexts'
import { CategoriesProvider } from '../components/contexts/Categories'
import { CurrenciesProvider } from '../components/contexts/Currencies'
import { ErrorProvider } from '../components/contexts/Error'
import { GroupsProvider } from '../components/contexts/Groups'
import { LoadingProvider } from '../components/contexts/Loading'
import { OperationsProvider } from '../components/contexts/Operations'
import { StatisticsByCategoryProvider } from '../components/contexts/StatisticsByCategory'
import { WalletsProvider } from '../components/contexts/Wallets'
import { Dashboard } from '../components/Dashboard'
import { Home } from '../components/Home'

const HomePage: NextPage = () => {
  const session = useSession()

  return (
    <>
      <Head>
        <title>Expense</title>
      </Head>

      {session.status === 'authenticated' && (
        <LoadingProvider>
          <ErrorProvider>
            <CurrenciesProvider>
              <CategoriesProvider>
                <GroupsProvider>
                  <OperationsProvider>
                    <WalletsProvider>
                      <StatisticsByCategoryProvider>
                        <CheckSwrContexts renderContent={() => <Dashboard />} />
                      </StatisticsByCategoryProvider>
                    </WalletsProvider>
                  </OperationsProvider>
                </GroupsProvider>
              </CategoriesProvider>
            </CurrenciesProvider>
          </ErrorProvider>
        </LoadingProvider>
      )}

      {session.status === 'unauthenticated' && <Home />}
    </>
  )
}

export default HomePage
