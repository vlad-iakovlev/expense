import { NextPage } from 'next'
import { Page } from '@/components/layout/Page/index'
import { Dashboard } from '@/components/pages/Dashboard'

const HomePage: NextPage = () => (
  <Page>
    <Dashboard />
  </Page>
)

export default HomePage
