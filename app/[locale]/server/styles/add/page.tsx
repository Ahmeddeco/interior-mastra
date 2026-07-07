import { isAllowedRoles } from "@/auth/isAllowedRoles"
import ServerPageCard from "@/components/shared/ServerPageCard"
import AddStyle from "@/forms/AddStyle"
import { Role } from "@/generated/prisma/enums"

export default async function AddColorPage() {
	await isAllowedRoles([Role.admin])

	return (
		<ServerPageCard title={"Add style"} description={"Add a style to the database."} href="/server/styles">
			<AddStyle />
		</ServerPageCard>
	)
}
