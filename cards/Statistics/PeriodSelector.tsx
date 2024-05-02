import { ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/20/solid'
import { AnimatePresence, Variants, easeInOut, motion } from 'framer-motion'
import { Button } from '@/components/common/Button.jsx'
import { Card } from '@/components/common/Card/index.jsx'
import { PeriodType } from '@/hooks/usePeriod.js'
import { formatPeriod, formatPeriodForAriaLabel } from '@/utils/formatDate.js'

const variants: Variants = {
  opened: {
    height: 'auto',
    opacity: 1,
    transition: { duration: 0.15, ease: easeInOut },
  },

  closed: {
    height: 0,
    opacity: 0,
    transition: { duration: 0.15, ease: easeInOut },
  },
}

interface PeriodSelectorProps {
  fromDate: Date
  periodType: PeriodType
  onChangePeriodType: (period: PeriodType) => void
  onGoPrev: () => void
  onGoNext: () => void
}

export const PeriodSelector = ({
  fromDate,
  periodType,
  onChangePeriodType,
  onGoPrev,
  onGoNext,
}: PeriodSelectorProps) => (
  <div role="listitem" aria-label="Period">
    <Card.Block role="radiogroup" aria-label="Period type">
      <Button
        className="flex-auto px-0"
        size="sm"
        theme={periodType === PeriodType.ALL ? 'green' : 'white'}
        role="radio"
        aria-label="All time"
        aria-checked={periodType === PeriodType.ALL ? 'true' : 'false'}
        onClick={() => onChangePeriodType(PeriodType.ALL)}
      >
        All
      </Button>

      <Button
        className="flex-auto px-0"
        size="sm"
        theme={periodType === PeriodType.WEEK ? 'green' : 'white'}
        role="radio"
        aria-checked={periodType === PeriodType.WEEK ? 'true' : 'false'}
        onClick={() => onChangePeriodType(PeriodType.WEEK)}
      >
        Week
      </Button>

      <Button
        className="flex-auto px-0"
        size="sm"
        theme={periodType === PeriodType.MONTH ? 'green' : 'white'}
        role="radio"
        aria-checked={periodType === PeriodType.MONTH ? 'true' : 'false'}
        onClick={() => onChangePeriodType(PeriodType.MONTH)}
      >
        Month
      </Button>

      <Button
        className="flex-auto px-0"
        size="sm"
        theme={periodType === PeriodType.YEAR ? 'green' : 'white'}
        role="radio"
        aria-checked={periodType === PeriodType.YEAR ? 'true' : 'false'}
        onClick={() => onChangePeriodType(PeriodType.YEAR)}
      >
        Year
      </Button>
    </Card.Block>

    <AnimatePresence>
      {periodType !== PeriodType.ALL && (
        <motion.div
          className="overflow-hidden"
          initial="closed"
          animate="opened"
          exit="closed"
          variants={variants}
        >
          <Card.Block role="presentation">
            <div
              className="order-2 flex-auto truncate text-center font-medium"
              tabIndex={0}
              aria-label={formatPeriodForAriaLabel(periodType, fromDate)}
              role="presentation"
            >
              {formatPeriod(periodType, fromDate)}
            </div>

            <Button
              className="order-1 flex-none"
              size="md"
              theme="white"
              iconStart={<ChevronLeftIcon />}
              aria-label="Previous period"
              onClick={onGoPrev}
            />

            <Button
              className="order-3 flex-none"
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
