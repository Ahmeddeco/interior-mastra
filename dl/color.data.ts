import prisma from "@/lib/prisma"

/* ------------------------------ getAllColors ----------------------------- */
export const getAllColors = async (size: number, page: number) => {
  try {
    const totalColors = await prisma.color.count()
    const totalPages = Math.ceil(totalColors / size)
    const data = await prisma.color.findMany({
      skip: (page * size) - size,
      take: size,
      orderBy: {
        titleEn: "asc",
      },
    })
    return { data, totalPages }
  } catch (error) {
    console.error(error)
  }
}

/* ------------------------------ getOneColor ----------------------------- */
export const getOneColor = async (slug: string) => {
  try {
    return await prisma.color.findUnique({
      where: {
        slug
      }
    })
  } catch (error) {
    console.error(error)
  }
}

export const getAllColorsForProductPage = async () => {
  try {
    return await prisma.color.findMany({
      select: { id: true, titleEn: true, titleAr: true },
      orderBy: { titleEn: "asc" },
    })
  } catch (error) {
    console.error(error)
  }
}