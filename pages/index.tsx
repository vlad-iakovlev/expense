import { NextPage } from 'next'
import { useSession } from 'next-auth/react'
import Head from 'next/head'
import { useRouter } from 'next/router'
import { useCallback } from 'react'
import { Button, ButtonSize } from '../components/ui-kit/Button'
import { Container } from '../components/ui-kit/Container'

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

      <Container className="flex justify-center py-6">
        {session.status === 'authenticated' && (
          <Button size={ButtonSize.LARGE} onClick={handleGoToDashboard}>
            Go to Dashboard
          </Button>
        )}
      </Container>
    </>
  )
}

export default Home
