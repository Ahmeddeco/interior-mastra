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
import { getAllDesignsForDesignServerPageType } from "@/types/design.type"
import { getAllDesignsForDesignServerPage } from "@/dl/design.data"
import DesignCard from "@/components/pages/designs/DesignCard"

type Props = {
	params: Promise<{ locale: "ar" | "en" }>
	searchParams: Promise<{
		page: string
		size: string
	}>
}

export default async function DesignsPage({ params, searchParams }: Props) {
	const locale = (await params).locale
	const { page, size } = await searchParams
	const pageNumber = +page > 1 ? +page : 1
	const pageSize = +size || 12
	const allDesigns: getAllDesignsForDesignServerPageType = await getAllDesignsForDesignServerPage(pageSize, pageNumber)
	const totalPages = allDesigns?.totalPages ?? 1

	return (
		<Card className="mt-10 min-h-[80vh] ">
			<CardHeader>
				<CardTitle>
					{locale === "en" ? "our designs " : "جميع تصميماتنا "}
					{/* <br /> */}
					<Badge variant={"default"} className="mx-2">
						{allDesigns?.totalDesigns} {locale === "en" ? "designs" : "تصميمات"}
					</Badge>
				</CardTitle>
				<CardDescription>
					{locale === "en" ? "All the designs we have implemented." : "جميع التصاميم التي قمنا بتنفيذها"}
				</CardDescription>
			</CardHeader>

			{/* ------------------------------- Designs ------------------------------ */}
			<CardContent className="flex flex-wrap justify-center items-center  gap-6">
				{allDesigns ? (
					allDesigns.data.map((design) => <DesignCard key={design.id} design={design} locale={locale} />)
				) : (
					<h2>no product found</h2>
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
						{Array.from({ length: allDesigns?.totalPages ?? 1 }).map((_, index) => (
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
