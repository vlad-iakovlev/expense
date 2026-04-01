import { useEffect } from 'react'
import { LOCAL_STORAGE_VERSION, getLocalStorageKey } from './constants'

export const useCleanupOldLocalStorageVersions = () => {
  useEffect(() => {
    for (let version = 1; version < LOCAL_STORAGE_VERSION; version++) {
      window.localStorage.removeItem(getLocalStorageKey(version))
    }
  }, [])
}
