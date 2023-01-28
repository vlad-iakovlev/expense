import type { NextPage } from 'next'
import Head from 'next/head'
import { PageHome } from '../components/PageHome'

const Home: NextPage = () => (
  <>
    <Head>
      <title>Expense</title>
    </Head>

    <PageHome />
  </>
)

export default Home
