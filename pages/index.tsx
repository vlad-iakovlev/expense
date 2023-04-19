import { NextPage } from 'next'
import { useSession } from 'next-auth/react'
import { CheckSwrContexts } from '../components/CheckSwrContexts/CheckSwrContexts.tsx'
import { Dashboard } from '../components/Dashboard/Dashboard.tsx'
import { Home } from '../components/Home/Home.tsx'
import { CategoriesProvider } from '../components/contexts/Categories.tsx'
import { CurrenciesProvider } from '../components/contexts/Currencies.tsx'
import { ErrorProvider } from '../components/contexts/Error.tsx'
import { GroupsProvider } from '../components/contexts/Groups.tsx'
import { LoadingProvider } from '../components/contexts/Loading.tsx'
import { OperationsProvider } from '../components/contexts/Operations.tsx'
import { StatisticsByCategoryProvider } from '../components/contexts/StatisticsByCategory.tsx'
import { WalletsProvider } from '../components/contexts/Wallets.tsx'
import { NextHead } from '../components/next/Head.ts'

const HomePage: NextPage = () => {
  const session = useSession()

  return (
    <>
      <NextHead>
        <title>Expense</title>
      </NextHead>

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
