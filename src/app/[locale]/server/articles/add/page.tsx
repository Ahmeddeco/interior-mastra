import { isAllowedRoles } from "@/auth/isAllowedRoles"
import ServerPageCard from "@/components/shared/ServerPageCard"
import { getAllAuthors } from "@/dl/users.data"
import AddArticle from "@/forms/AddArticle"
import { Role } from "@/generated/prisma/enums"
import { getAllAuthorsType } from "@/types/user.type"

export default async function AddArticlePage() {
	await isAllowedRoles([Role.admin])
	const authors: getAllAuthorsType = await getAllAuthors()

	return (
		<ServerPageCard title={"Add article"} description={"Add a article to the database."} href="/server/articles">
			<AddArticle authors={authors} />
		</ServerPageCard>
	)
}
