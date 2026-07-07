import { isAllowedRoles } from "@/auth/isAllowedRoles"
import ServerPageCard from "@/components/shared/ServerPageCard"
import AddColor from "@/forms/AddColor"
import { Role } from "@/generated/prisma/enums"

export default async function AddColorPage() {
	await isAllowedRoles([Role.admin])

	return (
		<ServerPageCard title={"Add Color"} description={"Add a Color to the database."} href="/server/colors">
			<AddColor />
		</ServerPageCard>
	)
}
