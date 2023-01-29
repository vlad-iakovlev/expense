import { Group } from '@prisma/client'
import { ClientUser } from './user'

export type ClientGroup = Pick<Group, 'id' | 'name'> & {
  users: ClientUser[]
}
