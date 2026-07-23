import { isAllowedRoles } from "@/auth/isAllowedRoles"
import { Role } from "@/generated/prisma/enums"

export default async function ServerPage() {
	await isAllowedRoles([Role.admin])

	return <h1>Welcome to Serverpage!</h1>
}
