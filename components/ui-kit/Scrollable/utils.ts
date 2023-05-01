const THICKNESS = 3
const OFFSET = 3
const OVERLAP_OFFSET = 7
const MIN_LENGTH = 36

interface GetThumbParamsProps {
  scrolled: number
  container: number
  content: number
  bothVisible: boolean
}

interface ThumbParams {
  edgeOffset: number
  scrolledOffset: number
  thickness: number
  length: number
}

export const getThumbParams = ({
  scrolled,
  container,
  content,
  bothVisible,
}: GetThumbParamsProps): ThumbParams => {
  const maxLength = container - OFFSET - (bothVisible ? OVERLAP_OFFSET : OFFSET)
  const normalizedScrolled = (scrolled / content) * maxLength
  const baseLength = (container / content) * maxLength

  const length = Math.min(
    Math.max(baseLength, MIN_LENGTH) + Math.min(normalizedScrolled, 0),
    maxLength - normalizedScrolled
  )

  return {
    edgeOffset: OFFSET,
    scrolledOffset: Math.max(normalizedScrolled, 0) + OFFSET,
    thickness: THICKNESS,
    length,
  }
}
