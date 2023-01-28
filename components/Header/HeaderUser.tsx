import { Menu, Transition } from '@headlessui/react'
import clsx from 'clsx'
import { FC, Fragment } from 'react'
import { Avatar } from '../ui-kit/Avatar'

interface Props {
  email: string
  image: string
  name: string
  onSignOut: () => void
}

export const HeaderUser: FC<Props> = ({ email, image, name, onSignOut }) => {
  return (
    <Menu as="div" className="relative">
      <div>
        <Menu.Button className="block rounded-full focus:outline-none focus-visible:ring-4 focus-visible:ring-green-500">
          <Avatar src={image} name={name} />
        </Menu.Button>
      </div>

      <Transition
        as={Fragment}
        enter="transition ease-out duration-100"
        enterFrom="transform opacity-0 scale-95"
        enterTo="transform opacity-100 scale-100"
        leave="transition ease-in duration-75"
        leaveFrom="transform opacity-100 scale-100"
        leaveTo="transform opacity-0 scale-95"
      >
        <Menu.Items className="absolute right-0 z-10 mt-2 w-56 origin-top-right divide-y divide-gray-100 rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
          <div className="py-1">
            <div className="px-4 py-2 text-sm">
              <div className="text-gray-900">{name}</div>
              <div className="text-gray-500">{email}</div>
            </div>
          </div>

          <div className="py-1">
            <Menu.Item>
              {({ active }) => (
                <button
                  className={clsx(
                    active ? 'bg-gray-100 text-gray-900' : 'text-gray-700',
                    'block w-full px-4 py-2 text-sm text-left'
                  )}
                  onClick={onSignOut}
                >
                  Sign Out
                </button>
              )}
            </Menu.Item>
          </div>
        </Menu.Items>
      </Transition>
    </Menu>
  )
}
