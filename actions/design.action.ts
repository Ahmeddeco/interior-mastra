"use server"

import prisma from "@/lib/prisma"
import { splittedItems } from "@/logic/splittedItems"
import { parseWithZod } from "@conform-to/zod"
import { redirect } from "next/navigation"
import { refresh } from "next/cache"
import DesignSchema from "@/schemas/DesignSchema"

/* ----------------------------- addDesignAction ----------------------------- */
export const addDesignAction = async (prevState: unknown, formData: FormData) => {
	const submission = parseWithZod(formData, {
		schema: DesignSchema
	})
	if (submission.status !== "success") {
		return submission.reply()
	}

	const splittedImagesData = splittedItems(submission.value.images!.join(","))

	try {
		await prisma.design.upsert({
			where: { slug: submission.value.slug! },
			create: {
				titleAr: submission.value.titleAr,
				titleEn: submission.value.titleEn,
				slug: submission.value.slug,
				userId: submission.value.userId,
				styleId: submission.value.styleId,
				descriptionAr: submission.value.descriptionAr,
				descriptionEn: submission.value.descriptionEn,
				painPointsAr: submission.value.painPointsAr,
				painPointsEn: submission.value.painPointsEn,
				solutionsAr: submission.value.solutionsAr,
				solutionsEn: submission.value.solutionsEn,
				country: submission.value.country,
				state: submission.value.state,
				city: submission.value.city,
				createdAt: submission.value.createdAt,
				mainImage: submission.value.mainImage,
				images: splittedImagesData,
			},
			update: {
				titleAr: submission.value.titleAr,
				titleEn: submission.value.titleEn,
				slug: submission.value.slug,
				userId: submission.value.userId,
				styleId: submission.value.styleId,
				descriptionAr: submission.value.descriptionAr,
				descriptionEn: submission.value.descriptionEn,
				painPointsAr: submission.value.painPointsAr,
				painPointsEn: submission.value.painPointsEn,
				solutionsAr: submission.value.solutionsAr,
				solutionsEn: submission.value.solutionsEn,
				country: submission.value.country,
				state: submission.value.state,
				city: submission.value.city,
				createdAt: submission.value.createdAt,
				mainImage: submission.value.mainImage,
				images: splittedImagesData,
			}
		})
	} catch (error) {
		console.error(error)
		return submission.reply({
			formErrors: ["فشل اضافة البيانات، تأكد من أن المعرف صحيح"]
		})
	}
	redirect("/server/designs")
}

/* ----------------------------- editDesignAction ---------------------------- */
export const editDesignAction = async (prevState: unknown, formData: FormData) => {
	const submission = parseWithZod(formData, {
		schema: DesignSchema
	})
	if (submission.status !== "success") {
		return submission.reply()
	}
	const splittedImagesData = splittedItems(submission.value.images!.join(","))


	try {
		await prisma.design.update({
			where: { id: submission.value.id! },
			data: {
				titleAr: submission.value.titleAr,
				titleEn: submission.value.titleEn,
				slug: submission.value.slug,
				userId: submission.value.userId,
				styleId: submission.value.styleId,
				descriptionAr: submission.value.descriptionAr,
				descriptionEn: submission.value.descriptionEn,
				painPointsAr: submission.value.painPointsAr,
				painPointsEn: submission.value.painPointsEn,
				solutionsAr: submission.value.solutionsAr,
				solutionsEn: submission.value.solutionsEn,
				country: submission.value.country,
				state: submission.value.state,
				city: submission.value.city,
				createdAt: submission.value.createdAt,
				mainImage: submission.value.mainImage,
				images: splittedImagesData,
			}
		})
	} catch (error) {
		console.error(error)
		return submission.reply({
			formErrors: ["فشل تحديث البيانات، تأكد من أن المعرف صحيح"]
		})
	}
	redirect("/server/designs")
}

/* ---------------------------- deleteProductAction --------------------------- */
export const deleteDesignAction = async (formData: FormData) => {
	const id = formData.get("id")
	try {
		await prisma.design.delete({
			where: {
				id: id as string
			}
		})
	} catch (error) {
		console.error(error)
	}
	refresh()
}