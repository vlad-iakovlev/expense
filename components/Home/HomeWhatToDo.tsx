import {
  ArrowLeftOnRectangleIcon,
  CodeBracketIcon,
} from '@heroicons/react/24/outline'
import { signIn } from 'next-auth/react'
import { FC, useCallback, useState } from 'react'
import { Card } from '../ui-kit/Card/Card.tsx'

interface Props {
  className?: string
}

export const HomeWhatToDo: FC<Props> = ({ className }) => {
  const [isLoading, setIsLoading] = useState(false)

  const handleSignIn = useCallback(() => {
    void (async () => {
      try {
        setIsLoading(true)
        await signIn('google')
      } finally {
        setIsLoading(false)
      }
    })()
  }, [])

  return (
    <Card className={className}>
      <Card.Title title="What to do?" />
      <Card.Divider />
      <Card.Button
        disabled={isLoading}
        start={<ArrowLeftOnRectangleIcon className="w-6 h-6" />}
        onClick={handleSignIn}
      >
        Sign In with Google Account
      </Card.Button>
      <Card.Link
        start={<CodeBracketIcon className="w-6 h-6" />}
        href="https://github.com/vlad-yakovlev/expense"
      >
        See the code on GitHub
      </Card.Link>
    </Card>
  )
}
