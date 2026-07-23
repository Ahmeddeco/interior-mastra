import { getAllColors, getAllColorsForProductPage, getOneColor } from "@/dl/color.data"

export type getAllColorsType = Awaited<ReturnType<typeof getAllColors>>
export type getOneColorType = Awaited<ReturnType<typeof getOneColor>>
export type getAllColorsForProductPageType = Awaited<ReturnType<typeof getAllColorsForProductPage>>