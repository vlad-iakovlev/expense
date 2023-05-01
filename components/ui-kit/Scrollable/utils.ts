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
  const length = Math.max((container / content) * maxLength, MIN_LENGTH)
  const scrolledOffset = Math.max((scrolled / content) * maxLength + OFFSET, 0)

  return {
    edgeOffset: OFFSET,
    scrolledOffset,
    thickness: THICKNESS,
    length,
  }
}
