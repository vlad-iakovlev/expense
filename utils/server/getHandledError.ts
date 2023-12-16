import { ERROR_TYPES } from '../../constants/errors.js'

export const getHandledError = (errorType: ERROR_TYPES, error?: unknown) => {
  console.log('Handled error:', errorType, error)
  return new Error(errorType)
}
