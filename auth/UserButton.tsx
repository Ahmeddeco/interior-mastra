import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuLabel,
	DropdownMenuSeparator,
	DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import Image from "next/image"
import SignOut from "./signOut"
import SignIn from "./SignIn"
import { getSession } from "./getSession"

export default async function UserButton() {
	const Session = await getSession()
	const user = Session?.user

	return (
		<>
			{user ? (
				<DropdownMenu>
					<DropdownMenuTrigger>
						<div className="size-9 relative rounded-none border cursor-pointer ">
							<Image src={user.image ?? "/icons/noImage.svg"} alt={"user"} fill className="rounded-none object-cover" />
						</div>
					</DropdownMenuTrigger>
					<DropdownMenuContent align="start" className="w-fit">
						<DropdownMenuLabel>
							<div className="w-full aspect-square relative rounded-xl">
								<Image src={user.image ?? "/icons/noImage.svg"} alt={"user"} fill className="rounded-xl object-cover" />
							</div>
						</DropdownMenuLabel>
						<DropdownMenuSeparator />
						<DropdownMenuItem className="capitalize">{user.name}</DropdownMenuItem>
						<DropdownMenuItem>{user.email}</DropdownMenuItem>
						<DropdownMenuItem asChild>
							<SignOut />
						</DropdownMenuItem>
					</DropdownMenuContent>
				</DropdownMenu>
			) : (
				<SignIn />
			)}
		</>
	)
}
