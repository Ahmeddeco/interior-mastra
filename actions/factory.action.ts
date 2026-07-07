"use server"

import prisma from "@/lib/prisma"
import { splittedItems } from "@/helpers/splittedItems"
import FactorySchema from "@/schemas/FactorySchema"
import { parseWithZod } from "@conform-to/zod"
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
	const splittedOwnerData = splittedItems(JSON.parse(submission.value.users[0]).join(","))

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
	redirect("/server/factories")
}

/* ---------------------------- deleteClassAction --------------------------- */
export const deleteFactoryAction = async (formData: FormData) => {
	const slug = formData.get("slug")
	try {
		await prisma.factory.delete({
			where: {
				slug: slug as string
			}
		})
	} catch (error) {
		console.error(error)
	}
	redirect("/server/factories")
}