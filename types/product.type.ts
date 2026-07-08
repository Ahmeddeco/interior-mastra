import { getAllProducts, getAllProductsForProductsPage, getFilteredProducts, getOneProduct, getOurLatestProducts, getTheMostFavoriteProduct, } from "@/dl/product.data"

export type getOneProductType = Awaited<ReturnType<typeof getOneProduct>>
export type getOurLatestProductsType = Awaited<ReturnType<typeof getOurLatestProducts>>
export type getAllProductsType = Awaited<ReturnType<typeof getAllProducts>>
export type getAllProductsForProductsPageType = Awaited<ReturnType<typeof getAllProductsForProductsPage>>
export type getTheMostFavoriteProductType = Awaited<ReturnType<typeof getTheMostFavoriteProduct>>
export type getFilteredProductsType = Awaited<ReturnType<typeof getFilteredProducts>>

export type ProductCartType = {
  id: string
  title: string
  price: number
  discount: number | null
  mainImage: string
}
export type ProductFilterType = "all" | "sale" | "new" | "best"
export enum ProductFilterEnum { "all", "sale", "new", "best" }