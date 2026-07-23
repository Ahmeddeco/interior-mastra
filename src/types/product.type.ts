import { getFilteredProductsForFilteredPage } from "@/dl/filterdProduct.data"
import { getAllProducts, getAllProductsForProductsPage, getFilteredProducts, getOneProduct, getOurLatestProducts, getTheMostFavoriteProduct, relatedProducts, } from "@/dl/product.data"

export type getOneProductType = Awaited<ReturnType<typeof getOneProduct>>
export type getOurLatestProductsType = Awaited<ReturnType<typeof getOurLatestProducts>>
export type getAllProductsType = Awaited<ReturnType<typeof getAllProducts>>
export type getAllProductsForProductsPageType = Awaited<ReturnType<typeof getAllProductsForProductsPage>>
export type getTheMostFavoriteProductType = Awaited<ReturnType<typeof getTheMostFavoriteProduct>>
export type getFilteredProductsType = Awaited<ReturnType<typeof getFilteredProducts>>
export type getFilteredProductsForFilteredPageType = Awaited<ReturnType<typeof getFilteredProductsForFilteredPage>>
export type relatedProductsType = Awaited<ReturnType<typeof relatedProducts>>

export type ProductCartType = {
  id: string
  title: string
  price: number
  discount: number | null
  mainImage: string
}
export type ProductFilterType = "all" | "sale" | "new" | "best"
export enum ProductFilterEnum { "all", "sale", "new", "best" }
export type ProductSearchParamsType = {
  min_price?: string
  max_price?: string
  sort_by?: string
  factory?: string | string[]
  class?: string | string[]
  style?: string | string[]
  color?: string | string[]
}

export type filteredProductType = {
  id: string
  titleAr: string
  titleEn: string
  miniDescriptionAr: string
  miniDescriptionEn: string
  slug: string
  model: string
  price: number
  discount: number | null
  mainImage: string
  createdAt: Date
  color: {
    titleAr: string
    titleEn: string
    slug: string
  }[]
  factory: {
    slug: string
    name: string
  }
  style: {
    titleAr: string
    titleEn: string
    slug: string
  }
  class: {
    titleAr: string
    titleEn: string
    slug: string
  }
}