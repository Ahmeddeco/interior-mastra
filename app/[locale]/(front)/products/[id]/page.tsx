import ImageSlider from "@/components/shared/ImageSlider"
import { getOneProduct, relatedProducts } from "@/dl/product.data"
import { getOneProductType, relatedProductsType } from "@/types/product.type"

type Props = {
	params: Promise<{ id: string; locale: "ar" | "en" }>
}
// TODO: Complete the page and add related products section
export default async function ProductPage({ params }: Props) {
	const locale = (await params).locale
	const id = (await params).id
	const oneProduct: getOneProductType = await getOneProduct(id)
	let related_Products: relatedProductsType | undefined
	if (oneProduct?.classId && oneProduct?.styleId) {
		related_Products = await relatedProducts(oneProduct.classId, oneProduct.styleId)
	}

	console.log("related_Products from ProductPage", related_Products)

	return (
		<section className="flex lg:flex-row flex-col items-center justify-center gap-6  lg:h-[90vh] h-auto">
			<div className="flex-1 h-full">
				<ImageSlider
					mainImage={oneProduct?.mainImage ?? "/images/noImage.svg"}
					images={oneProduct?.images ?? []}
					alt={oneProduct?.titleEn ?? "product image"}
				/>{" "}
			</div>
			<div className="flex-1 flex flex-col gap-4 h-full">
				<h1>{locale === "en" ? oneProduct?.titleEn : oneProduct?.titleAr}</h1>
			</div>
		</section>
	)
}
