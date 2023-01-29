import { Group, User } from '@prisma/client'

export type ClientGroup = Pick<Group, 'id' | 'name'> & {
  users: Pick<User, 'id' | 'image' | 'name'>[]
}
