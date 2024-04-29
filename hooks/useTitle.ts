import React from 'react'

export const useTitle = (text: string) => {
  React.useEffect(() => {
    document.title = text
  }, [text])
}
