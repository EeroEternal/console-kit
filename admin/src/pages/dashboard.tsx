import { Activity, Server } from "lucide-react"
import { PageContainer } from "@/components/layout/page-container"
import { PageHeader } from "@/components/layout/page-header"
import { PageShell } from "@/components/layout/page-shell"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { StatCard } from "@/components/ui/stat-card"

export default function DashboardPage() {
  return (
    <PageShell className="overflow-y-auto">
      <PageContainer>
        <PageHeader title="Dashboard" />
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-4">
          <StatCard title="Requests today" value="2,560" icon={Activity} />
          <StatCard title="Online nodes" value="3 / 3" icon={Server} />
        </div>
        <Card className="mt-6">
          <CardHeader>
            <CardTitle>Traffic</CardTitle>
          </CardHeader>
          <CardContent className="text-meta-sm text-muted-foreground">
            Replace with the product chart. Reserved height, no casual subtitle.
          </CardContent>
        </Card>
      </PageContainer>
    </PageShell>
  )
}
