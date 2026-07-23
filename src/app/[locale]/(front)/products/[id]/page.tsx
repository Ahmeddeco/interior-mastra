import ProductCard from "@/components/pages/products/ProductCard"
import ImageSlider from "@/components/shared/ImageSlider"
import { Badge } from "@/components/ui/badge"
import { getOneProduct, relatedProducts } from "@/dl/product.data"
import { Currency, finalPrice } from "@/logic/currency"
import { dateFormate } from "@/logic/dateFormate"
import AddToCart from "@/store/AddToCart"
import { getOneProductType, relatedProductsType } from "@/types/product.type"
import { Palette, Shapes } from "lucide-react"
import { FaRegCalendarAlt } from "react-icons/fa"

type Props = {
	params: Promise<{ id: string; locale: "ar" | "en" }>
}
export default async function ProductPage({ params }: Props) {
	const locale = (await params).locale
	const id = (await params).id
	const oneProduct: getOneProductType = await getOneProduct(id)
	let related_Products: relatedProductsType | undefined
	if (oneProduct?.classId && oneProduct?.styleId) {
		related_Products = await relatedProducts(oneProduct.styleId, oneProduct.id)
	}

	return (
		<div className="flex flex-col gap-6">
			{/* ----------------------------- main product ---------------------------- */}
			<section className="flex lg:flex-row flex-col  gap-6  h-fit">
				{/* ----------------------------- ImageSlider ----------------------------- */}
				<div className="flex-1 h-full">
					<ImageSlider
						mainImage={oneProduct?.mainImage ?? "/images/noImage.svg"}
						images={oneProduct?.images ?? []}
						alt={oneProduct?.titleEn ?? "product image"}
					/>
				</div>

				{/* ------------------------------- details ------------------------------ */}
				<div className="flex-1 flex flex-col gap-4 h-auto">
					<h1>{locale === "en" ? oneProduct?.titleEn : oneProduct?.titleAr}</h1>

					{/* ------------------------ class & style & createdAt ----------------------- */}
					<div className="flex flex-wrap w-full items-center gap-4 ">
						<Badge>
							<Shapes />
							{oneProduct?.class.titleEn}
						</Badge>
						<Badge>
							<Palette />
							{oneProduct?.style.titleEn}
						</Badge>
						<Badge>
							<FaRegCalendarAlt />
							{dateFormate(oneProduct?.createdAt as Date, locale, "yearOnly")}
						</Badge>
					</div>

					{/* -------------------------- price & discount -------------------------- */}
					<div className="flex items-center gap-2">
						{oneProduct?.discount && oneProduct?.discount > 0 ? (
							<>
								<h4>{finalPrice(oneProduct?.price, oneProduct?.discount, locale)}</h4>
								<h6 className="line-through text-muted-foreground">{Currency(oneProduct?.price, locale)}</h6>
							</>
						) : (
							<h4>{Currency(oneProduct!.price, locale)}</h4>
						)}
					</div>

					{/* -------------------------------- quantity -------------------------------- */}
					<div>
						<h4>
							{locale === "en" ? "Available quantity" : "الكمية المتاحة :"} :{" "}
							<span className="dark:text-primary font-black">{oneProduct?.quantity}</span>
							{locale === "en" ? " piece" : " قطعة "}
						</h4>
					</div>

					{/* ---------------------------- miniDescription ---------------------------- */}
					<div className="">
						<h4 className="capitalize">{locale === "en" ? "description" : "وصف المنتج"}</h4>
						<h6>{locale === "en" ? oneProduct?.miniDescriptionEn : oneProduct?.miniDescriptionAr}</h6>
					</div>

					{/* ------------------------------- description ------------------------------ */}
					{oneProduct?.descriptionAr && oneProduct.descriptionEn && (
						<div
							className="prose dark:prose-invert max-w-none"
							dangerouslySetInnerHTML={{
								__html: locale === "en" ? oneProduct?.descriptionEn : oneProduct?.descriptionAr,
							}}
						/>
					)}
					<AddToCart
						product={{
							id: oneProduct?.id ?? "",
							titleAr: oneProduct?.titleAr ?? "",
							titleEn: oneProduct?.titleEn ?? "",
							price: oneProduct?.price ?? 0,
							mainImage: oneProduct?.mainImage ?? "",
						}}
					/>
				</div>
			</section>

			{/* --------------------------- related products -------------------------- */}
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
				null}
		</div>
	)
}
