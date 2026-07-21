import prisma from "@/lib/prisma"

/* ------------------------------ getAllDesigns ----------------------------- */
export const getAllDesigns = async (size: number, page: number) => {
  try {
    const totalDesigns = await prisma.design.count()
    const totalPages = Math.ceil(totalDesigns / size)
    const data = await prisma.design.findMany({
      skip: (page * size) - size,
      take: size,
      orderBy: { createdAt: "desc" },
    })
    return { data, totalPages, totalDesigns }
  } catch (error) {
    console.error(error)
  }
}

/* -------------------- getAllDesignsForDesignServerPage -------------------- */
export const getAllDesignsForDesignServerPage = async (size: number, page: number) => {
  try {
    const totalDesigns = await prisma.design.count()
    const totalPages = Math.ceil(totalDesigns / size)
    const data = await prisma.design.findMany({
      select: {
        titleEn: true, titleAr: true, descriptionEn: true, descriptionAr: true, id: true, slug: true, createdAt: true, mainImage: true, country: true, state: true, city: true,
        style: { select: { id: true, titleEn: true, titleAr: true } },
        client: { select: { id: true, name: true } }
      },
      skip: (page * size) - size,
      take: size,
      orderBy: { createdAt: "desc" },
    })
    return { data, totalPages, totalDesigns }
  } catch (error) {
    console.error(error)
  }
}

/* ----------------------- getOneDesignsForDesignCard ----------------------- */
export const getOneDesignsForDesignCard = async (id: string) => {
  try {
    return await prisma.design.findUnique({
      where: { id },
      select: {
        titleEn: true, titleAr: true, descriptionEn: true, descriptionAr: true, id: true, slug: true, createdAt: true, mainImage: true, country: true, state: true, city: true,
        style: { select: { id: true, titleEn: true, titleAr: true } },
        client: { select: { id: true, name: true } }
      },
    })
  } catch (error) {
    console.error(error)
  }
}

/* ------------------------------ getOneDesign ----------------------------- */
export const getOneDesign = async (slug: string) => {
  try {
    return await prisma.design.findUnique({
      where: { slug },
      include: {
        style: { select: { titleAr: true, titleEn: true } },
        client: { select: { name: true, image: true } }
      },
    })
  } catch (error) {
    console.error(error)
  }
}
