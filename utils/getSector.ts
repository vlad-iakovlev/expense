export type GetSectorProps = {
  x: number
  y: number
  radius: number
  start: number
  end: number
}

export const getSector = ({ x, y, radius, start, end }: GetSectorProps) => {
  if (Math.abs(start - end) < 1e-4) return ''
  if (Math.abs(start - end) % 360 < 1e-4) return getFullSector({ x, y, radius })
  return getPartSector({ x, y, radius, start, end })
}

type GetPartSectorProps = {
  x: number
  y: number
  radius: number
  start: number
  end: number
}

const getPartSector = ({ x, y, radius, start, end }: GetPartSectorProps) => {
  start = start % 360
  end = end % 360
  if (start > end) end += 360

  start = deg2rad(start)
  end = deg2rad(end)

  const points = [
    { x, y },
    point(x, y, radius, start),
    point(x, y, radius, end),
    { x, y },
  ] as const
  const flag = end - start > Math.PI ? '1' : '0'

  return [
    `M ${x} ${y}`,
    `L ${points[1].x} ${points[1].y}`,
    `A ${radius} ${radius} 0 ${flag} 1 ${points[2].x} ${points[2].y}`,
    `L ${x} ${y}`,
    `A 0 0 0 ${flag} 0 ${x} ${y}`,
    'Z',
  ].join(' ')
}

type GetFullSectorProps = {
  x: number
  y: number
  radius: number
}

const getFullSector = ({ x, y, radius }: GetFullSectorProps) =>
  [
    `M ${x - radius} ${y}`,
    `A ${radius} ${radius} 0 1 1 ${x + radius} ${y}`,
    `A ${radius} ${radius} 1 1 1 ${x - radius} ${y}`,
    'Z',
  ].join(' ')

const deg2rad = (deg: number) => (deg / 180) * Math.PI

const point = (x: number, y: number, radius: number, angle: number) => ({
  x: (x + Math.sin(angle) * radius).toFixed(2),
  y: (y - Math.cos(angle) * radius).toFixed(2),
})
