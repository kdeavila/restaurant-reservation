import { ThemeProvider } from "@/context/themes-provider";
export function Providers({ children }: { children: React.ReactNode }) {
	return (
		<ThemeProvider
			attribute="class"
			defaultTheme="system"
			enableSystem
			disableTransitionOnChange
		>
			{children}
		</ThemeProvider>
	);
}
