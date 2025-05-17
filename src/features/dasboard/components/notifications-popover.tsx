import { Button } from "@/ui/button";
import { Popover, PopoverContent, PopoverTrigger } from "@/ui/popover";
import {
	AlertTriangle,
	Bell,
	Calendar,
	CheckCircle,
	MessageSquare,
} from "lucide-react";

export function NotificationsPopover() {
	return (
		<Popover>
			<PopoverTrigger asChild>
				<Button variant="ghost" size="icon" className="relative">
					<Bell className="h-5 w-5" />
					<span className="absolute right-1 top-1 flex h-2 w-2 rounded-full bg-red-600" />
					<span className="sr-only">Notifications</span>
				</Button>
			</PopoverTrigger>
			<PopoverContent className="w-80 p-0" align="end">
				<div className="border-b p-4">
					<div className="text-sm font-medium">Notifications</div>
				</div>
				<ul className="max-h-80 overflow-auto">
					<li className="border-b last:border-0">
						<button className="flex w-full items-start gap-4 p-4 text-left hover:bg-muted/50">
							<span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-primary/10 text-primary">
								<MessageSquare className="h-4 w-4" />
							</span>
							<div className="grid gap-1">
								<div className="text-sm font-medium">New Message</div>
								<div className="text-xs text-muted-foreground">
									John sent you a message about the project
								</div>
								<div className="text-xs text-muted-foreground">
									2 minutes ago
								</div>
							</div>
						</button>
					</li>
					<li className="border-b last:border-0">
						<button className="flex w-full items-start gap-4 p-4 text-left hover:bg-muted/50">
							<span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-orange-500/10 text-orange-500">
								<AlertTriangle className="h-4 w-4" />
							</span>
							<div className="grid gap-1">
								<div className="text-sm font-medium">System Alert</div>
								<div className="text-xs text-muted-foreground">
									Your storage is almost full (85%)
								</div>
								<div className="text-xs text-muted-foreground">1 hour ago</div>
							</div>
						</button>
					</li>
					<li className="border-b last:border-0">
						<button className="flex w-full items-start gap-4 p-4 text-left hover:bg-muted/50">
							<span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-green-500/10 text-green-500">
								<CheckCircle className="h-4 w-4" />
							</span>
							<div className="grid gap-1">
								<div className="text-sm font-medium">Task Completed</div>
								<div className="text-xs text-muted-foreground">
									Project milestone has been achieved
								</div>
								<div className="text-xs text-muted-foreground">Yesterday</div>
							</div>
						</button>
					</li>
					<li className="border-b last:border-0">
						<button className="flex w-full items-start gap-4 p-4 text-left hover:bg-muted/50">
							<span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-blue-500/10 text-blue-500">
								<Calendar className="h-4 w-4" />
							</span>
							<div className="grid gap-1">
								<div className="text-sm font-medium">Upcoming Meeting</div>
								<div className="text-xs text-muted-foreground">
									Team standup at 10:00 AM tomorrow
								</div>
								<div className="text-xs text-muted-foreground">2 days ago</div>
							</div>
						</button>
					</li>
				</ul>
				<div className="border-t p-2">
					<Button
						variant="ghost"
						className="w-full justify-center text-xs"
						size="sm"
					>
						View all notifications
					</Button>
				</div>
			</PopoverContent>
		</Popover>
	);
}
