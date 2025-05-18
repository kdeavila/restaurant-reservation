import { CustomerTable } from "@/features/clients/components/customer-table";
import { Button } from "@/ui/button";
import { Input } from "@/ui/input";
import { PlusCircle } from "lucide-react";
import Link from "next/link";

export default function CustomersPage() {
	return (
		<div className="space-y-6">
			<div className="flex items-center justify-between">
				<h1 className="text-3xl font-bold tracking-tight">Clients</h1>
				<Link href="/dashboard/clients/new">
					<Button>
						<PlusCircle className="mr-2 h-4 w-4" />
						New Client
					</Button>
				</Link>
			</div>

			<div className="flex items-center gap-2">
				<Input placeholder="Search clients..." className="max-w-sm" />
				<Button variant="outline">Search</Button>
			</div>

			<CustomerTable />
		</div>
	);
}
