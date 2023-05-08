export const LOCAL_STORAGE_KEY = 'rootStore'
export const LOCAL_STORAGE_VERSION = 2

export const getLocalStorageKey = (version = LOCAL_STORAGE_VERSION) => {
  return `${LOCAL_STORAGE_KEY}/v${version}`
}
