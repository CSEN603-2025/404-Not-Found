import { DashboardShell } from "@/components/dashboard-shell"
import { DashboardHeader } from "@/components/dashboard-header"
import { CompanyVerificationWorkflow } from "@/components/company-verification-workflow"

export const metadata = {
  title: "Company Verification | GUC Internship System",
  description: "Upload and manage your company verification documents",
}

export default function CompanyVerificationPage() {
  return (
    <DashboardShell>
      <DashboardHeader
        heading="Company Verification"
        text="Upload and manage your company verification documents"
      />
      <div className="grid gap-8">
        <CompanyVerificationWorkflow />
      </div>
    </DashboardShell>
  )
}
