import { PageContainer } from "@/components/layout/page-container"
import { PageHeader } from "@/components/layout/page-header"
import { PageShell } from "@/components/layout/page-shell"

export default function DashboardPage() {
  return (
    <PageShell>
      <PageContainer>
        <PageHeader title="Dashboard" />
      </PageContainer>
    </PageShell>
  )
}
