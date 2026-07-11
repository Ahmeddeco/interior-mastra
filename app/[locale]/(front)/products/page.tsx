import FiltersSideBar from "@/components/pages/products/FiltersSideBar"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar"
import { getAllClassesForProductPage } from "@/dl/class.data"
import { getAllColorsForProductPage } from "@/dl/color.data"
import { getAllFactoriesForSort } from "@/dl/factory.data"
import { getFilteredProductsForFilteredPage } from "@/dl/filterdProduct.data"
import { getAllStylesForFilterProductPage } from "@/dl/styles.data"
import { getAllClassesForProductPageType } from "@/types/class.type"
import { getAllColorsForProductPageType } from "@/types/color.type"
import { getAllFactoriesForSortType } from "@/types/factory.type"
import { getFilteredProductsForFilteredPageType } from "@/types/product.type"
import { getAllStylesForFilterProductPageType } from "@/types/style.type"
import { ListFilter } from "lucide-react"
import {
	Pagination,
	PaginationContent,
	PaginationItem,
	PaginationLink,
	PaginationNext,
	PaginationPrevious,
} from "@/components/ui/pagination"
import ProductCard from "@/components/pages/products/ProductCard"
import { Badge } from "@/components/ui/badge"

type Props = {
	params: Promise<{ locale: "ar" | "en" }>
	searchParams: Promise<{
		min_price: string
		max_price: string
		color: string | string[]
		class: string | string[]
		style: string | string[]
		sort_by: string
		page: string
		size: string
	}>
}

export default async function ProductsPage({ params, searchParams }: Props) {
	const locale = (await params).locale
	const searchParam = await searchParams
	const { page, size } = await searchParams
	const pageNumber = +page > 1 ? +page : 1
	const pageSize = +size || 12
	const allClasses: getAllClassesForProductPageType = await getAllClassesForProductPage()
	const allStyles: getAllStylesForFilterProductPageType = await getAllStylesForFilterProductPage()
	const allColors: getAllColorsForProductPageType = await getAllColorsForProductPage()
	const allFactories: getAllFactoriesForSortType = await getAllFactoriesForSort()
	const filteredProducts: getFilteredProductsForFilteredPageType = await getFilteredProductsForFilteredPage(
		searchParam,
		pageSize,
		pageNumber,
	)

	return (
		<SidebarProvider>
			<FiltersSideBar
				locale={locale}
				allClasses={allClasses}
				allStyles={allStyles}
				allColors={allColors}
				allFactories={allFactories}
			/>
			<div className="w-full p-6 ">
				<SidebarTrigger dir={locale === "ar" ? "rtl" : "ltr"}>
					<ListFilter />
				</SidebarTrigger>

				{/* ------------------------------- Products ------------------------------ */}
				<Card>
					<CardHeader>
						<CardTitle>
							Total Filtered Products.
							<br />
							<Badge variant={"default"}>
								{filteredProducts.totalProducts} {locale === "en" ? "Products" : "منتج"}
							</Badge>{" "}
						</CardTitle>
						<CardDescription>All filtered products via filters you select from filter sidebar</CardDescription>
					</CardHeader>

					{/* ---------------------------- ProductCards ---------------------------- */}
					<CardContent className="flex flex-wrap justify-center  gap-6">
						{filteredProducts ? (
							filteredProducts.data.map((product) => <ProductCard key={product.id} product={product} locale={locale} />)
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
								{Array.from({ length: filteredProducts.totalPages ?? 1 }).map((_, index) => (
									<PaginationItem key={index}>
										<PaginationLink href={`?size=${pageSize}&page=${index + 1}`} isActive={pageNumber === index + 1}>
											{index + 1}
										</PaginationLink>
									</PaginationItem>
								))}
								<PaginationItem>
									{/* ----------------------------- Next ----------------------------- */}
									{pageNumber < filteredProducts.totalPages && (
										<PaginationNext href={`?size=${pageSize}&page=${pageNumber + 1}`} />
									)}
								</PaginationItem>
							</PaginationContent>
						</Pagination>
					</CardFooter>
				</Card>
			</div>
		</SidebarProvider>
	)
}
