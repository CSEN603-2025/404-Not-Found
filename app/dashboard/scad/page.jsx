import ScadDashboardClient from "@/components/scad-dashboard-client"
import { DashboardShell } from "@/components/dashboard-shell"

export const metadata = {
  title: "SCAD Office Dashboard | GUC Internship System",
  description: "Manage company applications, students, reports, workshops & calls",
}

export default function ScadDashboardPage() {
  return (
    <DashboardShell>
      <ScadDashboardClient />
    </DashboardShell>
  )
}
