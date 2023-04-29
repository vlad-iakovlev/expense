export const generateObjectId = () => {
  const timestamp = ((new Date().getTime() / 1000) | 0).toString(16)

  const randomId = 'xxxxxxxxxxxxxxxx'
    .replace(/[x]/g, () => ((Math.random() * 16) | 0).toString(16))
    .toLowerCase()

  return `${timestamp}${randomId}`
}
