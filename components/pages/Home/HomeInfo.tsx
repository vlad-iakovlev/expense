import { FC } from 'react'
import { Card } from '../../ui-kit/Card/Card.tsx'

interface Props {
  className?: string
}

export const HomeInfo: FC<Props> = ({ className }) => (
  <Card className={className}>
    <Card.Title title="Info" />
    <Card.Divider />
    <Card.Text
      label="Name"
      value={<div className="font-medium">Expense</div>}
    />
    <Card.Text
      label="Name"
      value={<div className="font-medium">Expense tracker</div>}
    />
    <Card.Link
      end={<div className="font-medium">Vlad Yakovlev</div>}
      href="https://vlad-yakovlev.dev"
    >
      Created by
    </Card.Link>
  </Card>
)
