import { ServerSidebar } from "@/components/layout/ServerSidebar"
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar"

export default async function ServerLayout({
	children,
	params,
}: {
	children: React.ReactNode
	params: Promise<{ locale: "ar" | "en" }>
}) {
	const locale = (await params).locale

	return (
		<SidebarProvider>
			<ServerSidebar locale={locale} />
			<div className="w-full p-6 ">
				<SidebarTrigger dir={locale === "ar" ? "rtl" : "ltr"} />
				{children}
			</div>
		</SidebarProvider>
	)
}
