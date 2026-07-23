"use cache"

import prisma from "@/lib/prisma"
import { cacheLife, cacheTag } from "next/cache"

/* ------------------------------ getAllColors ----------------------------- */
export const getAllColors = async (size: number, page: number) => {
  cacheLife("max")
  cacheTag('colors')

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
  cacheLife("max")
  cacheTag('colors')

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
  cacheLife("max")
  cacheTag('colors')

  try {
    return await prisma.color.findMany({
      select: { id: true, titleEn: true, titleAr: true, colorCode: true, slug: true },
      orderBy: { titleEn: "asc" },
    })
  } catch (error) {
    console.error(error)
  }
}