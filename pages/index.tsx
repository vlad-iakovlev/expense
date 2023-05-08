import { NextPage } from 'next'
import { Page } from '../components/layout/Page/Page.tsx'
import { Dashboard } from '../components/pages/Dashboard.tsx'

const HomePage: NextPage = () => (
  <Page>
    <Dashboard />
  </Page>
)

export default HomePage
