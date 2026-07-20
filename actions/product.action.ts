"use server"

import prisma from "@/lib/prisma"
import { splittedItems } from "@/logic/splittedItems"
import ProductSchema from "@/schemas/ProductSchema"
import { parseWithZod } from "@conform-to/zod"
import { redirect } from "next/navigation"
import { refresh } from "next/cache"
import slugify from "slugify"

/* ----------------------------- addProductAction ----------------------------- */
export const addProductAction = async (prevState: unknown, formData: FormData) => {
	const submission = parseWithZod(formData, {
		schema: ProductSchema
	})
	if (submission.status !== "success") {
		return submission.reply()
	}

	const splittedImagesData = splittedItems(submission.value.images!.join(","))
	const splittedColorsData = splittedItems(JSON.parse(submission.value.colors[0]).join(","))
	const generatedSlug = slugify(submission.value.titleEn, { lower: true, strict: true, })


	try {
		await prisma.product.upsert({
			where: { slug: submission.value.slug! },
			create: {
				titleAr: submission.value.titleAr,
				titleEn: submission.value.titleEn,
				model: submission.value.model,
				miniDescriptionAr: submission.value.miniDescriptionAr,
				miniDescriptionEn: submission.value.miniDescriptionEn,
				descriptionAr: submission.value.descriptionAr,
				descriptionEn: submission.value.descriptionEn,
				status: submission.value.status,
				quantity: submission.value.quantity,
				lowStock: submission.value.lowStock,
				price: submission.value.price,
				discount: submission.value.discount,
				mainImage: submission.value.mainImage,
				images: splittedImagesData,
				factoryId: submission.value.factoryId,
				styleId: submission.value.styleId,
				classId: submission.value.classId,
				slug: generatedSlug,
				color: { connect: splittedColorsData.map((id: string) => ({ id })) }
			}, update: {
				titleAr: submission.value.titleAr,
				titleEn: submission.value.titleEn,
				model: submission.value.model,
				miniDescriptionAr: submission.value.miniDescriptionAr,
				miniDescriptionEn: submission.value.miniDescriptionEn,
				descriptionAr: submission.value.descriptionAr,
				descriptionEn: submission.value.descriptionEn,
				status: submission.value.status,
				quantity: submission.value.quantity,
				lowStock: submission.value.lowStock,
				price: submission.value.price,
				discount: submission.value.discount,
				mainImage: submission.value.mainImage,
				images: splittedImagesData,
				factoryId: submission.value.factoryId,
				styleId: submission.value.styleId,
				classId: submission.value.classId,
				slug: generatedSlug,
				color: { connect: splittedColorsData.map((id: string) => ({ id })) }
			}
		})
	} catch (error) {
		console.error(error)
	}
	redirect("/server/products")
}

/* ----------------------------- editProductAction ---------------------------- */
export const editProductAction = async (prevState: unknown, formData: FormData) => {
	const submission = parseWithZod(formData, {
		schema: ProductSchema
	})
	if (submission.status !== "success") {
		return submission.reply()
	}
	const splittedImagesData = splittedItems(submission.value.images!.join(","))
	const splittedColorsData = splittedItems(JSON.parse(submission.value.colors[0]).join(","))
	const generatedSlug = slugify(submission.value.titleEn, { lower: true, strict: true, })


	try {
		await prisma.product.update({
			where: { id: submission.value.id! },
			data: {
				titleAr: submission.value.titleAr,
				titleEn: submission.value.titleEn,
				model: submission.value.model,
				miniDescriptionAr: submission.value.miniDescriptionAr,
				miniDescriptionEn: submission.value.miniDescriptionEn,
				descriptionAr: submission.value.descriptionAr,
				descriptionEn: submission.value.descriptionEn,
				status: submission.value.status,
				quantity: submission.value.quantity,
				lowStock: submission.value.lowStock,
				price: submission.value.price,
				discount: submission.value.discount,
				mainImage: submission.value.mainImage,
				images: splittedImagesData,
				factoryId: submission.value.factoryId,
				styleId: submission.value.styleId,
				classId: submission.value.classId,
				slug: generatedSlug,
				color: { connect: splittedColorsData.map((id: string) => ({ id })) }
			}
		})
	} catch (error) {
		console.error(error)
		return submission.reply({
			formErrors: ["فشل تحديث البيانات، تأكد من أن المعرف صحيح"]
		})
	}
	redirect("/server/products")
}

/* ---------------------------- deleteProductAction --------------------------- */
export const deleteProductAction = async (formData: FormData) => {
	const id = formData.get("id")
	try {
		await prisma.product.delete({
			where: {
				id: id as string
			}
		})
	} catch (error) {
		console.error(error)
	}
	refresh()
}