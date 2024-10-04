export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <main className="w-full bg-blue-500 h-[70vh] rounded-2xl p-4">
      { children }
    </main>
  )
}
