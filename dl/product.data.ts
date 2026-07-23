"use cache"

import { Prisma } from "@/generated/prisma/client"
import prisma from "@/lib/prisma"
import { ProductFilterType, } from "@/types/product.type"
import { subDays } from "date-fns"
import { cacheLife, cacheTag } from "next/cache"

/* ----------------------------- getAllProducts ---------------------------- */
export const getAllProducts = async (size: number, page: number) => {
	cacheLife("hours")

	try {
		const totalProducts = await prisma.product.count()
		const totalPages = Math.ceil(totalProducts / size)
		const data = await prisma.product.findMany({
			where: { status: "published" },
			skip: (page * size) - size, take: size,
			orderBy: { titleEn: "asc" },
		})
		return { data, totalPages }
	} catch (error) {
		console.error(error)
	}
}


/* ---------------------- getAllProductsForProductsPage --------------------- */
export const getAllProductsForProductsPage = async (size: number, page: number) => {
	cacheLife("hours")

	try {
		const totalProducts = await prisma.product.count({ where: { status: "published" } })
		const totalPages = Math.ceil(totalProducts / size)
		const data = await prisma.product.findMany({
			where: { status: "published" },
			skip: (page * size) - size,
			take: size,
			select: {
				id: true,
				titleAr: true,
				model: true,
				price: true,
				status: true,
				mainImage: true,
				class: { select: { titleEn: true } },
				style: { select: { titleEn: true } },
				factory: { select: { name: true } }
			},
			orderBy: { titleEn: "asc" }
		})
		return { data, totalPages, totalProducts }
	} catch (error) {
		console.error(error)
	}
}

/* ---------------------------- getOneProduct ------------------------------ */
export const getOneProduct = async (id: string) => {
	cacheLife("hours")

	try {
		return await prisma.product.findUnique({
			where: { id, status: "published" },
			include: {
				class: { select: { id: true, titleEn: true, slug: true } },
				color: { select: { id: true, titleEn: true, slug: true } },
				style: { select: { id: true, titleEn: true, slug: true } },
				factory: { select: { id: true, name: true, slug: true } }
			}
		})
	} catch (error) {
		console.error(error)
	}
}

/* -------------------------- getOurLatestProducts -------------------------- */
export const getOurLatestProducts = async () => {
	cacheLife("hours")

	try {
		return await prisma.product.findMany({
			where: { status: "published" },
			orderBy: { createdAt: "desc" },
			take: 6,
			select: { title: true, price: true, discount: true, id: true, mainImage: true, }
		})
	} catch (error) {
		console.error(error)
	}
}

/* ------------------------ getTheMostFavoriteProduct ----------------------- */
export const getTheMostFavoriteProduct = async () => {
	cacheLife("hours")

	try {
		return await prisma.product.findFirst({
			where: { status: "published" },
			orderBy: { favorites: { _count: "desc" } },
			select: { id: true, title: true, mainImage: true, description: true, discount: true, price: true, miniDescription: true },
		})
	} catch (error) {
		console.error("Error fetching most favorite products:", error)
	}
}

/* --------------------------- getFilteredProducts -------------------------- */
export const getFilteredProducts = async (filter?: ProductFilterType) => {
	cacheLife("hours")

	const where: Prisma.ProductWhereInput = { status: "published" }

	if (filter === "sale") {
		where.discount = { gt: 0 } //
	} else if (filter === "new") {
		where.createdAt = { gte: subDays(new Date(), 30) }
	}

	const orderBy: Prisma.ProductOrderByWithRelationInput = filter === "best" ? { favorites: { _count: "desc" } } : { createdAt: "desc" }

	return prisma.product.findMany({
		where, orderBy, take: 6, select: { title: true, price: true, discount: true, id: true, mainImage: true }

	})
}

/* --------------------- getAllProductsWithSpecificClass -------------------- */
export const getAllProductsWithSpecificClass = async (classSlug: string, size: number = 10, page: number = 1) => {
	cacheLife("hours")

	try {
		const totalProducts = (await prisma.product.findMany({ where: { class: { slug: classSlug } } })).length
		const totalPages = Math.ceil(totalProducts / size)
		const data = await prisma.product.findMany({
			where: { status: "published", class: { slug: classSlug } },
			take: size,
			skip: (page * size) - size,
			select: { title: true, price: true, discount: true, id: true, mainImage: true, class: { select: { titleEn: true } } },
			orderBy: { createdAt: "desc" },
		})
		return { totalProducts, totalPages, data }
	} catch (error) {
		console.error(error)
	}
}

/* ------------------------- getAllDiscountProducts ------------------------- */
export const getAllDiscountProducts = async (discount: number, size: number = 10, page: number = 1) => {
	cacheLife("hours")
	cacheTag('products')

	try {
		const totalProducts = (await prisma.product.findMany({ where: { discount: { lte: discount } } })).length
		const totalPages = Math.ceil(totalProducts / size)
		const data = await prisma.product.findMany({
			where: { discount: { lte: discount } },
			take: size,
			skip: (page * size) - size,
			select: { title: true, price: true, discount: true, id: true, mainImage: true, class: { select: { titleEn: true } } },
			orderBy: { discount: "desc" },
		})
		return { totalProducts, totalPages, data }
	} catch (error) {
		console.error(error)
	}
}

/* ----------------------------- relatedProducts ---------------------------- */
export const relatedProducts = async (styleId: string, currentProductId: string) => {
	cacheLife("hours")
	cacheTag('products')

	try {
		return await prisma.product.findMany({
			where: { styleId, id: { not: currentProductId } },
			take: 6,
			orderBy: { createdAt: "desc" },
			include: {
				color: true,
				factory: true,
				style: true,
				class: true,
			},
		})
	} catch (error) {
		console.error(error)
		return [] // إرجاع مصفوفة فارغة في حالة حدوث خطأ لمنع انهيار التطبيق
	}
}