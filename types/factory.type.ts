import { getAllFactories, getAllFactoriesForProductPage, getAllFactoriesForSort, getOneFactory } from '@/dl/factory.data'

export type getAllFactoriesType = Awaited<ReturnType<typeof getAllFactories>>
export type getOneFactoryType = Awaited<ReturnType<typeof getOneFactory>>
export type getAllFactoriesForProductPageType = Awaited<ReturnType<typeof getAllFactoriesForProductPage>>
export type getAllFactoriesForSortType = Awaited<ReturnType<typeof getAllFactoriesForSort>>