import { isAllowedRoles } from "@/auth/isAllowedRoles"
import ServerPageCard from "@/components/shared/ServerPageCard"
import AddClass from "@/forms/AddClass"
import { Role } from "@/generated/prisma/enums"

export default async function AddColorPage() {
	await isAllowedRoles([Role.admin])

	return (
		<ServerPageCard title={"Add class"} description={"Add a class to the database."} href="/server/classes">
			<AddClass />
		</ServerPageCard>
	)
}
