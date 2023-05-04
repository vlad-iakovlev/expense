import { NextPage } from 'next'
import { Page } from '../components/layout/Page/Page.tsx'
import { Dashboard } from '../components/pages/Dashboard.tsx'
import { Home } from '../components/pages/Home.tsx'

const HomePage: NextPage = () => (
  <Page unauthenticated={<Home />}>
    <Dashboard />
  </Page>
)

export default HomePage
