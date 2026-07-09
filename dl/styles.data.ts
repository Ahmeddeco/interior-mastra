import prisma from "@/lib/prisma"

/* ------------------------------ getAllStyles ------------------------------ */
export const getAllStylesForStylesServerPage = async (size: number, page: number) => {
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
	try {
		return await prisma.style.findMany({
			select: { id: true, titleEn: true, titleAr: true, image: true, slug: true },
			orderBy: { titleEn: "asc" },
		})
	} catch (error) {
		console.error(error)
	}
}