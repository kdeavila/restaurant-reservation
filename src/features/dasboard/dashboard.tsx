"use client"

import { useState } from "react"
import { Sheet, SheetContent } from "@/ui/sheet"
import { Sidebar } from "./components/siderbar"
import { Navbar } from "./components/navbar"

export default function Dashboard() {
  const [open, setOpen] = useState(false)

  const handleOpenSidebar = () => {
    setOpen(true)
  }

  return (
    <div className="flex min-h-screen flex-col">
      <Navbar onOpenSidebar={handleOpenSidebar} />
      <div className="flex flex-1">

        <Sheet open={open} onOpenChange={setOpen}>
          <SheetContent side="left" className="w-64 p-0">
            <Sidebar />
          </SheetContent>
        </Sheet>

        <aside className="hidden w-64 flex-col border-r bg-muted/40 md:flex">
          <Sidebar />
        </aside>

        <main className="flex-1 p-4 md:p-6">
          <section className="space-y-4">
            <h1 className="text-2xl font-bold">Dashboard</h1>
            <p className="text-muted-foreground">Welcome to your dashboard. This is the main content area.</p>
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              {Array.from({ length: 6 }).map((_, i) => (
                <article key={i} className="rounded-lg border bg-card p-6 shadow-sm">
                  <h3 className="text-lg font-medium">Card {i + 1}</h3>
                  <p className="text-sm text-muted-foreground">This is a sample card in your dashboard.</p>
                </article>
              ))}
            </div>
          </section>
        </main>
      </div>
    </div>
  )
}
