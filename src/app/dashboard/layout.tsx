"use client";

import { Sheet, SheetContent } from "@/ui/sheet";
import { useState } from "react";
import { Navbar } from "@/features/dashboard/components/navbar";
import { Sidebar } from "@/features/dashboard/components/siderbar";

export default function Dashboard({ children }: { children: React.ReactNode }) {
	const [open, setOpen] = useState(false);

	const handleOpenSidebar = () => {
		setOpen(true);
	};

	return (
		<div className="flex min-h-screen flex-col">
			<Navbar onOpenSidebar={handleOpenSidebar} />
			<div className="flex flex-1">
				<Sheet open={open} onOpenChange={setOpen}>
					<SheetContent side="left" className="w-64 p-0">
						<Sidebar />
					</SheetContent>
				</Sheet>

				<aside className="hidden w-64 flex-col border-r bg-muted/40 md:flex">
					<Sidebar />
				</aside>

				<main className="flex-1 p-4 md:p-6">
					{children}
				</main>
			</div>
		</div>
	);
}
