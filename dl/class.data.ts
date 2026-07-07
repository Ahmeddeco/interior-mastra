import prisma from "@/lib/prisma"

/* ------------------------------ getAllClasses ----------------------------- */
export const getAllClasses = async (size: number, page: number) => {
  try {
    const totalClasses = await prisma.class.count()
    const totalPages = Math.ceil(totalClasses / size)
    const data = await prisma.class.findMany({
      skip: (page * size) - size,
      take: size,
      orderBy: {
        title: "asc",
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
    const data = await prisma.class.findUnique({
      where: {
        slug
      }
    })
    return { data }
  } catch (error) {
    console.error(error)
  }
}

/* ----------------------- getAllClassesForProductPage ---------------------- */
export const getAllClassesForProductPage = async () => {
  try {
    const data = await prisma.class.findMany({
      select: { id: true, title: true, image: true, slug: true },
      orderBy: { title: "desc" },
    })
    return data
  } catch (error) {
    console.error(error)
  }
}