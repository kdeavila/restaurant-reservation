"use client";

import { Button } from "@/ui/button";
import { LayoutDashboard } from "lucide-react";
import { NotificationsPopover } from "./notifications-popover";
import { UserDropdown } from "./user-dropdown";

interface NavbarProps {
	onOpenSidebar: () => void;
}

export function Navbar({ onOpenSidebar }: NavbarProps) {
	return (
		<header className="sticky top-0 z-30 flex h-16 items-center gap-4 border-b bg-background px-4 md:px-6">
			<Button
				variant="outline"
				size="icon"
				className="md:hidden"
				onClick={onOpenSidebar}
			>
				<LayoutDashboard className="h-5 w-5" />
				<span className="sr-only">Toggle sidebar</span>
			</Button>
			<div className="flex-1" />
			<div className="flex items-center gap-4">
				<NotificationsPopover />
				<UserDropdown />
			</div>
		</header>
	);
}
