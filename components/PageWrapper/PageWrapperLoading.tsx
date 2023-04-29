import { Transition } from '@headlessui/react'
import { FC } from 'react'
import { NextHead } from '../next/Head.ts'
import { Portal } from '../ui-kit/Portal/Portal.tsx'

interface Props {
  isLoading: boolean
}

export const PageWrapperLoading: FC<Props> = ({ isLoading }) => {
  return (
    <>
      {isLoading && (
        <NextHead>
          <title>Expense loading...</title>
        </NextHead>
      )}

      <Portal>
        <Transition
          show={isLoading}
          className="fixed z-50 inset-0 bg-zinc-500"
          enter="transition ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-75"
          leave="transition ease-in duration-200"
          leaveFrom="opacity-75"
          leaveTo="opacity-0"
        />
      </Portal>
    </>
  )
}
