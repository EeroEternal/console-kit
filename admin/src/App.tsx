import { useState } from "react"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select } from "@/components/ui/select"

export default function App() {
  const [open, setOpen] = useState(false)

  return (
    <div className="min-h-screen bg-background p-6 text-foreground">
      <h1 className="text-lg font-semibold tracking-tight">UI kit</h1>
      <div className="mt-4 flex flex-wrap items-end gap-3">
        <Button onClick={() => setOpen(true)}>Open dialog</Button>
        <div className="w-56">
          <Label>Status</Label>
          <Select
            value="active"
            onChange={() => {}}
            options={[
              { value: "active", label: "Active" },
              { value: "disabled", label: "Disabled" },
            ]}
          />
        </div>
        <Input className="max-w-xs" placeholder="Search name, id" />
      </div>
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="max-h-[85vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Example</DialogTitle>
          </DialogHeader>
          <p className="text-sm text-muted-foreground">Shared Dialog primitive.</p>
          <DialogFooter>
            <Button variant="outline" onClick={() => setOpen(false)}>
              Cancel
            </Button>
            <Button onClick={() => setOpen(false)}>Save</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}
