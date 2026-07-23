import { CircleChevronLeft } from "lucide-react"
import ServerPageCard from "@/components/shared/ServerPageCard"
import EmptyCard from "@/components/shared/EmptyCard"
import { getOneStyle } from "@/dl/styles.data"
import { isAllowedRoles } from "@/auth/isAllowedRoles"
import { Role } from "@/generated/prisma/enums"
import { getOneStyleType } from "@/types/style.type"
import EditStyle from "@/forms/EditStyle"

export default async function EditClassPage({ params }: { params: Promise<{ slug: string }> }) {
	await isAllowedRoles([Role.admin])

	const slug = (await params).slug
	const oneStyle: getOneStyleType = await getOneStyle(slug)

	return (
		<ServerPageCard
			icon={CircleChevronLeft}
			title={"edit style"}
			description={"edit a style to the database."}
			btnTitle={"back"}
			href="/server/styles"
		>
			{!oneStyle ? (
				<EmptyCard href={"/server/styles"} linkTitle={"no style found"} />
			) : (
				<EditStyle oneStyle={oneStyle} />
			)}
		</ServerPageCard>
	)
}
