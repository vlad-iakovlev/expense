import { GetServerSideProps, NextPage } from 'next'
import { GroupProvider } from '../../../components/contexts/Group'
import { OperationsProvider } from '../../../components/contexts/Operations'
import { WalletsProvider } from '../../../components/contexts/Wallets'
import { Group } from '../../../components/Group'

interface Props {
  groupId: string
}

export const getServerSideProps: GetServerSideProps<Props> = async (
  context
) => {
  return {
    props: {
      groupId: String(context.query.groupId),
    },
  }
}

const GroupPage: NextPage<Props> = ({ groupId }) => (
  <GroupProvider groupId={groupId}>
    <OperationsProvider groupId={groupId}>
      <WalletsProvider groupId={groupId}>
        <Group />
      </WalletsProvider>
    </OperationsProvider>
  </GroupProvider>
)

export default GroupPage
