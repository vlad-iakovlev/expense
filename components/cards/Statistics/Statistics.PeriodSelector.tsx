import { ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/20/solid'
import { AnimatePresence, Variants, motion } from 'framer-motion'
import { Period } from '../../../hooks/usePeriod.ts'
import {
  formatMonth,
  formatWeek,
  formatYear,
} from '../../../utils/formatDate.ts'
import { Button } from '../../ui-kit/Button/Button.tsx'
import { Card } from '../../ui-kit/Card/Card.tsx'

const variants: Variants = {
  opened: {
    height: 'auto',
    opacity: 1,
    transition: { duration: 0.2 },
  },

  closed: {
    height: 0,
    opacity: 0,
    transition: { duration: 0.2 },
  },
}

interface Props {
  fromDate: Date
  period: Period
  onChangePeriod: (period: Period) => void
  onGoPrev: () => void
  onGoNext: () => void
}

export const PeriodSelector: React.FC<Props> = ({
  fromDate,
  period,
  onChangePeriod,
  onGoPrev,
  onGoNext,
}) => {
  return (
    <>
      <Card.Block>
        <Button
          className="flex-auto px-0"
          disabled={period === Period.ALL}
          theme={period === Period.ALL ? 'primary' : 'secondary'}
          size="sm"
          onClick={() => onChangePeriod(Period.ALL)}
        >
          All
        </Button>

        <Button
          className="flex-auto px-0"
          disabled={period === Period.WEEK}
          theme={period === Period.WEEK ? 'primary' : 'secondary'}
          size="sm"
          onClick={() => onChangePeriod(Period.WEEK)}
        >
          Week
        </Button>

        <Button
          className="flex-auto px-0"
          disabled={period === Period.MONTH}
          theme={period === Period.MONTH ? 'primary' : 'secondary'}
          size="sm"
          onClick={() => onChangePeriod(Period.MONTH)}
        >
          Month
        </Button>

        <Button
          className="flex-auto px-0"
          disabled={period === Period.YEAR}
          theme={period === Period.YEAR ? 'primary' : 'secondary'}
          size="sm"
          onClick={() => onChangePeriod(Period.YEAR)}
        >
          Year
        </Button>
      </Card.Block>

      <AnimatePresence>
        {period !== Period.ALL && (
          <motion.div
            className="overflow-hidden"
            initial="closed"
            animate="opened"
            exit="closed"
            variants={variants}
          >
            <Card.Block>
              <Button
                className="flex-none"
                theme="secondary"
                iconStart={<ChevronLeftIcon />}
                onClick={onGoPrev}
              />

              <div className="flex-auto font-medium text-center truncate">
                {period === Period.WEEK && formatWeek(fromDate)}
                {period === Period.MONTH && formatMonth(fromDate)}
                {period === Period.YEAR && formatYear(fromDate)}
              </div>

              <Button
                className="flex-none"
                theme="secondary"
                iconStart={<ChevronRightIcon />}
                onClick={onGoNext}
              />
            </Card.Block>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
