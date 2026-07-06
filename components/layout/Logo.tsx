import { LayoutDashboard } from "lucide-react"
import Link from "next/link"

export default function Logo() {
	return (
		<Link href={"/"} className="flex gap-1 ">
			<LayoutDashboard />
			<h4 className="capitalize!"> Interior</h4>
		</Link>
	)
}
