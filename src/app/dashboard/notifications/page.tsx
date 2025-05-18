import { EmailTemplates } from "@/features/notifications/components/email-templates";
import { NotificationHistory } from "@/features/notifications/components/notification-history";
import { Button } from "@/ui/button";
import { Input } from "@/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/ui/tabs";

export default function NotificationsPage() {
	return (
		<div className="space-y-6">
			<div className="flex items-center justify-between">
				<h1 className="text-3xl font-bold tracking-tight">Notifications</h1>
			</div>

			<Tabs defaultValue="history">
				<TabsList>
					<TabsTrigger value="history">Notification History</TabsTrigger>
					<TabsTrigger value="templates">Email Templates</TabsTrigger>
				</TabsList>
				<TabsContent value="history" className="mt-4">
					<div className="flex items-center gap-2 mb-4">
						<Input placeholder="Search notifications..." className="max-w-sm" />
						<Button variant="outline">Search</Button>
					</div>
					<NotificationHistory />
				</TabsContent>
				<TabsContent value="templates" className="mt-4">
					<EmailTemplates />
				</TabsContent>
			</Tabs>
		</div>
	);
}
