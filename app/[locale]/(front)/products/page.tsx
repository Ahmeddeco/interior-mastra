import FiltersSideBar from "@/components/pages/products/FiltersSideBar"
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar"
import { getAllClassesForProductPage } from "@/dl/class.data"
import { getAllColorsForProductPage } from "@/dl/color.data"
import { getAllFactoriesForSort } from "@/dl/factory.data"
import { getAllStylesForFilterProductPage } from "@/dl/styles.data"
import { getAllClassesForProductPageType } from "@/types/class.type"
import { getAllColorsForProductPageType } from "@/types/color.type"
import { getAllFactoriesForSortType } from "@/types/factory.type"
import { getAllStylesForFilterProductPageType } from "@/types/style.type"
import { ListFilter } from "lucide-react"

type Props = {
	params: Promise<{ locale: "ar" | "en" }>
	searchParams: Promise<{
		min_price: string
		max_price: string
		color: string | string[]
		class: string | string[]
		style: string | string[]
		sort_by: string
	}>
}

export default async function ShopPage({ params, searchParams }: Props) {
	const locale = (await params).locale
	const searchParam = await searchParams
	const allClasses: getAllClassesForProductPageType = await getAllClassesForProductPage()
	const allStyles: getAllStylesForFilterProductPageType = await getAllStylesForFilterProductPage()
	const allColors: getAllColorsForProductPageType = await getAllColorsForProductPage()
	const allFactories: getAllFactoriesForSortType = await getAllFactoriesForSort()

	console.log("searchParam", searchParam)

	return (
		<SidebarProvider suppressHydrationWarning>
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
				<h1>Welcome to Shoppage!</h1>
			</div>
		</SidebarProvider>
	)
}
