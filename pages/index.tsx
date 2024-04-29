import { NextPage } from 'next'
import { Page } from '@/components/layout/Page/index.jsx'
import { Dashboard } from '@/components/pages/Dashboard.jsx'

const HomePage: NextPage = () => (
  <Page>
    <Dashboard />
  </Page>
)

export default HomePage
