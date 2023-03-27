import { FC } from 'react'
import { Card } from '../ui-kit/Card'

interface Props {
  className?: string
}

export const HomeInfo: FC<Props> = ({ className }) => (
  <Card className={className} title="Info">
    <Card.Text end={<div className="font-medium">Expense</div>}>Name</Card.Text>
    <Card.Text end={<div className="font-medium">Expense tracker</div>}>
      Description
    </Card.Text>
    <Card.Link
      end={<div className="font-medium">Vlad Yakovlev</div>}
      href="https://vlad-yakovlev.dev"
    >
      Created by
    </Card.Link>
  </Card>
)
