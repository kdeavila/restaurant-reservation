"use client";

import { useAuth } from "@/context/auth-context";
import { Button } from "@/ui/button";
import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogFooter,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from "@/ui/dialog";
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuSeparator,
	DropdownMenuTrigger,
} from "@/ui/dropdown-menu";
import { ChevronDown, LogOut, Settings, User } from "lucide-react";
import { useState } from "react";

export function UserDropdown() {
	const { user, logout } = useAuth();
	const [isOpen, setIsOpen] = useState(false);

	const handleLogout = () => {
		logout();
		setIsOpen(false);
	};

	return (
		<>
			<DropdownMenu>
				<DropdownMenuTrigger asChild>
					<Button variant="ghost" className="flex items-center gap-2">
						<User className="h-5 w-5" />
						<span>{user?.name || "Usuario"}</span>
						<ChevronDown className="h-4 w-4" />
					</Button>
				</DropdownMenuTrigger>
				<DropdownMenuContent align="end">
					<DropdownMenuItem>
						<User className="mr-2 h-4 w-4" />
						Profile
					</DropdownMenuItem>
					<DropdownMenuItem>
						<Settings className="mr-2 h-4 w-4" />
						Settings
					</DropdownMenuItem>
					<DropdownMenuSeparator />
					<Dialog open={isOpen} onOpenChange={setIsOpen}>
						<DialogTrigger asChild>
							<DropdownMenuItem onSelect={(e) => e.preventDefault()}>
								<LogOut className="mr-2 h-4 w-4" />
								Logout
							</DropdownMenuItem>
						</DialogTrigger>
						<DialogContent>
							<DialogHeader>
								<DialogTitle>Confirm Logout</DialogTitle>
								<DialogDescription>
									Are you sure you want to logout? Any unsaved changes will be
									lost.
								</DialogDescription>
							</DialogHeader>
							<DialogFooter>
								<Button variant="outline" onClick={() => setIsOpen(false)}>Cancel</Button>
								<Button onClick={handleLogout}>Logout</Button>
							</DialogFooter>
						</DialogContent>
					</Dialog>
				</DropdownMenuContent>
			</DropdownMenu>
		</>
	);
}
