import 'next'
import { Session } from 'next-auth'

declare module 'next' {
  declare interface NextApiRequest {
    session: Session
  }
}
