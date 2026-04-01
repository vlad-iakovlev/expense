import { RouterProvider, createRouter } from '@tanstack/react-router'
import * as fns from 'date-fns'
import React from 'react'
import ReactDOM from 'react-dom/client'
import '@/styles/globals.css'
import { routeTree } from '../generated/routeTree'

const router = createRouter({
  routeTree,
  defaultPreload: 'intent',
  scrollRestoration: true,
})

declare module '@tanstack/react-router' {
  // eslint-disable-next-line @typescript-eslint/consistent-type-definitions
  interface Register {
    router: typeof router
  }
}

fns.setDefaultOptions({ weekStartsOn: 1 })

// eslint-disable-next-line @typescript-eslint/no-non-null-assertion
ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
)
