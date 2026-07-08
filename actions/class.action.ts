"use server"

import prisma from "@/lib/prisma"
import ClassSchema from "@/schemas/ClassSchema"
import { parseWithZod } from "@conform-to/zod"
import { refresh } from "next/cache"
import { redirect } from "next/navigation"
import slugify from "slugify"

/* ----------------------------- addColorAction ----------------------------- */
export const addClassAction = async (prevState: unknown, formData: FormData) => {
	const submission = parseWithZod(formData, {
		schema: ClassSchema
	})
	if (submission.status !== "success") {
		return submission.reply()
	}
	// generatedSlug
	const generatedSlug = slugify(submission.value.titleEn, { lower: true, strict: true })

	try {
		await prisma.class.upsert({
			where: { slug: submission.value.slug },
			create: {
				titleAr: submission.value.titleAr,
				titleEn: submission.value.titleEn,
				slug: generatedSlug,
				descriptionAr: submission.value.descriptionAr,
				descriptionEn: submission.value.descriptionEn,
				image: submission.value.image
			}, update: {
				titleAr: submission.value.titleAr,
				titleEn: submission.value.titleEn,
				slug: generatedSlug,
				descriptionAr: submission.value.descriptionAr,
				descriptionEn: submission.value.descriptionEn,
				image: submission.value.image
			}
		})
	} catch (error) {
		console.error(error)
	}
	redirect("/server/classes")
}

/* ----------------------------- editClassAction ---------------------------- */
export const editClassAction = async (prevState: unknown, formData: FormData) => {
	const submission = parseWithZod(formData, {
		schema: ClassSchema
	})
	if (submission.status !== "success") {
		return submission.reply()
	}

	const generatedSlug = slugify(submission.value.titleEn, { lower: true, strict: true, })

	try {
		await prisma.class.update({
			where: {
				id: submission.value.id!
			}, data: {
				titleAr: submission.value.titleAr,
				titleEn: submission.value.titleEn,
				slug: generatedSlug,
				descriptionAr: submission.value.descriptionAr,
				descriptionEn: submission.value.descriptionEn,
				image: submission.value.image
			}
		})
	} catch (error) {
		console.error(error)
	}
	redirect("/server/classes")
}

/* ---------------------------- deleteClassAction --------------------------- */
export const deleteClassAction = async (formData: FormData) => {
	const id = formData.get("id")
	try {
		await prisma.class.delete({
			where: {
				id: id as string
			}
		})
	} catch (error) {
		console.error(error)
	}
	refresh()
}