import { useSession } from 'next-auth/react'
import { useRouter } from 'next/router'
import { FC, useCallback } from 'react'
import { Button, ButtonSize } from '../ui-kit/Button'
import { Container } from '../ui-kit/Container'

export const PageHome: FC = () => {
  const router = useRouter()
  const session = useSession()

  const handleGoToDashboard = useCallback(() => {
    router.push('/dashboard')
  }, [router])

  return (
    <Container className="flex justify-center py-6">
      {session.status === 'authenticated' && (
        <Button size={ButtonSize.LARGE} onClick={handleGoToDashboard}>
          Go to Dashboard
        </Button>
      )}
    </Container>
  )
}
