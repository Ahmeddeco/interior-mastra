"use client"

import Logo from "./Logo"
import { Copyright } from "lucide-react"
import Socials from "./Socials"
import { Badge } from "../ui/badge"
import { useCurrentLocale } from "@/locales/client.locale"
import { Separator } from "../ui/separator"

export default function Footer() {
	const locale = useCurrentLocale()

	return (
		<footer className="bg-card border-t border-foreground py-16 px-6">
			<div className="container mx-auto">
				<div className="flex flex-col gap-6 items-center justify-center">
					<Logo />
					<h6 className="max-w-md text-center text-balance">
						{locale === "en"
							? "At Interior, a trusted name in the world of high-quality furniture since 1994, we offer carefully crafted pieces to bring comfort and style to your home."
							: "نحن في انتريور اسم موثوق في عالم الأثاث عالي الجودة منذ عام 1994، نقدم قطعاً مصنوعة بعناية لتضفي الراحة والأناقة على منزلك."}
					</h6>
					<Socials />

					<Separator />

					<Badge variant={"default"}>
						<Copyright />
						2026 Ahmed Elgazzar. All rights reserved.
					</Badge>
				</div>
			</div>
		</footer>
	)
}
