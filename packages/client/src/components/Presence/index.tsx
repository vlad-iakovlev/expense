import { createContext, use, useEffect, useState } from 'react'

type PresencePhase = 'hidden' | 'enter' | 'open' | 'exit'

type PresenceContextValue = {
  state: 'open' | 'closed'
  transitionStyle: React.CSSProperties
}

const PresenceContext = createContext<PresenceContextValue | null>(null)

export type PresenceDuration = {
  enter: number
  exit: number
}

export type PresenceProps = {
  duration: PresenceDuration
  present: boolean
  children: React.ReactNode
}

export const Presence = ({ duration, present, children }: PresenceProps) => {
  const [phase, setPhase] = useState<PresencePhase>('hidden')

  useEffect(() => {
    if (present) {
      setPhase('enter')
      const frame = requestAnimationFrame(() => {
        requestAnimationFrame(() => {
          setPhase('open')
        })
      })
      return () => {
        cancelAnimationFrame(frame)
      }
    }

    setPhase((current) => (current === 'hidden' ? current : 'exit'))
  }, [present])

  useEffect(() => {
    if (phase !== 'exit') return

    const timerId = window.setTimeout(() => {
      setPhase('hidden')
    }, duration.exit)

    return () => {
      clearTimeout(timerId)
    }
  }, [phase, duration.exit])

  if (phase === 'hidden') return null

  const state = phase === 'open' ? 'open' : 'closed'
  const activeDuration = phase === 'exit' ? duration.exit : duration.enter

  return (
    <PresenceContext
      value={{
        state,
        transitionStyle: {
          transitionDuration: `${activeDuration}ms`,
          transitionTimingFunction: 'var(--default-transition-timing-function)',
        },
      }}
    >
      {children}
    </PresenceContext>
  )
}

export const usePresence = () => {
  const context = use(PresenceContext)
  if (!context) {
    throw new Error('usePresence must be used within Presence')
  }
  return context
}
