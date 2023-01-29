import { PlusIcon } from '@heroicons/react/24/solid'
import { FC, useMemo } from 'react'
import { ClientGroup } from '../../models/group'
import { AvatarGroup } from '../ui-kit/AvatarGroup'

interface Props {
  group?: ClientGroup
  onClick?: () => void
}

export const GroupsItem: FC<Props> = ({ group, onClick }) => {
  const avatarGroup = useMemo(() => {
    if (group?.users) {
      const avatars = group.users.map((user) => ({
        name: user.name,
        src: user.image,
      }))

      return <AvatarGroup className="flex-none" avatars={avatars} max={3} />
    }

    return (
      <div className="flex items-center justify-center w-10 h-10 -ml-6 rounded-full bg-green-700 text-white border-4 border-white">
        <PlusIcon className="w-4 h-4" />
      </div>
    )
  }, [group])

  return (
    <button
      className="flex items-center justify-between gap-4 px-6 py-6 bg-white rounded-md shadow hover:shadow-lg transition-shadow focus:outline-none focus-visible:ring-4 focus-visible:ring-green-500"
      onClick={onClick}
    >
      <h2 className="font-medium truncate">{group?.name || 'Create Group'}</h2>
      {avatarGroup}
    </button>
  )
}
