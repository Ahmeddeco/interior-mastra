import UserButton from "@/auth/UserButton"
import Logo from "./Logo"
import MobileMenu from "./MobileMenu"
import { ThemeButton } from "../theme/ThemeButton"
import FrontNavigation from "./FrontNavigation"
import Cart from "@/store/Cart"
import { getSession } from "@/auth/getSession"
import LanguageButton from "./LanguageButton"

export default async function NavBar() {
	const session = await getSession()
	return (
		<header className="fixed w-full top-0 inset-x-0 mx-auto  border-b border-foreground bg-background/70 drop-shadow-xl backdrop-blur-2xl  px-4 h-14 z-50 flex items-center   ">
			<div className="flex items-center justify-between container mx-auto">
				{/* --------------------------------- Logo -------------------------------- */}
				<Logo />

				{/* ---------------------------- DesktopNav ---------------------------- */}
				<nav className="hidden lg:flex items-center gap-4">
					<FrontNavigation />
				</nav>
				<nav className="lg:hidden flex items-center justify-center gap-4">
					{session && <Cart />}
					<MobileMenu />
				</nav>
				{/* ------------------------------ Socials ----------------------------- */}
				<div className="lg:flex hidden items-center gap-4">
					<ThemeButton />
					{session && <Cart />}
					<LanguageButton />
					<UserButton />
				</div>
			</div>
		</header>
	)
}
