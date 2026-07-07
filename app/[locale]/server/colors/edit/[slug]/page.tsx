import { CircleChevronLeft } from "lucide-react"
import ServerPageCard from "@/components/shared/ServerPageCard"
import EmptyCard from "@/components/shared/EmptyCard"
import EditColor from "@/forms/EditColor"
import { getOneColor } from "@/dl/color.data"
import { isAllowedRoles } from "@/auth/isAllowedRoles"
import { Role } from "@/generated/prisma/enums"

export default async function EditUserPage({ params }: { params: Promise<{ slug: string }> }) {
	await isAllowedRoles([Role.admin])

	const slug = (await params).slug
	const color = await getOneColor(slug)

	return (
		<ServerPageCard
			icon={CircleChevronLeft}
			title={"edit color"}
			description={"edit a color to the database."}
			btnTitle={"back"}
			href="/server/colors"
		>
			{!color?.data ? (
				<EmptyCard href={"/server/colors"} linkTitle={"no color found"} />
			) : (
				<EditColor color={color.data} />
			)}
		</ServerPageCard>
	)
}
