import { PageContainer } from "@/components/layout/page-container"
import { PageHeader } from "@/components/layout/page-header"
import { PageShell } from "@/components/layout/page-shell"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

export default function SettingsPage() {
  return (
    <PageShell className="overflow-y-auto">
      <PageContainer>
        <PageHeader title="Settings" />
        <Card>
          <CardHeader>
            <CardTitle>General</CardTitle>
          </CardHeader>
          <CardContent className="text-body-md text-muted-foreground">
            Global configuration lives on this page only.
          </CardContent>
        </Card>
      </PageContainer>
    </PageShell>
  )
}
