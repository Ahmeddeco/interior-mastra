import prisma from "@/lib/prisma"

/* ------------------------------ getAllClasses ----------------------------- */
export const getAllClassesForClassesServerPage = async (size: number, page: number) => {
  try {
    const totalClasses = await prisma.class.count()
    const totalPages = Math.ceil(totalClasses / size)
    const data = await prisma.class.findMany({
      select: { titleAr: true, titleEn: true, id: true, image: true, slug: true,descriptionEn:true },
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

/* ------------------------------ getOneClass ------------------------------- */
export const getOneClass = async (slug: string) => {
  try {
    return await prisma.class.findUnique({
      where: {
        slug
      }
    })
  } catch (error) {
    console.error(error)
  }
}

/* ----------------------- getAllClassesForProductPage ---------------------- */
export const getAllClassesForProductPage = async () => {
  try {
    return await prisma.class.findMany({
      select: { id: true, titleEn: true, titleAr: true, image: true, slug: true },
      orderBy: { titleEn: "asc" },
    })
  } catch (error) {
    console.error(error)
  }
}