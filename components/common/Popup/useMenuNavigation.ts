import React from 'react'

interface UseMenuNavigationProps {
  popupRef: React.RefObject<HTMLElement>
  isOpen: boolean
  onClose?: () => void
}

export const useMenuNavigation = ({
  popupRef,
  isOpen,
  onClose,
}: UseMenuNavigationProps) => {
  React.useEffect(() => {
    if (!isOpen) return

    const handleClick = (event: MouseEvent) => {
      if (!popupRef.current?.contains(event.target as Node)) onClose?.()
    }

    const handleEscape = () => {
      onClose?.()
    }

    const handleTab = () => {
      requestAnimationFrame(() => {
        if (!popupRef.current?.contains(document.activeElement)) onClose?.()
      })
    }

    const handleArrow = (event: KeyboardEvent) => {
      const focusableElements = Array.from(
        popupRef.current?.querySelectorAll(
          'button:not([disabled]), a:not([disabled]), [tabindex]:not([tabindex="-1"])',
        ) ?? [],
      )

      if (!focusableElements.length) return

      event.preventDefault()
      event.stopPropagation()

      const currentFocusIndex = focusableElements.indexOf(
        document.activeElement as Element,
      )

      let nextFocusIndex: number
      if (currentFocusIndex < 0) {
        nextFocusIndex =
          event.key === 'ArrowDown' ? 0 : focusableElements.length - 1
      } else {
        const direction = event.key === 'ArrowDown' ? 1 : -1
        nextFocusIndex =
          (currentFocusIndex + direction + focusableElements.length) %
          focusableElements.length
      }

      ;(focusableElements[nextFocusIndex] as HTMLElement)?.focus()
    }

    const handleKeyDown = (event: KeyboardEvent) => {
      switch (event.key) {
        case 'Escape':
          return handleEscape()

        case 'Tab':
          return handleTab()

        case 'ArrowUp':
        case 'ArrowDown':
          return handleArrow(event)
      }
    }

    document.body.style.setProperty('pointer-events', 'none')
    document.addEventListener('click', handleClick, { capture: true })
    document.addEventListener('keydown', handleKeyDown, { capture: true })

    return () => {
      document.body.style.removeProperty('pointer-events')
      document.removeEventListener('click', handleClick, { capture: true })
      document.removeEventListener('keydown', handleKeyDown, { capture: true })
    }
  }, [isOpen, onClose, popupRef])
}
