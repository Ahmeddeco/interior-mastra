import { getAllArticlesForArticlesPage, getOneArticle, getOneArticleForArticleCard } from "@/dl/article.data"

export type getAllArticlesForArticlesPageType = Awaited<ReturnType<typeof getAllArticlesForArticlesPage>>
export type getOneArticleForArticleCardType = Awaited<ReturnType<typeof getOneArticleForArticleCard>>
export type getOneArticleType = Awaited<ReturnType<typeof getOneArticle>>