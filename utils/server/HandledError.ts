import { ERROR_TYPES } from '@/constants/errors'

export class HandledError extends Error {
  status: number

  private constructor(
    message: string,
    status: number,
    originalError?: unknown,
  ) {
    super(message)
    this.status = status
    console.log('Handled error:', message, originalError)
  }

  get response() {
    return new Response(this.message, { status: this.status })
  }

  static UNAUTHORIZED = (originalError?: unknown) =>
    new HandledError(ERROR_TYPES.UNAUTHORIZED, 401, originalError)

  static INVALID_UPDATES = (originalError?: unknown) =>
    new HandledError(ERROR_TYPES.INVALID_UPDATES, 400, originalError)

  static INVALID_TRANSACTION = (originalError?: unknown) =>
    new HandledError(ERROR_TYPES.INVALID_TRANSACTION, 400, originalError)

  static INVALID_INVITE = (originalError?: unknown) =>
    new HandledError(ERROR_TYPES.INVALID_INVITE, 400, originalError)

  static CANNOT_JOIN_GROUP = (originalError?: unknown) =>
    new HandledError(ERROR_TYPES.CANNOT_JOIN_GROUP, 400, originalError)
}
