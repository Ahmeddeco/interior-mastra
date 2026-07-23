"use cache"

import prisma from "@/lib/prisma"
import { cacheLife, cacheTag } from "next/cache"

/* ----------------------------- getAllFactories ---------------------------- */
export const getAllFactories = async (size: number, page: number) => {
  cacheLife("days")
  cacheTag('factories')

  try {
    const totalColors = await prisma.factory.count()
    const totalPages = Math.ceil(totalColors / size)
    const data = await prisma.factory.findMany({
      skip: (page * size) - size,
      take: size,
      include: { owner: { select: { id: true, name: true } } },
      orderBy: { name: "asc" },
    })
    return { data, totalPages }
  } catch (error) {
    console.error(error)
  }
}

/* ---------------------------- getOneFactory ------------------------------ */
export const getOneFactory = async (slug: string) => {
  cacheLife("days")
  cacheTag('factories')

  try {
    const data = await prisma.factory.findUnique({
      where: { slug },
      include: { owner: { select: { id: true, name: true } } }
    })
    return { data }
  } catch (error) {
    console.error(error)
  }
}

/* ---------------------- getAllFactoriesForProductPage --------------------- */
export const getAllFactoriesForProductPage = async () => {
  cacheLife("days")
  cacheTag('factories')

  try {
    const data = await prisma.factory.findMany({
      select: { id: true, name: true },
      orderBy: { name: "asc" },
    })
    return data
  } catch (error) {
    console.error(error)
  }
}

/* ------------------------- getAllFactoriesForSort ------------------------- */
export const getAllFactoriesForSort = async () => {
  cacheLife("days")
  cacheTag('factories')

  try {
    return await prisma.factory.findMany({
      select: { id: true, slug: true, logo: true, name: true },
      orderBy: { name: "asc" }
    })
  } catch (error) {
    console.error(error)
  }
}