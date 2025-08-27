import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid } from 'recharts'

export function MetricsChart({ data, title }: { data: any[], title: string }){
  return (
    <div className="bg-[#0e1a29] border border-zinc-800 rounded p-2">
      {title ? <div className="text-zinc-200 text-lg mb-2">{title}</div> : null}
      <ResponsiveContainer width="100%" height={240}>
        <LineChart data={data}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="ts" hide />
          <YAxis />
          <Tooltip />
          <Line type="monotone" dataKey="read" dot={false} strokeOpacity={0.9} />
          <Line type="monotone" dataKey="write" dot={false} strokeOpacity={0.9} />
        </LineChart>
      </ResponsiveContainer>
    </div>
  )
}