"use client";

import { cn } from "@/lib/utils";
import { Button } from "@/ui/button";
import { ScrollArea } from "@/ui/scroll-area";
import * as React from "react";

export function TableSelector() {
	const [selectedTable, setSelectedTable] = React.useState<string | null>(null);

	// En una aplicación real, estos datos vendrían de la base de datos
	const tables = [
		{ id: "1", capacity: 2, status: "disponible" },
		{ id: "2", capacity: 4, status: "disponible" },
		{ id: "3", capacity: 2, status: "disponible" },
		{ id: "4", capacity: 6, status: "disponible" },
		{ id: "5", capacity: 4, status: "ocupada" },
		{ id: "6", capacity: 8, status: "disponible" },
		{ id: "7", capacity: 4, status: "ocupada" },
		{ id: "8", capacity: 2, status: "disponible" },
		{ id: "9", capacity: 10, status: "disponible" },
		{ id: "10", capacity: 4, status: "disponible" },
	];

	return (
		<ScrollArea className="h-[200px] border rounded-md p-4">
			<div className="grid grid-cols-5 gap-2">
				{tables.map((table) => (
					<Button
						key={table.id}
						variant={selectedTable === table.id ? "default" : "outline"}
						className={cn(
							"h-20 flex flex-col items-center justify-center",
							table.status === "ocupada" && "opacity-50 cursor-not-allowed",
						)}
						disabled={table.status === "ocupada"}
						onClick={() => setSelectedTable(table.id)}
					>
						<span className="text-sm font-medium">Table {table.id}</span>
						<span className="text-xs">{table.capacity} people</span>
					</Button>
				))}
			</div>
		</ScrollArea>
	);
}
