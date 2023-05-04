import { ArrowPathIcon } from '@heroicons/react/24/outline'
import { Component, ErrorInfo, ReactNode } from 'react'
import { NextHead } from '../../next/Head.ts'
import { Card } from '../../ui-kit/Card/Card.tsx'

interface Props {
  children: ReactNode
}

interface State {
  hasError: boolean
}

export class ErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props)

    // Define a state variable to track whether is an error or not
    this.state = { hasError: false }
  }

  static getDerivedStateFromError() {
    return { hasError: true }
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    // TODO: Sentry
    console.error({ error, errorInfo })
  }

  handleRestart() {
    window.location.pathname = '/'
  }

  render() {
    if (this.state.hasError) {
      return (
        <>
          <NextHead>
            <title>Expense</title>
          </NextHead>
          <div className="fixed inset-0 z-[10000] flex items-center justify-center bg-zinc-300">
            <Card className="min-w-72">
              <Card.Title title="Oops!" />
              <Card.Divider />
              <Card.Button
                label="Restart Expense"
                prefix={<ArrowPathIcon className="w-6 h-6" />}
                onClick={() => this.handleRestart()}
              />
            </Card>
          </div>
        </>
      )
    }

    return this.props.children
  }
}
