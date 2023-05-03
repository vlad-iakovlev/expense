import { NextPage } from 'next'
import { forwardRef } from 'react'
import { Page } from '../components/layout/Page/Page.tsx'
import { Dashboard } from '../components/pages/Dashboard/Dashboard.tsx'
import { Home } from '../components/pages/Home/Home.tsx'

const HomePage = forwardRef<HTMLDivElement, NextPage>(function HomePage(
  {},
  ref
) {
  return (
    <Page ref={ref} unauthenticated={<Home />}>
      <Dashboard />
    </Page>
  )
})

export default HomePage
