import { FocusTrap } from 'focus-trap-react'
import { useEffect } from 'react'
import { twMerge } from 'tailwind-merge'
import { Portal } from '../Portal'
import { Presence, usePresence } from '../Presence'

const DIALOG_DURATION = { enter: 300, exit: 200 }

export type DialogProps = {
  isOpen: boolean
  children: React.ReactNode
  onClose: () => void
}

export const Dialog = ({ isOpen, children, onClose }: DialogProps) => {
  useEffect(() => {
    if (!isOpen) return

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        onClose()
      }
    }

    document.addEventListener('keydown', handleKeyDown)
    return () => {
      document.removeEventListener('keydown', handleKeyDown)
    }
  }, [isOpen, onClose])

  return (
    <Portal>
      <Presence duration={DIALOG_DURATION} present={isOpen}>
        <DialogContent onClose={onClose}>{children}</DialogContent>
      </Presence>
    </Portal>
  )
}

type DialogContentProps = {
  children: React.ReactNode
  onClose: () => void
}

const DialogContent = ({ children, onClose }: DialogContentProps) => {
  const presence = usePresence()

  return (
    <div
      className="fixed inset-0 z-40 opacity-0 transition-opacity data-[state=open]:opacity-100"
      style={presence.transitionStyle}
      data-state={presence.state}
      role="dialog"
    >
      {/* eslint-disable-next-line jsx-a11y-x/click-events-have-key-events, jsx-a11y-x/no-static-element-interactions */}
      <div
        className="absolute inset-0 bg-zinc-500/75 dark:bg-zinc-900/75"
        onClick={onClose}
      />

      <div className="flex min-h-full items-end justify-center overflow-y-auto pt-[env(safe-area-inset-top)] pr-[env(safe-area-inset-right)] pb-[env(safe-area-inset-bottom)] pl-[env(safe-area-inset-left)] sm:items-center">
        <FocusTrap>
          <div
            className={twMerge(
              'relative m-4 w-full max-w-lg overflow-hidden rounded-lg bg-secondary-background shadow-xl sm:my-8',
              'translate-y-4 scale-95 opacity-0 transition-[translate,scale,opacity] data-[state=open]:translate-y-0 data-[state=open]:scale-100 data-[state=open]:opacity-100',
            )}
            style={presence.transitionStyle}
            data-state={presence.state}
          >
            {children}
          </div>
        </FocusTrap>
      </div>
    </div>
  )
}
