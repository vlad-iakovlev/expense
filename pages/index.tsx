import { NextPage } from 'next'
import { PageWrapper } from '../components/PageWrapper/PageWrapper.tsx'
import { Dashboard } from '../components/pages/Dashboard/Dashboard.tsx'
import { Home } from '../components/pages/Home/Home.tsx'

const HomePage: NextPage = () => (
  <PageWrapper unauthenticated={<Home />}>
    <Dashboard />
  </PageWrapper>
)

export default HomePage
