import { NextPage } from 'next'
import { useRouter } from 'next/router.js'
import { Page } from '@/components/layout/Page/index.jsx'
import { Invite } from '@/components/pages/Invite.jsx'

const InvitePage: NextPage = () => {
  const router = useRouter()

  if (typeof router.query.token !== 'string') {
    return null
  }

  return (
    <Page withStoreValidation={false}>
      <Invite token={router.query.token} />
    </Page>
  )
}

export default InvitePage
