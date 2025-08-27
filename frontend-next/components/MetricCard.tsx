
export default function MetricCard({ title, read, write, unit }: { title: string, read: string|number, write: string|number, unit: string }){
  return (
    <div className="w-64 bg-[#0e1a29] border border-zinc-800 rounded p-4 ml-6">
      <div className="text-zinc-300 mb-2">{title}</div>
      <div className="flex justify-between">
        <div><div className="text-zinc-400 text-xs">Read</div><div className="text-cyan-300 text-lg">{read}<span className="text-xs ml-1">{unit}</span></div></div>
        <div><div className="text-zinc-400 text-xs">Write</div><div className="text-purple-300 text-lg">{write}<span className="text-xs ml-1">{unit}</span></div></div>
      </div>
    </div>
  )
}
