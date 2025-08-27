
import Link from 'next/link'
import { useRouter } from 'next/router'

function NavItem({ href, label }: { href: string, label: string }) {
  const { pathname } = useRouter()
  const active = pathname === href
  return (
    <li>
      <Link href={href} className={`block px-4 py-2 rounded ${active ? 'bg-cyan-700 text-white' : 'text-zinc-300 hover:bg-cyan-900'}`}>
        {label}
      </Link>
    </li>
  )
}

export default function Sidebar() {
  return (
    <aside className="w-64 bg-[#1b2533] border-r border-zinc-800 p-4 relative">
      {/* Cluster Name + Icon */}
      <div className="flex items-center mb-6 space-x-2">
        {/* 左邊的小圖示 */}
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-5 w-5 text-cyan-400"
          viewBox="0 0 20 20"
          fill="currentColor"
        >
          <path d="M2 4a2 2 0 012-2h3v2H4v3H2V4zm0 9h2v3h3v2H4a2 2 0 01-2-2v-3zm16-9v3h-2V4h-3V2h3a2 2 0 012 2zm-2 9h2v3a2 2 0 01-2 2h-3v-2h3v-3z" />
        </svg>
        <span className="text-white font-semibold">[Cluster Name]</span>
      </div>

      {/* Menu List */}
      <ul className="space-y-2 text-sm">
        <NavItem href="/performance" label="Performance Metrics" active />
        <NavItem href="/snapshot" label="Edit Snapshot Policy" />
      </ul>

      {/* Bottom User */}
      <div className="absolute bottom-4 left-4 flex items-center space-x-2 text-xs text-zinc-400">
        {/* 左邊一個S icon */}
        <div className="h-5 w-5 rounded-full bg-zinc-600 flex items-center justify-center text-white">
          S
        </div>
        <span>AD\user</span>
        {/* 下拉箭頭 */}
        <svg
          className="h-3 w-3 text-zinc-400"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          viewBox="0 0 24 24"
        >
          <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
        </svg>
      </div>
    </aside>
  )
}