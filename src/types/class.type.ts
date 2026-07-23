import { getAllClassesForClassesServerPage, getAllClassesForProductPage, getOneClass } from "@/dl/class.data"

export type getOneClassType = Awaited<ReturnType<typeof getOneClass>>
export type getAllClassesForProductPageType = Awaited<ReturnType<typeof getAllClassesForProductPage>>
export type getAllClassesForClassesServerPageType = Awaited<ReturnType<typeof getAllClassesForClassesServerPage>>