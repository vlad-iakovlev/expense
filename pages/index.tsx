import { NextPage } from 'next'
import { Page } from '../components/layout/Page/Page.jsx'
import { Dashboard } from '../components/pages/Dashboard.jsx'

const HomePage: NextPage = () => (
  <Page>
    <Dashboard />
  </Page>
)

export default HomePage
