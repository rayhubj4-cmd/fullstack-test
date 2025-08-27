
import Sidebar from './Sidebar'
import Head from 'next/head'

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen flex">
      <Head><title>Cluster Dashboard</title></Head>
      <Sidebar />
      <main className="flex-1 p-6">
        {children}
      </main>
    </div>
  )
}
