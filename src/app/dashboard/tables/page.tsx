import { Button } from "@/ui/button";
import { Input } from "@/ui/input";
import { TableManagement } from "@/features/tables/components/table-management";
import { PlusCircle } from "lucide-react";
import Link from "next/link";

export default function TablesPage() {
	return (
		<div className="space-y-6">
			<div className="flex items-center justify-between">
				<h1 className="text-3xl font-bold tracking-tight">Mesas</h1>
				<Link href="/dashboard/tables/new">
					<Button>
						<PlusCircle className="mr-2 h-4 w-4" />
						Nueva Mesa
					</Button>
				</Link>
			</div>

			<div className="flex items-center gap-2">
				<Input placeholder="Buscar mesas..." className="max-w-sm" />
				<Button variant="outline">Buscar</Button>
			</div>

			<TableManagement />
		</div>
	);
}
