import { FC } from 'react'
import { MayBePromise } from '../../../types/utility'
import { CEInput } from '../CEInput'

export interface BreadcrumbsEditableTitleProps {
  title: string
  onChange: (title: string) => MayBePromise<void>
}

export const BreadcrumbsEditableTitle: FC<BreadcrumbsEditableTitleProps> = ({
  title,
  onChange,
}) => (
  <CEInput
    className="flex-auto min-w-0 text-lg font-medium truncate focus:text-clip focus:outline-none"
    value={title}
    onChange={onChange}
  />
)
