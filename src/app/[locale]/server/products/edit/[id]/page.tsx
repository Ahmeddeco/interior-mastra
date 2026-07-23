import { CircleChevronLeft } from "lucide-react"
import ServerPageCard from "@/components/shared/ServerPageCard"
import EmptyCard from "@/components/shared/EmptyCard"
import { getAllFactoriesForProductPage } from "@/dl/factory.data"
import { getAllColorsForProductPage } from "@/dl/color.data"
import { getAllStylesForProductPage } from "@/dl/styles.data"
import { getAllClassesForProductPage } from "@/dl/class.data"
import { getOneProduct } from "@/dl/product.data"
import { isAllowedRoles } from "@/auth/isAllowedRoles"
import { Role } from "@/generated/prisma/enums"
import EditProduct from "@/forms/EditProduct"

export default async function EditProductPage({ params }: { params: Promise<{ id: string }> }) {
	await isAllowedRoles([Role.admin])

	const id = (await params).id
	const colors = await getAllColorsForProductPage()
	const styles = await getAllStylesForProductPage()
	const factories = await getAllFactoriesForProductPage()
	const classes = await getAllClassesForProductPage()
	const oneProduct = await getOneProduct(id)

	return (
		<ServerPageCard
			icon={CircleChevronLeft}
			title={"edit product"}
			description={"edit a product to the database."}
			btnTitle={"back"}
			href="/server/products"
		>
			{!oneProduct ? (
				<EmptyCard href={"/server/products"} linkTitle={"no product found"} />
			) : (
				<EditProduct colors={colors!} factories={factories!} styles={styles!} classes={classes!} product={oneProduct} />
			)}
		</ServerPageCard>
	)
}
