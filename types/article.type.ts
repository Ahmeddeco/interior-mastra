import { getAllArticlesForArticlesPage, getOneArticle, getOneArticleForOneArticlePage } from "@/dl/article.data"

export type getAllArticlesForArticlesPageType = Awaited<ReturnType<typeof getAllArticlesForArticlesPage>>
export type getOneArticleForOneArticlePageType = Awaited<ReturnType<typeof getOneArticleForOneArticlePage>>
export type getOneArticleType = Awaited<ReturnType<typeof getOneArticle>>
export type OneArticleCard = NonNullable<getAllArticlesForArticlesPageType>["data"][number]