import { useEffect, useRef, useState } from 'react'
import { GetSectorProps, getSector } from '@/utils/getSector'

const DURATION = 200

type SectorProps = {
  sectorProps: GetSectorProps
  color: string
  onPointerEnter: () => void
  onPointerLeave: () => void
}

export const Sector = ({
  sectorProps,
  color,
  onPointerEnter,
  onPointerLeave,
}: SectorProps) => {
  const lastPropsRef = useRef(sectorProps)
  const [animatedProps, setAnimatedProps] = useState(sectorProps)

  useEffect(() => {
    const startedAt = Date.now()
    let frameTimerId: number

    const loop = () => {
      frameTimerId = requestAnimationFrame(() => {
        const progress = (Date.now() - startedAt) / DURATION
        setAnimatedProps({
          x: animate({
            key: 'x',
            from: lastPropsRef.current,
            to: sectorProps,
            progress,
          }),
          y: animate({
            key: 'y',
            from: lastPropsRef.current,
            to: sectorProps,
            progress,
          }),
          radius: animate({
            key: 'radius',
            from: lastPropsRef.current,
            to: sectorProps,
            progress,
          }),
          start: animate({
            key: 'start',
            from: lastPropsRef.current,
            to: sectorProps,
            progress,
          }),
          end: animate({
            key: 'end',
            from: lastPropsRef.current,
            to: sectorProps,
            progress,
          }),
        })

        loop()
      })
    }

    loop()

    const endTimerId = setTimeout(() => {
      lastPropsRef.current = sectorProps
      setAnimatedProps(sectorProps)
      cancelAnimationFrame(frameTimerId)
    }, DURATION)

    return () => {
      // Set lastProps to current animatedProps props on sectorProps change
      setAnimatedProps((animatedProps) => {
        lastPropsRef.current = animatedProps
        return animatedProps
      })
      clearTimeout(endTimerId)
      cancelAnimationFrame(frameTimerId)
    }
  }, [sectorProps])

  return (
    <path
      d={getSector(animatedProps)}
      fill={color}
      onPointerEnter={onPointerEnter}
      onPointerLeave={onPointerLeave}
    />
  )
}

type AnimateProps<K extends string, T extends Record<K, number>> = {
  key: K
  from: T
  to: T
  progress: number
}

const animate = <K extends string, T extends Record<K, number>>({
  key,
  from,
  to,
  progress,
}: AnimateProps<K, T>) => from[key] - (from[key] - to[key]) * progress
