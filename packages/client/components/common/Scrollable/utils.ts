import { clamp } from '@/utils/clamp'

const THICKNESS = 3
const OFFSET = 3
const OVERLAP_OFFSET = 7
const MIN_BASE_LENGTH = 36
const MIN_COMPRESSED_LENGTH = 7

type GetTrackParams = {
  container: number
  isBothVisible: boolean
}

export type Track = {
  startOffset: number
  endOffset: number
  edgeOffset: number
  thickness: number
  length: number
}

export const getTrack = ({
  container,
  isBothVisible,
}: GetTrackParams): Track => {
  const startOffset = OFFSET
  const endOffset = isBothVisible ? OVERLAP_OFFSET : OFFSET

  return {
    startOffset,
    endOffset,
    edgeOffset: OFFSET,
    thickness: THICKNESS,
    length: container - startOffset - endOffset,
  }
}

type GetThumbParams = {
  container: number
  content: number
  scrolled: number
  trackLength: number
}

export type Thumb = {
  offset: number
  length: number
}

export const getThumb = ({
  container,
  content,
  scrolled,
  trackLength,
}: GetThumbParams): Thumb => {
  const maxScrolled = content - container
  const normalizedScrolled = clamp(scrolled, 0, maxScrolled)
  const overScrollTop = Math.max(normalizedScrolled - scrolled, 0)
  const overScrollBottom = Math.max(scrolled - normalizedScrolled, 0)

  const baseLength = Math.max(
    (container / content) * trackLength,
    Math.min(MIN_BASE_LENGTH, trackLength),
  )
  const length = Math.max(
    baseLength - overScrollTop - overScrollBottom,
    Math.min(MIN_COMPRESSED_LENGTH, trackLength),
  )

  return {
    offset: maxScrolled
      ? (normalizedScrolled / maxScrolled) * (trackLength - length)
      : 0,
    length,
  }
}
