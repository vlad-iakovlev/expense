import assert from 'assert'
import { GetServerSideProps, NextPage } from 'next'
import { useSession } from 'next-auth/react'
import { NextError } from '../../components/next/Error.ts'
import { NextHead } from '../../components/next/Head.ts'
import { Group } from '../../components/pages/Group/Group.tsx'
import { Overlay } from '../../components/ui-kit/Overlay/Overlay.tsx'

interface Props {
  groupId: string
}

export const getServerSideProps: GetServerSideProps<Props> = async (
  context
) => {
  const groupId = context.query.groupId
  assert(typeof groupId === 'string', 'groupId is not a string')
  return Promise.resolve({ props: { groupId } })
}

const GroupPage: NextPage<Props> = ({ groupId }) => {
  const session = useSession()

  return (
    <>
      {session.status === 'authenticated' ? (
        <Group groupId={groupId} />
      ) : (
        <NextHead>
          <title>Expense</title>
        </NextHead>
      )}

      {session.status === 'unauthenticated' && <NextError statusCode={403} />}

      <Overlay isVisible={session.status === 'loading'} />
    </>
  )
}

export default GroupPage
