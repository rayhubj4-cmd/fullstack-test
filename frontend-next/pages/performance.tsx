import { useEffect, useMemo, useState } from 'react'
import Layout from '../components/Layout'
import MetricCard from '../components/MetricCard'
import { MetricsChart } from '../components/Charts'
import api from '../lib/api'

const ranges = ['Last 7 days','Last 24 hours','Last 30 days'] as const

export default function Performance(){
  const [data, setData] = useState<any|null>(null)
  const [range, setRange] = useState<typeof ranges[number]>('Last 7 days')
  const clusterId = process.env.NEXT_PUBLIC_CLUSTER_ID

  useEffect(()=>{
    api.get(`/api/clusters/${clusterId}/metrics`).then(r=>setData(r.data))
  },[clusterId, range])

  const latest = useMemo(()=>{
    if (!data?.iops?.length) return { iops:{read:0,write:0}, tp:{read:0,write:0} }
    const i = data.iops[data.iops.length-1]
    const t = data.throughput[data.throughput.length-1]
    return { iops: i, tp: t }
  },[data])

  return (
    <Layout>
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <div className="text-2xl text-zinc-100">Performance Metrics</div>
        <div>
          <select value={range} onChange={(e)=>setRange(e.target.value as any)} className="bg-[#0e1a29] border border-zinc-700 text-sm rounded px-2 py-1">
            {ranges.map(r => <option key={r} value={r}>{r}</option>)}
          </select>
        </div>
      </div>

      {/* IOPS Row */}
      <div className="grid grid-cols-12 gap-4 items-start mb-8">
        <div className="col-span-9">
          <div className="text-zinc-200 mb-2">IOPS</div>
          <MetricsChart title="" data={data?.iops || []} />
        </div>
        <div className="col-span-3 flex justify-end">
          <MetricCard title="IOPS" read={latest.iops.read} write={latest.iops.write} unit="IOPS" />
        </div>
      </div>

      {/* Throughput Row */}
      <div className="grid grid-cols-12 gap-4 items-start">
        <div className="col-span-9">
          <div className="text-zinc-200 mb-2">Throughput</div>
          <MetricsChart title="" data={data?.throughput || []} />
        </div>
        <div className="col-span-3 flex justify-end">
          <MetricCard title="Throughput" read={latest.tp.read} write={latest.tp.write} unit="GB/s" />
        </div>
      </div>
    </Layout>
  )
}