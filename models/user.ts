import { User } from '@prisma/client'

export type ClientUser = Pick<User, 'id' | 'image' | 'name'>
