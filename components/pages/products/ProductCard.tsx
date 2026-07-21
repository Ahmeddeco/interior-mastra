import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Currency, finalPrice } from "@/logic/currency"
import AddToCart from "@/store/AddToCart"
import { filteredProductType } from "@/types/product.type"
import { Eye, Palette, Shapes } from "lucide-react"
import Image from "next/image"
import Link from "next/link"

type Props = {
	product: filteredProductType
	locale: "ar" | "en"
}

export default function ProductCard({ locale, product }: Props) {
	return (
		<Card className=" md:w-xs lg:w-md sm:w-xs w-xs min-w-2xs">
			<CardHeader>
				<CardTitle className="line-clamp-1">{locale === "en" ? product.titleEn : product.titleAr}</CardTitle>
				<CardDescription className="line-clamp-1">
					{locale === "en" ? product.miniDescriptionEn : product.miniDescriptionAr}
				</CardDescription>
			</CardHeader>
			<CardContent className="flex flex-col  gap-2">
				<Image
					src={product.mainImage}
					alt={product.titleEn}
					width={128}
					height={128}
					className="aspect-video w-full object-cover"
				/>

				<div className="flex flex-wrap items-center  gap-2">
					<Badge>
						<Shapes />
						{locale === "en" ? product.class.titleEn : product.class.titleAr}
					</Badge>
					<Badge>
						<Palette />
						{locale === "en" ? product.style.titleEn : product.style.titleAr}
					</Badge>
				</div>

				{/* -------------------------- price & discount -------------------------- */}
				<div className="flex items-center gap-2">
					{product.discount && product?.discount > 0 ? (
						<>
							<h4>{finalPrice(product.price, product.discount, locale)}</h4>
							<h6 className="line-through text-muted-foreground">{Currency(product.price, locale)}</h6>
						</>
					) : (
						<h4>{Currency(product.price, locale)}</h4>
					)}
				</div>
			</CardContent>
			<CardFooter className="flex flex-col items-center justify-center gap-2">
				<Button asChild size={"full"} variant={"outline"}>
					<Link href={`/products/${product.id}`}>
						<Eye />
						{locale === "en" ? "see more" : "شاهد المزيد"}
					</Link>
				</Button>
				<AddToCart product={product} />
			</CardFooter>
		</Card>
	)
}
