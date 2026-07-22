import { isAllowedRoles } from "@/auth/isAllowedRoles"
import ServerPageCard from "@/components/shared/ServerPageCard"
import { getOneArticle } from "@/dl/article.data"
import { getAllAuthors } from "@/dl/users.data"
import EditArticle from "@/forms/EditArticle"
import { Role } from "@/generated/prisma/enums"
import { getOneArticleType } from "@/types/article.type"
import { getAllAuthorsType } from "@/types/user.type"

type Props = {
	params: Promise<{ slug: string }>
}

export default async function EditArticlePage({ params }: Props) {
	await isAllowedRoles([Role.admin])
	const slug = (await params).slug
	const authors: getAllAuthorsType = await getAllAuthors()
	const article: getOneArticleType = await getOneArticle(slug)

	return (
		<ServerPageCard title={"Add article"} description={"Add a article to the database."} href="/server/articles">
			<EditArticle authors={authors} article={article} />
		</ServerPageCard>
	)
}
