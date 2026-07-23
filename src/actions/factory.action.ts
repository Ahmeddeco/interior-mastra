"use server"

import prisma from "@/lib/prisma"
import { splittedItems } from "@/logic/splittedItems"
import FactorySchema from "@/schemas/FactorySchema"
import { parseWithZod } from "@conform-to/zod"
import { refresh, updateTag } from "next/cache"
import { redirect } from "next/navigation"
import slugify from "slugify"

/* ----------------------------- addFactoriesAction ----------------------------- */
export const addFactoryAction = async (prevState: unknown, formData: FormData) => {
	const submission = parseWithZod(formData, {
		schema: FactorySchema
	})
	if (submission.status !== "success") {
		return submission.reply()
	}
	// generatedSlug
	const generatedSlug = slugify(submission.value.name, { lower: true, strict: true, locale: "ar" })
	const splittedOwnerData = splittedItems(JSON.parse(submission.value.users?.[0] || "[]").join(","))

	try {
		await prisma.factory.upsert({
			where: { slug: generatedSlug }, create: {
				name: submission.value.name,
				slug: generatedSlug,
				info: submission.value.info,
				mobile: submission.value.mobile,
				hotLine: submission.value.hotLine,
				country: submission.value.country,
				state: submission.value.state,
				city: submission.value.city,
				logo: submission.value.logo,
				owner: { connect: splittedOwnerData.map((id: string) => ({ id })) }

			}, update: {
				name: submission.value.name,
				slug: generatedSlug,
				info: submission.value.info,
				mobile: submission.value.mobile,
				hotLine: submission.value.hotLine,
				country: submission.value.country,
				state: submission.value.state,
				city: submission.value.city,
				logo: submission.value.logo,
				owner: { set: splittedOwnerData.map((id: string) => ({ id })) }

			}
		})
	} catch (error) {
		console.error(error)
	}
	updateTag("factories")

	redirect("/server/factories")
}

/* ----------------------------- editFactoryAction ---------------------------- */
export const editFactoryAction = async (prevState: unknown, formData: FormData) => {
	const submission = parseWithZod(formData, {
		schema: FactorySchema
	})
	if (submission.status !== "success") {
		return submission.reply()
	}

	const generatedSlug = slugify(submission.value.name, { lower: true, strict: true, locale: "ar" })
	const splittedOwnerData = splittedItems(JSON.parse(submission.value.users[0]).join(","))

	try {
		await prisma.factory.update({
			where: {
				slug: submission.value.slug!
			}, data: {
				name: submission.value.name,
				slug: generatedSlug,
				info: submission.value.info,
				mobile: submission.value.mobile,
				hotLine: submission.value.hotLine,
				country: submission.value.country,
				state: submission.value.state,
				city: submission.value.city,
				logo: submission.value.logo,
				owner: { set: splittedOwnerData.map((id: string) => ({ id })) }
			}
		})
	} catch (error) {
		console.error(error)
		return submission.reply({
			formErrors: ["فشل تحديث البيانات، تأكد من أن المعرف صحيح"]
		})
	}
	updateTag("factories")

	redirect("/server/factories")
}

/* ---------------------------- deleteClassAction --------------------------- */
export const deleteFactoryAction = async (formData: FormData) => {
	const id = formData.get("id") as string
	try {
		await prisma.factory.delete({
			where: {
				id: id
			}
		})
	} catch (error) {
		console.error(error)
	}
	updateTag("factories")

	refresh()
}