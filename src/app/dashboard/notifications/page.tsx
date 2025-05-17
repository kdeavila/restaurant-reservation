import { Button } from "@/ui/button"
import { Input } from "@/ui/input"
import { NotificationHistory } from "@/features/notifications/components/notification-history"
import { EmailTemplates } from "@/features/notifications/components/email-templates"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/ui/tabs"

export default function NotificationsPage() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold tracking-tight">Notificaciones</h1>
      </div>

      <Tabs defaultValue="history">
        <TabsList>
          <TabsTrigger value="history">Historial de Notificaciones</TabsTrigger>
          <TabsTrigger value="templates">Plantillas de Email</TabsTrigger>
        </TabsList>
        <TabsContent value="history" className="mt-4">
          <div className="flex items-center gap-2 mb-4">
            <Input placeholder="Buscar notificaciones..." className="max-w-sm" />
            <Button variant="outline">Buscar</Button>
          </div>
          <NotificationHistory />
        </TabsContent>
        <TabsContent value="templates" className="mt-4">
          <EmailTemplates />
        </TabsContent>
      </Tabs>
    </div>
  )
}
