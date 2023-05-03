import { FC } from 'react'
import { NextHead } from '../../next/Head.ts'
import { Columns } from '../../ui-kit/Columns/Columns.tsx'
import { Title } from '../../ui-kit/Title/Title.tsx'
import { HomeFeatures } from './HomeFeatures.tsx'
import { HomeInfo } from './HomeInfo.tsx'
import { HomeWhatToDo } from './HomeWhatToDo.tsx'

export const Home: FC = () => (
  <>
    <NextHead>
      <title>Expense</title>
    </NextHead>

    <Title title="Home" />

    <Columns className="md:grid-flow-col md:grid-rows-[auto_1fr] lg:grid-rows-none">
      <HomeInfo />
      <HomeFeatures className="md:row-span-full" />
      <HomeWhatToDo className="md:max-lg:col-[1] md:max-lg:row-[2]" />
    </Columns>
  </>
)
