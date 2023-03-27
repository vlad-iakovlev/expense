import { FC } from 'react'
import { Breadcrumbs } from '../ui-kit/Breadcrumbs'
import { Columns } from '../ui-kit/Columns'
import { HomeFeatures } from './HomeFeatures'
import { HomeInfo } from './HomeInfo'
import { HomeWhatToDo } from './HomeWhatToDo'

export const Home: FC = () => (
  <>
    <Breadcrumbs title="Home" />

    <Columns className="md:grid-flow-col md:grid-rows-[auto_1fr] lg:grid-rows-none">
      <HomeInfo />
      <HomeFeatures className="md:row-span-full" />
      <HomeWhatToDo className="md:max-lg:col-[1] md:max-lg:row-[2]" />
    </Columns>
  </>
)
