import { Component, ErrorInfo, ReactNode } from 'react'

interface Props {
  children: ReactNode
  fallback: ReactNode
}

interface State {
  hasError: boolean
}

export class ErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props)
    this.state = { hasError: false }
  }

  static getDerivedStateFromError() {
    return { hasError: true }
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    // TODO: Send to server
    console.error({ error, errorInfo })
  }

  rejectionHandler = () => {
    this.setState({ hasError: true })
  }

  componentDidMount(): void {
    window.addEventListener('unhandledrejection', this.rejectionHandler)
  }

  componentWillUnmount(): void {
    window.removeEventListener('unhandledrejection', this.rejectionHandler)
  }

  render() {
    if (this.state.hasError) {
      return this.props.fallback
    }

    return this.props.children
  }
}
