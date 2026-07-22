"use server"

import prisma from "@/lib/prisma"
import { splittedItems } from "@/logic/splittedItems"
import { parseWithZod } from "@conform-to/zod"
import { redirect } from "next/navigation"
import { refresh } from "next/cache"
import ArticleSchema from "@/schemas/ArticleSchema"

/* ----------------------------- addArticleAction ----------------------------- */
export const addArticleAction = async (prevState: unknown, formData: FormData) => {
	const submission = parseWithZod(formData, {
		schema: ArticleSchema
	})
	if (submission.status !== "success") {
		return submission.reply()
	}
	const splittedImagesData = splittedItems(submission.value.images!.join(","))

	try {
		await prisma.article.upsert({
			where: { slug: submission.value.slug! },
			create: {
				titleAr: submission.value.titleAr,
				titleEn: submission.value.titleEn,
				slug: submission.value.slug,
				descriptionAr: submission.value.descriptionAr,
				descriptionEn: submission.value.descriptionEn,
				userId: submission.value.userId,
				topicAr: submission.value.topicAr,
				topicEn: submission.value.topicEn,
				createdAt: submission.value.createdAt,
				mainImage: submission.value.mainImage,
				images: splittedImagesData,
			},
			update: {
				titleAr: submission.value.titleAr,
				titleEn: submission.value.titleEn,
				slug: submission.value.slug,
				descriptionAr: submission.value.descriptionAr,
				descriptionEn: submission.value.descriptionEn,
				userId: submission.value.userId,
				topicAr: submission.value.topicAr,
				topicEn: submission.value.topicEn,
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
	redirect("/server/articles")
}

/* ----------------------------- editArticleAction ---------------------------- */
export const editArticleAction = async (prevState: unknown, formData: FormData) => {
	const submission = parseWithZod(formData, {
		schema: ArticleSchema
	})
	if (submission.status !== "success") {
		return submission.reply()
	}
	const splittedImagesData = splittedItems(submission.value.images!.join(","))

	try {
		await prisma.article.update({
			where: { id: submission.value.id! },
			data: {
				titleAr: submission.value.titleAr,
				titleEn: submission.value.titleEn,
				slug: submission.value.slug,
				descriptionAr: submission.value.descriptionAr,
				descriptionEn: submission.value.descriptionEn,
				userId: submission.value.userId,
				topicAr: submission.value.topicAr,
				topicEn: submission.value.topicEn,
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
	redirect("/server/articles")
}

/* ---------------------------- deleteArticlesAction --------------------------- */
export const deleteArticleAction = async (formData: FormData) => {
	const id = formData.get("id")
	try {
		await prisma.article.delete({
			where: {
				id: id as string
			}
		})
	} catch (error) {
		console.error(error)
	}
	refresh()
}