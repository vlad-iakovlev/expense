import assert from 'assert'
import { GetServerSideProps, NextPage } from 'next'
import { PageWrapper } from '../../components/PageWrapper/PageWrapper.tsx'
import { Group } from '../../components/pages/Group/Group.tsx'

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

const GroupPage: NextPage<Props> = ({ groupId }) => (
  <PageWrapper>
    <Group groupId={groupId} />
  </PageWrapper>
)

export default GroupPage
