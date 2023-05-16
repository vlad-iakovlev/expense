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
          size="sm"
          theme={period === Period.ALL ? 'green' : 'white'}
          onClick={() => onChangePeriod(Period.ALL)}
        >
          All
        </Button>

        <Button
          className="flex-auto px-0"
          disabled={period === Period.WEEK}
          size="sm"
          theme={period === Period.WEEK ? 'green' : 'white'}
          onClick={() => onChangePeriod(Period.WEEK)}
        >
          Week
        </Button>

        <Button
          className="flex-auto px-0"
          disabled={period === Period.MONTH}
          size="sm"
          theme={period === Period.MONTH ? 'green' : 'white'}
          onClick={() => onChangePeriod(Period.MONTH)}
        >
          Month
        </Button>

        <Button
          className="flex-auto px-0"
          disabled={period === Period.YEAR}
          size="sm"
          theme={period === Period.YEAR ? 'green' : 'white'}
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
                size="md"
                theme="white"
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
                size="md"
                theme="white"
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
