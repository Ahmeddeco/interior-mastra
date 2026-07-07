import ProductCard from "@/components/shared/ProductCard"
import { getOneInterior } from "@/dl/interior.data"
import { oneInteriorProject } from "@/types/interior.type"

type Props = {
	params: Promise<{
		id: string
		locale: "ar" | "en"
	}>
}

export default async function InteriorProjectPage({ params }: Props) {
	const id = (await params).id
	const locale = (await params).locale
	const data: oneInteriorProject = await getOneInterior(id)

	return <ProductCard data={data} locale={locale} />
}
