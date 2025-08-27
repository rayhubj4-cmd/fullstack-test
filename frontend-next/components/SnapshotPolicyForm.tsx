
import { useEffect, useMemo, useState } from 'react'
import api from '../lib/api'

type Policy = {
  policyName: string
  directory: string
  timezone: string
  time: string
  days: string[]
  deleteAfterDays: number
  locked: boolean
  enabled: boolean
}

const allDays = ['Mon','Tue','Wed','Thu','Fri','Sat','Sun'] as const
type Day = typeof allDays[number]

export default function SnapshotPolicyForm(){
  const [policy, setPolicy] = useState<Policy | null>(null)
  const [saving, setSaving] = useState(false)
  const clusterId = process.env.NEXT_PUBLIC_CLUSTER_ID

  useEffect(() => {
    api.get(`/api/clusters/${clusterId}/snapshot-policy`).then(r => setPolicy(r.data))
  }, [clusterId])

  const canLock = useMemo(() => {
    return policy?.deleteAfterDays && policy.deleteAfterDays > 0
  }, [policy?.deleteAfterDays])

  function toggleDay(d: Day){
    if (!policy) return
    const set = new Set(policy.days)
    if (set.has(d as any)) {
      set.delete(d as any)
    } else {
      set.add(d as any)
    }
    setPolicy({ ...policy, days: Array.from(set) as any })
  }

  async function save(){
    if (!policy) return
    setSaving(true)
    try {
      await api.put(`/api/clusters/${clusterId}/snapshot-policy`, policy); alert('Saved!')
    } finally {
      setSaving(false)
    }
  }

  if (!policy) return <div className="text-sm text-zinc-400">Loading…</div>

  return (
    <div className="bg-[#0e1a29] border border-zinc-800 rounded p-6">
      <div className="grid gap-4">
        <div>
          <label className="block text-sm text-zinc-300 mb-1">Policy Name</label>
          <input className="w-full bg-[#0b1420] border border-zinc-700 rounded px-3 py-2" value={policy.policyName} onChange={(e)=>setPolicy({...policy, policyName:e.target.value})}/>
        </div>
        <div>
          <label className="block text-sm text-zinc-300 mb-1">Apply to Directory</label>
          <input className="w-full bg-[#0b1420] border border-zinc-700 rounded px-3 py-2" value={policy.directory} onChange={(e)=>setPolicy({...policy, directory:e.target.value})}/>
        </div>
        <div className="bg-[#0b1420] rounded p-4 border border-zinc-700">
          <div className="flex items-center gap-2 mb-3">
            <span className="text-zinc-300">Run Policy on the Following Schedule</span>
          </div>
          <div className="grid md:grid-cols-3 gap-4">
            <div>
              <label className="block text-xs text-zinc-400 mb-1">Set to Time Zone</label>
              <input className="w-full bg-[#0e1a29] border border-zinc-700 rounded px-3 py-2" value={policy.timezone} onChange={(e)=>setPolicy({...policy, timezone:e.target.value})}/>
            </div>
            <div>
              <label className="block text-xs text-zinc-400 mb-1">Take a Snapshot at</label>
              <input className="w-full bg-[#0e1a29] border border-zinc-700 rounded px-3 py-2" value={policy.time} onChange={(e)=>setPolicy({...policy, time:e.target.value})}/>
            </div>
            <div>
              <label className="block text-xs text-zinc-400 mb-1">On the Following Day(s)</label>
              <div className="flex flex-wrap gap-2">
                {allDays.map((d)=>(
                  <label key={d} className={`px-2 py-1 rounded border ${policy.days.includes(d as any) ? 'bg-cyan-900 border-cyan-700' : 'bg-[#0e1a29] border-zinc-700'}`}>
                    <input type="checkbox" className="mr-1" checked={policy.days.includes(d as any)} onChange={()=>toggleDay(d)}/> {d}
                  </label>
                ))}
              </div>
            </div>
          </div>

          <div className="flex items-center gap-6 mt-4">
            <div className="flex items-center gap-2">
              <input type="radio" name="del" checked={policy.deleteAfterDays<=0} onChange={()=>setPolicy({...policy, deleteAfterDays: 0, locked:false})}/>
              <span className="text-sm">Never</span>
            </div>
            <div className="flex items-center gap-2">
              <input type="radio" name="del" checked={policy.deleteAfterDays>0} onChange={()=>setPolicy({...policy, deleteAfterDays: 14})}/>
              <span className="text-sm">Automatically after</span>
              <input type="number" className="w-20 bg-[#0e1a29] border border-zinc-700 rounded px-2 py-1" value={policy.deleteAfterDays>0?policy.deleteAfterDays:14} onChange={(e)=>setPolicy({...policy, deleteAfterDays: Math.max(1, Number(e.target.value)||1)})} disabled={policy.deleteAfterDays<=0}/>
              <span className="text-sm">day(s)</span>
            </div>
          </div>
        </div>

        <div>
          <div className="text-sm text-zinc-400 mb-1">Snapshot Locking</div>
          <p className="text-xs text-zinc-500 mb-2">Locked snapshots cannot be deleted before the deletion schedule expires. For this feature to be available, snapshots must be set to automatically delete.</p>
          <label className={`flex items-center gap-2 ${!canLock ? 'opacity-50 cursor-not-allowed' : ''}`}>
            <input type="checkbox" disabled={!canLock} checked={policy.locked && canLock} onChange={(e)=>setPolicy({...policy, locked: e.target.checked})}/>
            <span>Enable locked snapshots</span>
          </label>
        </div>

        <label className="flex items-center gap-2">
          <input type="checkbox" checked={policy.enabled} onChange={(e)=>setPolicy({...policy, enabled: e.target.checked})}/>
          <span>Enable policy</span>
        </label>

        <div className="flex gap-3">
          <button onClick={save} disabled={saving} className="px-4 py-2 rounded bg-cyan-700 hover:bg-cyan-600 disabled:opacity-50">Save Policy</button>
          <a className="px-4 py-2 rounded border border-zinc-700">Cancel</a>
        </div>
      </div>
    </div>
  )
}
