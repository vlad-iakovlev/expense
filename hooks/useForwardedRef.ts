import { ForwardedRef, useMemo, useRef } from 'react'

export const useForwardedRef = <Target>(
  forwardedRef: ForwardedRef<Target>,
  initialValue: Target
) => {
  const ref = useRef<Target>(initialValue)

  return useMemo(() => {
    return new Proxy(ref, {
      set(target, key: keyof typeof ref, value) {
        target[key] = value

        if (typeof forwardedRef === 'function') {
          forwardedRef(value)
        } else if (forwardedRef) {
          forwardedRef.current = value
        }

        return true
      },
    })
  }, [forwardedRef])
}
