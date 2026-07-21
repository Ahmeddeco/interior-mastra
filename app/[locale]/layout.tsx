import type { Metadata, Viewport } from "next"
import "../globals.css"
import { ThemeProvider } from "@/components/theme/theme-provider"
import { Toaster } from "@/components/ui/sonner"
import { CircleAlert, CircleCheckBig, CircleX } from "lucide-react"
import Footer from "@/components/layout/Footer"
import { NextSSRPlugin } from "@uploadthing/react/next-ssr-plugin"
import { extractRouterConfig } from "uploadthing/server"
import { ourFileRouter } from "@/app/api/uploadthing/core"
import localFont from "next/font/local"
import { DirectionProvider } from "@/components/ui/direction"

import { TooltipProvider } from "@/components/ui/tooltip"

const cairo = localFont({
	src: "../../public/fonts/Cairo.ttf",
	variable: "--cairo-font",
})

const APP_NAME = "Interior"
const APP_DEFAULT_TITLE = "Interior | 3D Interior Design Studio"
const APP_TITLE_TEMPLATE = "%s - Interior"
const APP_DESCRIPTION = "استوديو متقدم لتصاميم الديكور الداخلي والأثاث ثلاثي الأبعاد"

export const metadata: Metadata = {
	applicationName: APP_NAME,
	title: {
		default: APP_DEFAULT_TITLE,
		template: APP_TITLE_TEMPLATE,
	},
	description: APP_DESCRIPTION,
	manifest: "/manifest.json",
	appleWebApp: {
		capable: true,
		statusBarStyle: "default",
		title: APP_NAME,
	},
	formatDetection: {
		telephone: false,
	},
	icons: {
		icon: [
			{ url: "/icons/manifest-icon-192.maskable.png", sizes: "192x192", type: "image/png" },
			{ url: "/icons/manifest-icon-512.maskable.png", sizes: "512x512", type: "image/png" },
		],
		apple: [{ url: "/icons/apple-icon-180.png", sizes: "180x180", type: "image/png" }],
	},
	openGraph: {
		type: "website",
		siteName: APP_NAME,
		title: {
			default: APP_DEFAULT_TITLE,
			template: APP_TITLE_TEMPLATE,
		},
		description: APP_DESCRIPTION,
	},
	twitter: {
		card: "summary",
		title: {
			default: APP_DEFAULT_TITLE,
			template: APP_TITLE_TEMPLATE,
		},
		description: APP_DESCRIPTION,
	},
}

export const viewport: Viewport = {
	themeColor: "#facc15",
}

export default async function RootLayout({
	children,
	params,
}: Readonly<{
	children: React.ReactNode
	params: Promise<{ locale: string }>
}>) {
	const locale = (await params).locale

	return (
		<html
			lang={locale}
			dir={locale === "ar" ? "rtl" : "ltr"}
			className={`h-full antialiased ${cairo.className}`}
			suppressHydrationWarning
		>
			<body className="scroll-smooth min-h-screen w-full overflow-x-hidden">
				<ThemeProvider attribute="class" defaultTheme="light" disableTransitionOnChange>
					<NextSSRPlugin routerConfig={extractRouterConfig(ourFileRouter)} />
					<TooltipProvider>
						<DirectionProvider dir={locale === "ar" ? "rtl" : "ltr"}>{children}</DirectionProvider>
						<Toaster
							theme="system"
							richColors
							duration={5000}
							icons={{
								success: <CircleCheckBig />,
								warning: <CircleAlert />,
								error: <CircleX />,
							}}
						/>
					</TooltipProvider>
					<Footer />
				</ThemeProvider>
			</body>
		</html>
	)
}
