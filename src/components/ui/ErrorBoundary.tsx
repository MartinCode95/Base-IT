import React from 'react'

type ErrorBoundaryProps = {
  fallback?: React.ReactNode
  children: React.ReactNode
}

type ErrorBoundaryState = {
  hasError: boolean
}

export default class ErrorBoundary extends React.Component<ErrorBoundaryProps, ErrorBoundaryState> {
  constructor(props: ErrorBoundaryProps) {
    super(props)
    this.state = { hasError: false }
  }

  static getDerivedStateFromError(): ErrorBoundaryState {
    return { hasError: true }
  }

  componentDidCatch(error: unknown, info: React.ErrorInfo): void {
    // Log básico; aquí podrías integrar un servicio como Sentry
    // eslint-disable-next-line no-console
    console.error('UI ErrorBoundary captured an error:', { error, info })
  }

  handleRetry = (): void => {
    // Intento simple: recargar la página/estado
    window.location.reload()
  }

  render(): React.ReactNode {
    if (this.state.hasError) {
      if (this.props.fallback) return this.props.fallback
      return (
        <div className="w-full min-h-[40vh] flex flex-col items-center justify-center p-6 text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Algo salió mal</h2>
          <p className="text-gray-600 mb-4">Intenta recargar la página. Si el problema persiste, vuelve más tarde.</p>
          <button onClick={this.handleRetry} className="px-4 py-2 rounded-xl text-sm font-medium bg-orange-500 text-white hover:bg-orange-600">
            Reintentar
          </button>
        </div>
      )
    }
    return this.props.children
  }
}


