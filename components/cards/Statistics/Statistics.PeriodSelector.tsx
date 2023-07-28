import { ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/20/solid'
import { AnimatePresence, Variants, motion } from 'framer-motion'
import { Period } from '../../../hooks/usePeriod.ts'
import {
  formatPeriod,
  formatPeriodForAriaLabel,
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

export const PeriodSelector = ({
  fromDate,
  period,
  onChangePeriod,
  onGoPrev,
  onGoNext,
}: Props) => {
  return (
    <div role="listitem" aria-label="Period">
      <Card.Block role="radiogroup" aria-label="Period type">
        <Button
          className="flex-auto px-0"
          size="sm"
          theme={period === Period.ALL ? 'green' : 'white'}
          role="radio"
          aria-label="All time"
          aria-checked={period === Period.ALL ? 'true' : 'false'}
          onClick={() => onChangePeriod(Period.ALL)}
        >
          All
        </Button>

        <Button
          className="flex-auto px-0"
          size="sm"
          theme={period === Period.WEEK ? 'green' : 'white'}
          role="radio"
          aria-checked={period === Period.WEEK ? 'true' : 'false'}
          onClick={() => onChangePeriod(Period.WEEK)}
        >
          Week
        </Button>

        <Button
          className="flex-auto px-0"
          size="sm"
          theme={period === Period.MONTH ? 'green' : 'white'}
          role="radio"
          aria-checked={period === Period.MONTH ? 'true' : 'false'}
          onClick={() => onChangePeriod(Period.MONTH)}
        >
          Month
        </Button>

        <Button
          className="flex-auto px-0"
          size="sm"
          theme={period === Period.YEAR ? 'green' : 'white'}
          role="radio"
          aria-checked={period === Period.YEAR ? 'true' : 'false'}
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
            <Card.Block role="presentation">
              <div
                className="flex-auto order-2 font-medium text-center truncate"
                tabIndex={0}
                aria-label={formatPeriodForAriaLabel(period, fromDate)}
                role="presentation"
              >
                {formatPeriod(period, fromDate)}
              </div>

              <Button
                className="flex-none order-1"
                size="md"
                theme="white"
                iconStart={<ChevronLeftIcon />}
                aria-label="Previous period"
                onClick={onGoPrev}
              />

              <Button
                className="flex-none order-3"
                size="md"
                theme="white"
                iconStart={<ChevronRightIcon />}
                aria-label="Next period"
                onClick={onGoNext}
              />
            </Card.Block>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
