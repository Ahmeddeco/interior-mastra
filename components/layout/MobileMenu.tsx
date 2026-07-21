import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger, SheetFooter } from "@/components/ui/sheet"
import { Menu } from "lucide-react"
import Logo from "./Logo"
import { ThemeButton } from "../theme/ThemeButton"
import UserButton from "@/auth/UserButton"
import FrontNavigation from "./FrontNavigation"
import LanguageButton from "./LanguageButton"
import { Button } from "../ui/button"

export default function MobileMenu() {
	return (
		<>
			<Sheet>
				<SheetTrigger asChild>
					<Button size={"icon"}>
						<Menu />
					</Button>
				</SheetTrigger>
				<SheetContent>
					<SheetHeader className="border-b shadow-md">
						<SheetTitle className="flex items-center justify-center ">
							<Logo />
						</SheetTitle>
					</SheetHeader>
					<nav className="flex flex-col items-center gap-8 p-4 h-fit ">
						<FrontNavigation />
					</nav>
					<SheetFooter className="flex-row items-center justify-between border-t shadow-md">
						<UserButton />
						<LanguageButton />
						<ThemeButton />
					</SheetFooter>
				</SheetContent>
			</Sheet>
		</>
	)
}
