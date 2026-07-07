import { getOneProduct, getOurLatestProducts, } from "@/dl/product.data"

export type getOneProductType = Awaited<ReturnType<typeof getOneProduct>>
export type getOurLatestProductsType = Awaited<ReturnType<typeof getOurLatestProducts>>

export type ProductCartType = {
  id: string
  title: string
  price: number
  discount: number | null
  mainImage: string
}

export type ProductFilterType = "all" | "sale" | "new" | "best"
export enum ProductFilterEnum { "all", "sale", "new", "best" }