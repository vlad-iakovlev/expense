export const isValidObjectId = (text = '') => {
  return /^[0-9a-fA-F]{24}$/.test(text)
}
