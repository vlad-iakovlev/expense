export const LOCAL_STORAGE_KEY = 'rootStore'
export const LOCAL_STORAGE_VERSION = 4

export const getLocalStorageKey = (version = LOCAL_STORAGE_VERSION) =>
  `${LOCAL_STORAGE_KEY}/v${version}`
