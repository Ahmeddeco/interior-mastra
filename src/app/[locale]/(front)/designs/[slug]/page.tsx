import ImageSlider from "@/components/shared/ImageSlider"
import { Badge } from "@/components/ui/badge"
import { getOneDesign } from "@/dl/design.data"
import { dateFormate } from "@/logic/dateFormate"
import { getOneDesignType } from "@/types/design.type"
import { MapPin, Palette } from "lucide-react"
import { FaRegCalendarAlt } from "react-icons/fa"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"

type Props = {
	params: Promise<{ slug: string; locale: "ar" | "en" }>
}
export default async function OneDesignPage({ params }: Props) {
	const locale = (await params).locale
	const slug = (await params).slug
	const oneDesign: getOneDesignType = await getOneDesign(slug)

	return (
		<div className="flex flex-col gap-6 container mx-auto">
			{/* ----------------------------- main design ---------------------------- */}
			<section className="flex lg:flex-row flex-col  gap-6  h-fit">
				{/* ----------------------------- ImageSlider ----------------------------- */}
				<div className="flex-1 h-full">
					<ImageSlider
						mainImage={oneDesign?.mainImage ?? "/images/noImage.svg"}
						images={oneDesign?.images ?? []}
						alt={oneDesign?.titleEn ?? "design image"}
					/>
				</div>

				{/* ------------------------------- details ------------------------------ */}
				<div className="flex-1 flex flex-col gap-4 h-auto">
					<h1>{locale === "en" ? oneDesign?.titleEn : oneDesign?.titleAr}</h1>

					{/* ------------------------ class & style & createdAt ----------------------- */}
					<div className="flex flex-wrap w-full items-center gap-4 ">
						<Badge>
							<Palette />
							{oneDesign?.style.titleEn}
						</Badge>
						<Badge>
							<MapPin />
							{oneDesign?.country} - {oneDesign?.state}
						</Badge>
						<Badge>
							<FaRegCalendarAlt />
							{dateFormate(oneDesign?.createdAt as Date, locale, "yearOnly")}
						</Badge>
					</div>

					{oneDesign?.descriptionAr && oneDesign.descriptionEn && (
						<Accordion type="single" collapsible defaultValue="description">
							{/* ------------------------------- description ------------------------------ */}
							<AccordionItem value="description">
								<AccordionTrigger>{locale === "en" ? "description" : "وصف التصميم"}</AccordionTrigger>
								<AccordionContent>
									<div
										className="prose dark:prose-invert max-w-none"
										dangerouslySetInnerHTML={{
											__html: locale === "en" ? oneDesign?.descriptionEn : oneDesign?.descriptionAr,
										}}
									/>
								</AccordionContent>
							</AccordionItem>

							{/* ------------------------------- painPoints ------------------------------ */}
							{oneDesign?.painPointsAr && oneDesign.painPointsEn && (
								<AccordionItem value="painPoints">
									<AccordionTrigger>{locale === "en" ? "client problems" : "المشاكل التي لدى العميل"}</AccordionTrigger>
									<AccordionContent>
										<div
											className="prose dark:prose-invert max-w-none"
											dangerouslySetInnerHTML={{
												__html: locale === "en" ? oneDesign?.painPointsEn : oneDesign?.painPointsAr,
											}}
										/>
									</AccordionContent>
								</AccordionItem>
							)}

							{/* ------------------------------- solutions ------------------------------ */}
							{oneDesign?.solutionsAr && oneDesign.solutionsEn && (
								<AccordionItem value="solutions">
									<AccordionTrigger>
										{locale === "en" ? "How the design solved the client's problems" : "كيف حل التصميم مشاكل العميل"}
									</AccordionTrigger>
									<AccordionContent>
										<div
											className="prose dark:prose-invert max-w-none"
											dangerouslySetInnerHTML={{
												__html: locale === "en" ? oneDesign?.solutionsEn : oneDesign?.solutionsAr,
											}}
										/>
									</AccordionContent>
								</AccordionItem>
							)}
						</Accordion>
					)}
				</div>
			</section>

			{/* --------------------------- related products --------------------------
			{(related_Products && (
				<section className="flex flex-col items-center justify-center gap-6">
					<div className="flex flex-col items-center justify-center gap-1">
						<h2 className="text-center">{locale === "en" ? "related products" : "منتجات ذات صلة"}</h2>
						<h6 className="text-center text-pretty">
							{locale === "en"
								? "Products that follow the same style and the same category."
								: "منتجات تتبع نفس الاستايل ونفس الفئة."}
						</h6>
					</div>
					<div className="flex flex-wrap justify-center items-center gap-6">
						{related_Products.map((product) => (
							<ProductCard key={product.id} product={product} locale={locale} />
						))}
					</div>
				</section>
			)) ||
				null} */}
		</div>
	)
}
