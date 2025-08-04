import 'next'
import { Session } from 'next-auth'

declare module 'next' {
  // eslint-disable-next-line @typescript-eslint/consistent-type-definitions
  declare interface NextApiRequest {
    session: Session
  }
}
