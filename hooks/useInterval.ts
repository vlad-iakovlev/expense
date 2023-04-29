import { useEffect, useRef } from 'react'

interface Options {
  immediate?: boolean
}

export const useInterval = (
  callback: () => void,
  delay: number | null,
  { immediate }: Options = {}
) => {
  const savedCallback = useRef(callback)

  useEffect(() => {
    savedCallback.current = callback
  }, [callback])

  useEffect(() => {
    if (!delay) return
    if (immediate) savedCallback.current()

    const id = setInterval(() => savedCallback.current(), delay)
    return () => clearInterval(id)
  }, [delay, immediate])
}
