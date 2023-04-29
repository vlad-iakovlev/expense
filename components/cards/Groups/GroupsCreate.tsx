import { PlusIcon } from '@heroicons/react/20/solid'
import { useRouter } from 'next/router.js'
import { FC, useCallback } from 'react'
import { ROUTES } from '../../../constants/routes.ts'
import { useGroups } from '../../../stores/RootStore/hooks/useGroups.ts'
import { Button } from '../../ui-kit/Button/Button.tsx'

export const GroupsCreate: FC = () => {
  const router = useRouter()
  const { createGroup } = useGroups()

  const handleCreate = useCallback(() => {
    const groupId = createGroup()
    void router.push(ROUTES.GROUP(groupId))
  }, [createGroup, router])

  return (
    <Button rounded size="sm" iconStart={<PlusIcon />} onClick={handleCreate} />
  )
}
