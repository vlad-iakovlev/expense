import assert from 'assert'
import { NextPage } from 'next'
import { useRouter } from 'next/router.js'
import { useMemo } from 'react'
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

const GroupPage: NextPage = () => {
  const router = useRouter()

  const groupId = useMemo<string>(() => {
    assert(typeof router.query.groupId === 'string', 'groupId is not a string')
    return router.query.groupId
  }, [router.query.groupId])

  return (
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
}

export default GroupPage
