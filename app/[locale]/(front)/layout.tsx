import NavBar from "@/components/layout/NavBar"

export default function FrontLayout({ children }: { children: React.ReactNode }) {
	return (
		<>
			<NavBar />
			<main className="min-h-dvh px-4 pt-14 container mx-auto" suppressHydrationWarning>
				{children}
			</main>
		</>
	)
}
