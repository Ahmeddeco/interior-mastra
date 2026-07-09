"use client"

import {
	Sidebar,
	SidebarContent,
	SidebarFooter,
	SidebarGroup,
	SidebarGroupContent,
	SidebarHeader,
} from "@/components/ui/sidebar"
import { ListFilter } from "lucide-react"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { Slider } from "@/components/ui/slider"
import Form from "next/form"
import { useState } from "react"
import { Input } from "@/components/ui/input"
import { getAllClassesForProductPageType } from "@/types/class.type"
import MultiSelectItem from "@/components/shared/MultiSelectItem"
import { Currency } from "@/logic/currency"
import { getAllStylesForFilterProductPageType } from "@/types/style.type"
import SelectColors from "@/components/shared/SelectColors"
import { getAllColorsForProductPageType } from "@/types/color.type"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Separator } from "@/components/ui/separator"
import SortBy from "@/components/shared/SortBy"
import { sortByItems } from "@/constants/sortBy"
import { SubmitButton } from "@/components/shared/CustomButtons"
import { Button } from "@/components/ui/button"
import { getAllFactoriesForSortType } from "@/types/factory.type"

type Props = {
	locale: "ar" | "en"
	allClasses: getAllClassesForProductPageType
	allStyles: getAllStylesForFilterProductPageType
	allColors: getAllColorsForProductPageType
	allFactories: getAllFactoriesForSortType
}
export default function FiltersSideBar({ locale, allClasses, allStyles, allColors, allFactories }: Props) {
	const [price, setPrice] = useState([0, 0])
	const isMinPriceChanged = price[0] > 0
	const isMaxPriceChanged = price[1] > 0
	const [activeSort, setActiveSort] = useState<string>("")
	const formattedFactories = allFactories?.map((factory) => ({
		id: factory.id,
		image: factory.logo,
		titleEn: factory.name,
		titleAr: factory.name,
		slug: factory.slug,
	}))

	return (
		<Sidebar side={locale === "ar" ? "right" : "left"} className="mt-14" variant="sidebar">
			{/* --------------------------------- Inputs --------------------------------- */}
			<Form action={"/products"} className="h-full">
				<Input type="hidden" name={isMinPriceChanged ? "min_price" : undefined} value={price[0]} />
				<Input type="hidden" name={isMaxPriceChanged ? "max_price" : undefined} value={price[1]} />
				{activeSort && <Input type="hidden" name="sort_by" value={activeSort} />}

				<SidebarHeader>
					<div className="flex items-center gap-2">
						<ListFilter />
						{locale === "en" ? "filter products" : "فلتر المنتجات"}
					</div>
					<Separator />
				</SidebarHeader>
				<ScrollArea className="h-full ">
					<SidebarContent className="h-[80vh]">
						{/* ----------------------------- sort-by ---------------------------- */}
						<SidebarGroup>
							<SidebarGroupContent>
								<Accordion type="multiple">
									<AccordionItem value="sort-by">
										<AccordionTrigger>{locale === "en" ? "Sort By" : "فلتر بواسطة"}</AccordionTrigger>
										<AccordionContent>
											<ScrollArea className="h-32">
												{sortByItems.map(({ titleAr, titleEn, value }, index) => (
													<SortBy
														key={index}
														value={value}
														locale={locale}
														selectedValue={activeSort}
														onSelect={setActiveSort}
														titleAr={titleAr}
														titleEn={titleEn}
													/>
												))}
											</ScrollArea>
										</AccordionContent>
									</AccordionItem>

									{/* --------------------------------- factory -------------------------------- */}
									<AccordionItem value="factory">
										<AccordionTrigger>{locale === "en" ? "factory" : "الفئة"}</AccordionTrigger>
										<AccordionContent>
											<MultiSelectItem data={formattedFactories} inputName={"factory"} locale={locale} />
										</AccordionContent>
									</AccordionItem>

									{/* --------------------------- price -------------------------- */}
									<AccordionItem value="price">
										<AccordionTrigger>{locale === "en" ? "price" : "السعر"}</AccordionTrigger>
										<AccordionContent className="p-4 h-fit flex flex-col gap-4 items-center">
											<Slider
												id="slider-price"
												value={price}
												min={0}
												max={50000}
												step={10}
												dir={locale === "en" ? "ltr" : "rtl"}
												onValueChange={setPrice}
											/>
											<Button size={"sm"} variant={"default"} disabled>
												{Currency(price[0], locale)} - {Currency(price[1], locale)}
											</Button>
										</AccordionContent>
									</AccordionItem>

									{/* ---------------------------------- class --------------------------------- */}
									<AccordionItem value="class">
										<AccordionTrigger>{locale === "en" ? "class" : "الفئة"}</AccordionTrigger>
										<AccordionContent>
											<MultiSelectItem data={allClasses} inputName={"class"} locale={locale} />
										</AccordionContent>
									</AccordionItem>

									{/* ---------------------------------- style --------------------------------- */}
									<AccordionItem value="style">
										<AccordionTrigger>{locale === "en" ? "style" : "الاستايل"}</AccordionTrigger>
										<AccordionContent>
											<MultiSelectItem data={allStyles} inputName={"style"} locale={locale} />
										</AccordionContent>
									</AccordionItem>

									{/* --------------------------- color -------------------------- */}
									<AccordionItem value="color">
										<AccordionTrigger>{locale === "en" ? "color" : "الألوان"}</AccordionTrigger>
										<AccordionContent>
											<SelectColors data={allColors} inputName={"color"} locale={locale} />
										</AccordionContent>
									</AccordionItem>
								</Accordion>
							</SidebarGroupContent>
						</SidebarGroup>
					</SidebarContent>
					<SidebarFooter>
						<SubmitButton title={locale === "en" ? "apply filter" : "طبق الفلتر"} icon={ListFilter} variant="default" />
					</SidebarFooter>
				</ScrollArea>
			</Form>
		</Sidebar>
	)
}
