import { createRootRoute } from '@tanstack/react-router'
import { Outlet } from '@tanstack/react-router'

export const Route = createRootRoute({ component: Outlet })
