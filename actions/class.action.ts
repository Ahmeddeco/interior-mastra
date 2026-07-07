"use server"

import prisma from "@/lib/prisma"
import ClassSchema from "@/schemas/ClassSchema"
import { parseWithZod } from "@conform-to/zod"
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
	const generatedSlug = slugify(submission.value.title, { lower: true, strict: true, locale: "ar" })

	try {
		await prisma.class.upsert({
			where: { title: submission.value.title }, create: {
				title: submission.value.title,
				slug: generatedSlug,
				description: submission.value.description,
				image: submission.value.image
			}, update: {
				title: submission.value.title,
				slug: generatedSlug,
				description: submission.value.description,
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

	const generatedSlug = slugify(submission.value.title, { lower: true, strict: true, locale: "ar" })

	try {
		await prisma.class.update({
			where: {
				id: submission.value.id!
			}, data: {
				title: submission.value.title,
				slug: generatedSlug,
				description: submission.value.description,
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
	const slug = formData.get("slug")
	try {
		await prisma.class.delete({
			where: {
				slug: slug as string
			}
		})
	} catch (error) {
		console.error(error)
	}
	redirect("/server/classes")
}