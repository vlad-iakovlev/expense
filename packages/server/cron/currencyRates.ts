import cron from 'node-cron'
import { Counter, Gauge, type Registry } from 'prom-client'
import { updateCurrencyRates } from '../lib/updateCurrencyRates.js'

let lastSuccessTimestamp: Gauge<string> | null = null
let updatesTotal: Counter<'result'> | null = null

const registerCurrencyRatesMetrics = (registry: Registry) => {
  lastSuccessTimestamp = new Gauge({
    name: 'expense_currency_rates_last_success_timestamp',
    help: 'Unix timestamp of the last successful currency rates update',
    registers: [registry],
  })

  updatesTotal = new Counter({
    name: 'expense_currency_rates_updates_total',
    help: 'Currency rates update attempts',
    labelNames: ['result'] as const,
    registers: [registry],
  })
}

const runScheduledUpdate = async () => {
  try {
    await updateCurrencyRates()
    lastSuccessTimestamp?.set(Math.floor(Date.now() / 1000))
    updatesTotal?.inc({ result: 'success' })
    console.log('Currency rates update succeeded')
  } catch (error) {
    updatesTotal?.inc({ result: 'failure' })
    console.error('Currency rates update failed', error)
  }
}

export const initCurrencyRatesCron = (registry: Registry) => {
  if (!process.env.EXCHANGE_RATES_API_KEY) {
    throw new Error('EXCHANGE_RATES_API_KEY is not set')
  }

  registerCurrencyRatesMetrics(registry)
  cron.schedule('0 */12 * * *', runScheduledUpdate)
}
