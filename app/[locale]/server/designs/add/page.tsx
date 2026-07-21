import { isAllowedRoles } from "@/auth/isAllowedRoles"
import ServerPageCard from "@/components/shared/ServerPageCard"
import { getAllStylesForProductPage } from "@/dl/styles.data"
import { getAllClients } from "@/dl/users.data"
import AddDesign from "@/forms/AddDesign"
import { Role } from "@/generated/prisma/enums"
import { getAllStylesForProductPageType } from "@/types/style.type"
import { getAllClientsType } from "@/types/user.type"

export default async function AddColorPage() {
	await isAllowedRoles([Role.admin])

	const styles: getAllStylesForProductPageType = await getAllStylesForProductPage()
	const clients: getAllClientsType = await getAllClients()

	return (
		<ServerPageCard title={"Add design"} description={"Add a design to the database."} href="/server/products">
			<AddDesign styles={styles!} clients={clients} />
		</ServerPageCard>
	)
}
