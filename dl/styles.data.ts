"use cache"

import prisma from "@/lib/prisma"
import { cacheLife, cacheTag } from "next/cache"

/* ------------------------------ getAllStyles ------------------------------ */
export const getAllStylesForStylesServerPage = async (size: number, page: number) => {
	cacheLife("max")
	cacheTag('styles')

	try {
		const totalColors = await prisma.style.count()
		const totalPages = Math.ceil(totalColors / size)
		const data = await prisma.style.findMany({
			select: { titleAr: true, titleEn: true, id: true, descriptionEn: true, slug: true, image: true },
			skip: (page * size) - size, take: size,
			orderBy: { titleEn: "asc" }
		})
		return { data, totalPages }
	} catch (error) {
		console.error(error)
	}
}

/* ------------------------------- getOneStyle ------------------------------ */
export const getOneStyle = async (slug: string) => {
	cacheLife("max")
	cacheTag('styles')

	try {
		return await prisma.style.findUnique({
			where: { slug }
		})
	} catch (error) {
		console.error(error)
	}
}

/* ----------------------- getAllStylesForProductPage ----------------------- */
export const getAllStylesForProductPage = async () => {
	cacheLife("max")
	cacheTag('styles')

	try {
		return await prisma.style.findMany({
			select: { id: true, titleAr: true, titleEn: true },
			orderBy: { titleEn: "asc" },
		})
	} catch (error) {
		console.error(error)
	}
}

export const getAllStylesForFilterProductPage = async () => {
	cacheLife("max")
	cacheTag('styles')

	try {
		return await prisma.style.findMany({
			select: { id: true, titleEn: true, titleAr: true, image: true, slug: true },
			orderBy: { titleEn: "asc" },
		})
	} catch (error) {
		console.error(error)
	}
}