import { CircleChevronLeft } from "lucide-react"
import ServerPageCard from "@/components/shared/ServerPageCard"
import EmptyCard from "@/components/shared/EmptyCard"
import { getOneClass } from "@/dl/class.data"
import EditClass from "@/forms/EditClass"
import { isAllowedRoles } from "@/auth/isAllowedRoles"
import { Role } from "@/generated/prisma/enums"
import { getOneClassType } from "@/types/class.type"

export default async function EditClassPage({ params }: { params: Promise<{ slug: string }> }) {
	await isAllowedRoles([Role.admin])

	const slug = (await params).slug
	const oneClass: getOneClassType = await getOneClass(slug)

	return (
		<ServerPageCard
			icon={CircleChevronLeft}
			title={"edit color"}
			description={"edit a color to the database."}
			btnTitle={"back"}
			href="/server/classes"
		>
			{!oneClass ? (
				<EmptyCard href={"/server/classes"} linkTitle={"no class found"} />
			) : (
				<EditClass oneClass={oneClass} />
			)}
		</ServerPageCard>
	)
}
