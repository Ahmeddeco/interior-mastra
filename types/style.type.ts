import { getAllStylesForStylesServerPage, getAllStylesForProductPage, getOneStyle } from "@/dl/styles.data"

export type getAllStylesForProductPageType = Awaited<ReturnType<typeof getAllStylesForProductPage>>
export type getOneStyleType = Awaited<ReturnType<typeof getOneStyle>>
export type getAllStylesForStylesServerPageType = Awaited<ReturnType<typeof getAllStylesForStylesServerPage>>