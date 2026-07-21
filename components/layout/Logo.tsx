import { LayoutDashboard } from "lucide-react"
import Link from "next/link"

export default function Logo() {
	return (
		<Link href={"/"} className="flex items-end gap-1 ">
			<LayoutDashboard size={36} className="dark:text-primary" />
			<h2 className="capitalize!  leading-none"> Interior</h2>
		</Link>
	)
}
