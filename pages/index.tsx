import { NextPage } from 'next'
import { useSession } from 'next-auth/react'
import Head from 'next/head'
import { useRouter } from 'next/router'
import { useCallback } from 'react'
import { Button, ButtonSize } from '../components/ui-kit/Button'

const Home: NextPage = () => {
  const router = useRouter()
  const session = useSession()

  const handleGoToDashboard = useCallback(async () => {
    await router.push('/dashboard')
  }, [router])

  return (
    <>
      <Head>
        <title>Expense</title>
      </Head>

      {session.status === 'authenticated' && (
        <div className="flex justify-center">
          <Button size={ButtonSize.LARGE} onClick={handleGoToDashboard}>
            Go to Dashboard
          </Button>
        </div>
      )}
    </>
  )
}

export default Home
