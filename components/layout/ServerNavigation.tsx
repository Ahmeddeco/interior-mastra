"use client"

import { SidebarMenu } from "../ui/sidebar"
import { usePathname } from "next/navigation"
import Link from "next/link"
import { Button } from "../ui/button"
import React from "react"
import { serverNav } from "@/constants/serverNav"

export default function ServerNavigation() {
	const pathName = usePathname()

	return (
		<SidebarMenu className="h-full space-y-2">
			{serverNav.map(({ href, title, icon }) => (
				<SidebarMenu key={href}>
					<Button asChild variant={pathName === href ? "default" : "ghost"} size={"full"} className=" justify-start">
						<Link href={href}>
							{React.createElement(icon)}
							{title}
						</Link>
					</Button>
				</SidebarMenu>
			))}
		</SidebarMenu>
	)
}
