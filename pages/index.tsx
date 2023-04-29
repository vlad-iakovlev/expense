import { NextPage } from 'next'
import { useSession } from 'next-auth/react'
import { NextHead } from '../components/next/Head.ts'
import { Dashboard } from '../components/pages/Dashboard/Dashboard.tsx'
import { Home } from '../components/pages/Home/Home.tsx'
import { Overlay } from '../components/ui-kit/Overlay/Overlay.tsx'

const HomePage: NextPage = () => {
  const session = useSession()

  return (
    <>
      <NextHead>
        <title>Expense</title>
      </NextHead>

      {session.status === 'authenticated' && <Dashboard />}

      {session.status === 'unauthenticated' && <Home />}

      <Overlay isVisible={session.status === 'loading'} />
    </>
  )
}

export default HomePage
