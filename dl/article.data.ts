import prisma from "@/lib/prisma"

/* -------------------- getAllArticlesForArticlesPage -------------------- */
export const getAllArticlesForArticlesPage = async (size: number, page: number) => {
  try {
    const totalArticles = await prisma.article.count()
    const totalPages = Math.ceil(totalArticles / size)
    const data = await prisma.article.findMany({
      select: {
        titleEn: true, descriptionEn: true, id: true, slug: true, createdAt: true, mainImage: true,
        author: { select: { id: true, name: true, image: true } }
      },
      skip: (page * size) - size,
      take: size,
      orderBy: { createdAt: "desc" },
    })
    return { data, totalPages, totalArticles }
  } catch (error) {
    console.error(error)
  }
}

/* ----------------------- getOneArticleForArticleCard ----------------------- */
export const getOneArticleForArticleCard = async (id: string) => {
  try {
    return await prisma.article.findUnique({
      where: { id },
      include: { author: { select: { id: true, name: true } } },
    })
  } catch (error) {
    console.error(error)
  }
}

/* ------------------------------ getOneDesign ----------------------------- */
export const getOneArticle = async (slug: string) => {
  try {
    return await prisma.article.findUnique({
      where: { slug },
      include: {
        author: { select: { name: true, image: true, id: true } }
      },
    })
  } catch (error) {
    console.error(error)
  }
}
