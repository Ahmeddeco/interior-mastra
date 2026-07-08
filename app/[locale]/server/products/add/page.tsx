import { isAllowedRoles } from "@/auth/isAllowedRoles"
import ServerPageCard from "@/components/shared/ServerPageCard"
import { getAllClassesForProductPage } from "@/dl/class.data"
import { getAllColorsForProductPage } from "@/dl/color.data"
import { getAllFactoriesForProductPage } from "@/dl/factory.data"
import { getAllStylesForProductPage } from "@/dl/styles.data"
import AddProduct from "@/forms/AddProduct"
import { Role } from "@/generated/prisma/enums"
import { getAllClassesForProductPageType } from "@/types/class.type"
import { getAllColorsForProductPageType } from "@/types/color.type"
import { getAllFactoriesForProductPageType } from "@/types/factory.type"
import { getAllStylesForProductPageType } from "@/types/style.type"

export default async function AddColorPage() {
	await isAllowedRoles([Role.admin])

	const colors: getAllColorsForProductPageType = await getAllColorsForProductPage()
	const styles: getAllStylesForProductPageType = await getAllStylesForProductPage()
	const factories: getAllFactoriesForProductPageType = await getAllFactoriesForProductPage()
	const classes: getAllClassesForProductPageType = await getAllClassesForProductPage()

	return (
		<ServerPageCard title={"Add product"} description={"Add a product to the database."} href="/server/products">
			<AddProduct colors={colors!} factories={factories!} styles={styles!} classes={classes!} />
		</ServerPageCard>
	)
}
