import { NextPage } from 'next'
import { forwardRef } from 'react'
import { PageWrapper } from '../components/layout/PageWrapper/PageWrapper.tsx'
import { Dashboard } from '../components/pages/Dashboard/Dashboard.tsx'
import { Home } from '../components/pages/Home/Home.tsx'

const HomePage = forwardRef<HTMLDivElement, NextPage>(function HomePage(
  {},
  ref
) {
  return (
    <PageWrapper ref={ref} unauthenticated={<Home />}>
      <Dashboard />
    </PageWrapper>
  )
})

export default HomePage
