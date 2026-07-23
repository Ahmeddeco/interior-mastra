import { CircleChevronLeft } from "lucide-react"
import ServerPageCard from "@/components/shared/ServerPageCard"
import EmptyCard from "@/components/shared/EmptyCard"
import { getOneFactory } from "@/dl/factory.data"
import EditFactory from "@/forms/EditFactory"
import { getAllUsersForFactoriesPage } from "@/dl/users.data"
import { isAllowedRoles } from "@/auth/isAllowedRoles"
import { Role } from "@/generated/prisma/enums"

export default async function EditClassPage({ params }: { params: Promise<{ slug: string }> }) {
	await isAllowedRoles([Role.admin])

	const slug = (await params).slug
	const oneFactory = await getOneFactory(slug)
	const users = await getAllUsersForFactoriesPage()
	return (
		<ServerPageCard
			icon={CircleChevronLeft}
			title={"edit factory"}
			description={"edit a factory to the database."}
			btnTitle={"back"}
			href="/server/factories"
		>
			{!oneFactory?.data ? (
				<EmptyCard href={"/server/factories"} linkTitle={"no factory found"} />
			) : (
				<EditFactory users={users} factory={oneFactory.data} />
			)}
		</ServerPageCard>
	)
}
