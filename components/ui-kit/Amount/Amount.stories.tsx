import type { Meta, StoryObj } from '@storybook/react'
import { Amount } from './Amount.tsx'

const meta: Meta<typeof Amount> = {
  title: 'ui-kit/Amount',
  component: Amount,
  tags: ['autodocs'],
}

export default meta
type Story = StoryObj<typeof Amount>

export const Positive: Story = {
  args: {
    amount: 12345678,
    currency: { id: 'currency-id', symbol: '€', rate: 1 },
  },
}

export const Negative: Story = {
  args: {
    amount: -12345678,
    currency: { id: 'currency-id', symbol: '€', rate: 1 },
  },
}

export const Zero: Story = {
  args: {
    amount: 0,
    currency: { id: 'currency-id', symbol: '€', rate: 1 },
  },
}

export const WithoutCurrency: Story = {
  args: {
    amount: 12345678,
  },
}

export const Income: Story = {
  args: {
    amount: 12345678,
    currency: { id: 'currency-id', symbol: '€', rate: 1 },
    type: 'income',
  },
}

export const ZeroIncome: Story = {
  args: {
    amount: 0,
    currency: { id: 'currency-id', symbol: '€', rate: 1 },
    type: 'income',
  },
}

export const Expense: Story = {
  args: {
    amount: 12345678,
    currency: { id: 'currency-id', symbol: '€', rate: 1 },
    type: 'expense',
  },
}

export const ZeroExpense: Story = {
  args: {
    amount: 0,
    currency: { id: 'currency-id', symbol: '€', rate: 1 },
    type: 'expense',
  },
}

export const IncomeWithSignNonZero: Story = {
  args: {
    amount: 12345678,
    currency: { id: 'currency-id', symbol: '€', rate: 1 },
    type: 'income',
    showSign: 'non-zero',
  },
}

export const ZeroIncomeWithSignNonZero: Story = {
  args: {
    amount: 0,
    currency: { id: 'currency-id', symbol: '€', rate: 1 },
    type: 'income',
    showSign: 'non-zero',
  },
}

export const ExpenseWithSignNonZero: Story = {
  args: {
    amount: 12345678,
    currency: { id: 'currency-id', symbol: '€', rate: 1 },
    type: 'expense',
    showSign: 'non-zero',
  },
}

export const ZeroExpenseWithSignNonZero: Story = {
  args: {
    amount: 0,
    currency: { id: 'currency-id', symbol: '€', rate: 1 },
    type: 'expense',
    showSign: 'non-zero',
  },
}

export const IncomeWithSignNegative: Story = {
  args: {
    amount: 12345678,
    currency: { id: 'currency-id', symbol: '€', rate: 1 },
    type: 'income',
    showSign: 'negative',
  },
}

export const ZeroIncomeWithSignNegative: Story = {
  args: {
    amount: 0,
    currency: { id: 'currency-id', symbol: '€', rate: 1 },
    type: 'income',
    showSign: 'negative',
  },
}

export const ExpenseWithSignNegative: Story = {
  args: {
    amount: 12345678,
    currency: { id: 'currency-id', symbol: '€', rate: 1 },
    type: 'expense',
    showSign: 'negative',
  },
}

export const ZeroExpenseWithSignNegative: Story = {
  args: {
    amount: 0,
    currency: { id: 'currency-id', symbol: '€', rate: 1 },
    type: 'expense',
    showSign: 'negative',
  },
}
