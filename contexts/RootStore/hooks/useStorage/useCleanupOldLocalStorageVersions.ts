import React from 'react'
import { LOCAL_STORAGE_VERSION, getLocalStorageKey } from './constants.js'

export const useCleanupOldLocalStorageVersions = () => {
  React.useEffect(() => {
    for (let version = 1; version < LOCAL_STORAGE_VERSION; version++) {
      window.localStorage.removeItem(getLocalStorageKey(version))
    }
  }, [])
}
