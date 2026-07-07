import { isAllowedRoles } from "@/auth/isAllowedRoles"
import ServerPageCard from "@/components/shared/ServerPageCard"
import { getAllClassesForProductPage } from "@/dl/class.data"
import { getAllColorsForProductPage } from "@/dl/color.data"
import { getAllFactoriesForProductPage } from "@/dl/factory.data"
import { getAllStylesForProductPage } from "@/dl/styles.data"
import AddProduct from "@/forms/AddProduct"
import { Role } from "@/generated/prisma/enums"

export default async function AddColorPage() {
	await isAllowedRoles([Role.admin])

	const colors = await getAllColorsForProductPage()
	const styles = await getAllStylesForProductPage()
	const factories = await getAllFactoriesForProductPage()
	const classes = await getAllClassesForProductPage()

	return (
		<ServerPageCard title={"Add product"} description={"Add a product to the database."} href="/server/products">
			<AddProduct colors={colors!} factories={factories!} styles={styles!} classes={classes!} />
		</ServerPageCard>
	)
}
