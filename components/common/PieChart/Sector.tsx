import React from 'react'
import { GetSectorProps, getSector } from '@/utils/client/getSector.js'

const DURATION = 200

interface SectorProps {
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
  const lastProps = React.useRef(sectorProps)
  const [animatedProps, setAnimatedProps] = React.useState(sectorProps)

  React.useEffect(() => {
    const startedAt = Date.now()
    let frameTimerId: number

    const loop = () => {
      frameTimerId = requestAnimationFrame(() => {
        const progress = (Date.now() - startedAt) / DURATION
        setAnimatedProps({
          x: animate('x', lastProps.current, sectorProps, progress),
          y: animate('y', lastProps.current, sectorProps, progress),
          radius: animate('radius', lastProps.current, sectorProps, progress),
          start: animate('start', lastProps.current, sectorProps, progress),
          end: animate('end', lastProps.current, sectorProps, progress),
        })

        loop()
      })
    }

    loop()

    const endTimerId = setTimeout(() => {
      lastProps.current = sectorProps
      setAnimatedProps(sectorProps)
      cancelAnimationFrame(frameTimerId)
    }, DURATION)

    return () => {
      // Set lastProps to current animatedProps props on sectorProps change
      setAnimatedProps((animatedProps) => {
        lastProps.current = animatedProps
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

const animate = <K extends string, T extends Record<K, number>>(
  key: K,
  from: T,
  to: T,
  progress: number,
) => from[key] - (from[key] - to[key]) * progress
