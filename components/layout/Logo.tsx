import { LayoutDashboard } from "lucide-react"
import Link from "next/link"

export default function Logo() {
	return (
		<Link href={"/"} className="flex items-center gap-1 ">
			<LayoutDashboard size={36} className="dark:text-primary" />
			<h1 className="capitalize!"> Interior</h1>
		</Link>
	)
}
