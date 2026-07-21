import { CircleChevronLeft } from "lucide-react"
import ServerPageCard from "@/components/shared/ServerPageCard"
import EmptyCard from "@/components/shared/EmptyCard"
import { isAllowedRoles } from "@/auth/isAllowedRoles"
import { Role } from "@/generated/prisma/enums"
import EditDesign from "@/forms/EditDesign"
import { getAllStylesForProductPageType } from "@/types/style.type"
import { getAllClientsType } from "@/types/user.type"
import { getAllClients } from "@/dl/users.data"
import { getAllStylesForProductPage } from "@/dl/styles.data"
import { getOneDesignType } from "@/types/design.type"
import { getOneDesign } from "@/dl/design.data"

export default async function EditUserPage({ params }: { params: Promise<{ slug: string }> }) {
	await isAllowedRoles([Role.admin])

	const slug = (await params).slug
	const design: getOneDesignType = await getOneDesign(slug)
	const styles: getAllStylesForProductPageType = await getAllStylesForProductPage()
	const clients: getAllClientsType = await getAllClients()

	return (
		<ServerPageCard
			icon={CircleChevronLeft}
			title={"edit design"}
			description={"edit a design in the database."}
			btnTitle={"back"}
			href="/server/designs"
		>
			{!design ? (
				<EmptyCard href={"/server/designs"} linkTitle={"no design found"} />
			) : (
				<EditDesign styles={styles!} clients={clients} design={design} />
			)}
		</ServerPageCard>
	)
}
