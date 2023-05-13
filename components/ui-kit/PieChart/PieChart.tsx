import { clsx } from 'clsx'
import { AnimatePresence, Variants, motion } from 'framer-motion'
import { FC, ReactNode, useMemo, useState } from 'react'

const variants: Variants = {
  opened: {
    opacity: 1,
    transition: { ease: 'easeInOut', duration: 0.2 },
  },

  closed: {
    opacity: 0,
    transition: { ease: 'easeInOut', duration: 0.2 },
  },
}

export interface PieChartItem {
  id: string
  color: string
  value: number
}

export interface PieChartProps {
  className?: string
  items: PieChartItem[]
  renderTooltip: (itemId: string | null, total: number) => ReactNode
}

export const PieChart: FC<PieChartProps> = ({
  className,
  items,
  renderTooltip,
}) => {
  const total = useMemo(
    () => items.reduce((acc, item) => acc + item.value, 0),
    [items]
  )

  const paths = useMemo(() => {
    let lastAngle = 0

    return items.map((item) => {
      const angle = (item.value / total) * 360
      const d = describeArc(50, 50, 50, 0, angle)
      const rotate = lastAngle
      lastAngle += angle
      return {
        ...item,
        angle,
        rotate,
        d,
      }
    })
  }, [items, total])

  const [activeId, setActiveId] = useState<string | null>(null)

  return (
    <div className={clsx(className, 'relative aspect-square')}>
      <svg className="absolute inset-0" viewBox="0 0 100 100">
        {paths.map((path) => (
          <path
            className="transition-transform duration-200 ease-in-out [pointer-events:all]"
            key={path.id}
            d={path.d}
            fill={path.color}
            transform={
              path.id === activeId
                ? `rotate(${path.rotate} 50 50)`
                : `translate(2 2) rotate(${path.rotate} 48 48) scale(0.96)`
            }
            onPointerEnter={() => setActiveId(path.id)}
            onPointerLeave={() => setActiveId(null)}
          />
        ))}
        <circle cx="50" cy="50" r="40" fill="white" />
      </svg>

      <AnimatePresence>
        <motion.div
          key={activeId ?? 'null'}
          className="absolute inset-0 flex items-center justify-center pointer-events-none"
          initial="closed"
          animate="opened"
          exit="closed"
          variants={variants}
        >
          {renderTooltip(activeId, total)}
        </motion.div>
      </AnimatePresence>
    </div>
  )
}

const describeArc = (
  cx: number,
  cy: number,
  radius: number,
  startAngle: number,
  endAngle: number
) => {
  const start = polarToCartesian(cx, cy, radius, endAngle)
  const end = polarToCartesian(cx, cy, radius, startAngle)
  const largeArcFlag = endAngle - startAngle <= 180 ? '0' : '1'

  const d = [
    'M',
    start.x,
    start.y,
    'A',
    radius,
    radius,
    0,
    largeArcFlag,
    0,
    end.x,
    end.y,
    'L',
    cx,
    cy,
    'Z',
  ].join(' ')

  return d
}

const polarToCartesian = (
  centerX: number,
  centerY: number,
  radius: number,
  angleInDegrees: number
) => {
  const angleInRadians = ((angleInDegrees - 90) * Math.PI) / 180.0

  return {
    x: centerX + radius * Math.cos(angleInRadians),
    y: centerY + radius * Math.sin(angleInRadians),
  }
}
