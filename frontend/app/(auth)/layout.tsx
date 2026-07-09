import Navbar from "@/components/home/Navbar"

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main >
        {children}
      </main>
    </div>
  )
}