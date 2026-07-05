import { ChartNoAxesCombined, Factory, Palette, Server, Shapes, Sofa, SwatchBook, Users } from "lucide-react"

export const serverNav = [
  {
    title: "سيرفر",
    href: "/server",
    icon: Server
  },
  {
    title: "الأشخاص",
    href: "/server/users",
    icon: Users
  },
  {
    title: "المصانع",
    href: "/server/factories",
    icon: Factory
  },
  {
    title: "الألوان",
    href: "/server/colors",
    icon: SwatchBook
  },
  {
    title: "الفئات",
    href: "/server/classes",
    icon: Shapes
  },
  {
    title: "الإستايلات",
    href: "/server/styles",
    icon: Palette
  },
  {
    title: "المنتجات",
    href: "/server/products",
    icon: Sofa
  },
  {
    title: "الإحصائيات",
    href: "/server/charts",
    icon: ChartNoAxesCombined
  },

]