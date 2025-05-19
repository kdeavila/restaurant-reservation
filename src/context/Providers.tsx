"use client";

import { AuthProvider } from "@/context/auth-context";
import { ThemeProvider } from "@/context/themes-provider";

export function Providers({ children }: { children: React.ReactNode }) {
	return (
		<ThemeProvider
			attribute="class"
			defaultTheme="system"
			enableSystem
			disableTransitionOnChange
		>
			<AuthProvider>
				{children}
			</AuthProvider>
		</ThemeProvider>
	);
}
