import { getAllDesigns, getAllDesignsForDesignServerPage, getOneDesign } from "@/dl/design.data"

export type getAllDesignsType = Awaited<ReturnType<typeof getAllDesigns>>
export type getAllDesignsForDesignServerPageType = Awaited<ReturnType<typeof getAllDesignsForDesignServerPage>>
export type getOneDesignType = Awaited<ReturnType<typeof getOneDesign>>