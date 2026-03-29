import { ERROR_CODES_MAP, ERROR_TYPES } from '@/constants/errors'

const isErrorType = (value: string): value is ERROR_TYPES =>
  Object.values(ERROR_TYPES).includes(value as ERROR_TYPES)

export const toErrorResponse = (error: unknown): Response => {
  if (error instanceof Error && isErrorType(error.message)) {
    return new Response(error.message, {
      status: ERROR_CODES_MAP[error.message],
    })
  }

  console.error(error)

  return new Response('Internal Server Error', { status: 500 })
}
