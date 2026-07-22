import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import {
	Pagination,
	PaginationContent,
	PaginationItem,
	PaginationLink,
	PaginationNext,
	PaginationPrevious,
} from "@/components/ui/pagination"
import { Badge } from "@/components/ui/badge"
import { getAllArticlesForArticlesPageType } from "@/types/article.type"
import { getAllArticlesForArticlesPage } from "@/dl/article.data"
import ArticleCard from "@/components/pages/articles/ArticleCard"
import { Separator } from "@/components/ui/separator"

type Props = {
	params: Promise<{ locale: "ar" | "en" }>
	searchParams: Promise<{
		page: string
		size: string
	}>
}

export default async function ArticlesPage({ params, searchParams }: Props) {
	const locale = (await params).locale
	const { page, size } = await searchParams
	const pageNumber = +page > 1 ? +page : 1
	const pageSize = +size || 12
	const articles: getAllArticlesForArticlesPageType = await getAllArticlesForArticlesPage(pageSize, pageNumber)
	const totalPages = articles?.totalPages ?? 1

	return (
		<Card className="mt-10 min-h-[80vh] ">
			<CardHeader>
				<CardTitle>
					{locale === "en" ? "our designs " : "جميع تصميماتنا "}
					{/* <br /> */}
					<Badge variant={"default"} className="mx-2">
						{articles?.totalArticles} {locale === "en" ? "designs" : "تصميمات"}
					</Badge>
				</CardTitle>
				<CardDescription>
					{locale === "en" ? "All the designs we have implemented." : "جميع التصاميم التي قمنا بتنفيذها"}
				</CardDescription>
			</CardHeader>
			<Separator />

			{/* ------------------------------- Designs ------------------------------ */}
			<CardContent className="flex flex-wrap justify-center items-center  gap-6">
				{articles ? (
					articles.data.map((article) => <ArticleCard key={article.id} article={article} locale={locale} />)
				) : (
					<h2>no article found</h2>
				)}
			</CardContent>

			{/* ------------------------------- Pagination ------------------------------- */}
			<CardFooter>
				<Pagination>
					<PaginationContent>
						<PaginationItem>
							{/* --------------------------- Previous --------------------------- */}
							{pageNumber > 1 && <PaginationPrevious href={`?size=${pageSize}&page=${pageNumber - 1}`} />}
						</PaginationItem>
						{/* ------------------------- PaginationLink ------------------------ */}
						{Array.from({ length: articles?.totalPages ?? 1 }).map((_, index) => (
							<PaginationItem key={index}>
								<PaginationLink href={`?size=${pageSize}&page=${index + 1}`} isActive={pageNumber === index + 1}>
									{index + 1}
								</PaginationLink>
							</PaginationItem>
						))}
						<PaginationItem>
							{/* ----------------------------- Next ----------------------------- */}
							{pageNumber < totalPages && <PaginationNext href={`?size=${pageSize}&page=${pageNumber + 1}`} />}{" "}
						</PaginationItem>
					</PaginationContent>
				</Pagination>
			</CardFooter>
		</Card>
	)
}
