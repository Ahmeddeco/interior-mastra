import { isAllowedRoles } from "@/auth/isAllowedRoles"
import ServerPageCard from "@/components/shared/ServerPageCard"
import { getAllUsersForFactoriesPage } from "@/dl/users.data"
import AddFactory from "@/forms/AddFactory"
import { Role } from "@/generated/prisma/enums"

export default async function AddColorPage() {
	await isAllowedRoles([Role.admin])

	const users = await getAllUsersForFactoriesPage()

	return (
		<ServerPageCard title={"Add factory"} description={"Add a factory to the database."} href="/server/factories">
			<AddFactory users={users} />
		</ServerPageCard>
	)
}
