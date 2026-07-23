"use cache"

import prisma from "@/lib/prisma"
import { cacheLife, cacheTag } from "next/cache"

/* ----------------------------- getAllUsers ---------------------------- */
export const getAllUsers = async (size: number, page: number) => {
  cacheLife("hours")
  cacheTag('users')

  try {
    const totalColors = await prisma.user.count()
    const totalPages = Math.ceil(totalColors / size)
    const data = await prisma.user.findMany({
      skip: (page * size) - size,
      take: size,
      orderBy: {
        name: "asc",
      },
    })
    return { data, totalPages }
  } catch (error) {
    console.error(error)
  }
}

/* ---------------------------- getOneUser ------------------------------ */
export const getOneUser = async (id: string) => {
  cacheLife("hours")
  cacheTag('users')

  try {
    const data = await prisma.user.findUnique({
      where: {
        id
      }
    })
    return { data }
  } catch (error) {
    console.error(error)
  }
}

/* ----------------------- getAllUsersForFactoriesPage ---------------------- */
export const getAllUsersForFactoriesPage = async () => {
  cacheLife("hours")
  cacheTag('users')

  try {
    const data = await prisma.user.findMany({
      select: { id: true, name: true },
      orderBy: { name: "asc" }
    })
    return data
  } catch (error) {
    console.error(error)
  }
}

/* ------------------------------- allClients ------------------------------- */
export const getAllClients = async () => {
  cacheLife("hours")
  cacheTag('users')

  try {
    return await prisma.user.findMany({
      where: { role: "client" },
      select: { id: true, name: true },
      orderBy: { name: "asc" }
    })
  } catch (error) {
    console.error(error)
  }
}

/* ------------------------------ getAllAuthors ----------------------------- */
export const getAllAuthors = async () => {
  cacheLife("hours")
  cacheTag('users')

  try {
    return await prisma.user.findMany({
      where: { role: { in: ["admin", "designer"] } },
      select: { id: true, name: true },
      orderBy: { name: "asc" }
    })
  } catch (error) {
    console.error(error)
  }
}