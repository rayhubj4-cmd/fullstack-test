
import Layout from '../components/Layout'
import SnapshotPolicyForm from '../components/SnapshotPolicyForm'

export default function Snapshot(){
  return (
    <Layout>
      <div className="text-2xl text-zinc-100 mb-6">Edit Snapshot Policy</div>
      <SnapshotPolicyForm />
    </Layout>
  )
}
