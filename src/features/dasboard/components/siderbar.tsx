import { Button } from "@/ui/button";
import { Home, LayoutDashboard, Settings, User } from "lucide-react";
import Link from "next/link";

export function Sidebar() {
	return (
		<div className="flex h-full flex-col gap-2 p-4">
			<div className="flex h-14 items-center border-b px-4 font-semibold">
				<Link href="/dashboard" className="flex items-center gap-2">
					<LayoutDashboard className="h-6 w-6" />
					<span>Dashboard</span>
				</Link>
			</div>
			<nav className="grid gap-1 px-2 pt-4">
				<Button variant="ghost" asChild className="justify-start">
					<Link href="/dashboard" className="flex items-center gap-2">
						<Home className="h-5 w-5" />
						<span>Home</span>
					</Link>
				</Button>
				<Button variant="ghost" asChild className="justify-start">
					<Link href="/dashboard/settings" className="flex items-center gap-2">
						<Settings className="h-5 w-5" />
						<span>Settings</span>
					</Link>
				</Button>
				<Button variant="ghost" asChild className="justify-start">
					<Link href="/dashboard/profile" className="flex items-center gap-2">
						<User className="h-5 w-5" />
						<span>Profile</span>
					</Link>
				</Button>
			</nav>
		</div>
	);
}
