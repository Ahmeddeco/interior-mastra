"use server"

import prisma from "@/lib/prisma"
import { splittedItems } from "@/helpers/splittedItems"
import ProductSchema from "@/schemas/ProductSchema"
import { parseWithZod } from "@conform-to/zod"
import { redirect } from "next/navigation"

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

	try {
		await prisma.product.upsert({
			where: { model: submission.value.model }, create: {
				title: submission.value.title,
				model: submission.value.model,
				miniDescription: submission.value.miniDescription,
				description: submission.value.description,
				status: submission.value.status,
				quantity: submission.value.quantity,
				lowStock: submission.value.lowStock,
				price: submission.value.price,
				discount: submission.value.discount,
				mainImage: submission.value.mainImage,
				bluePrint: submission.value.bluePrint,
				images: splittedImagesData,
				factoryId: submission.value.factoryId,
				styleId: submission.value.styleId,
				classId: submission.value.classId,
				color: { connect: splittedColorsData.map((id: string) => ({ id })) }
			}, update: {
				title: submission.value.title,
				model: submission.value.model,
				miniDescription: submission.value.miniDescription,
				description: submission.value.description,
				status: submission.value.status,
				quantity: submission.value.quantity,
				lowStock: submission.value.lowStock,
				price: submission.value.price,
				discount: submission.value.discount,
				mainImage: submission.value.mainImage,
				bluePrint: submission.value.bluePrint,
				images: splittedImagesData,
				factoryId: submission.value.factoryId,
				styleId: submission.value.styleId,
				classId: submission.value.classId,
				color: { set: splittedColorsData.map((id: string) => ({ id })) }
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

	try {
		await prisma.product.update({
			where: {
				id: submission.value.id!
			}, data: {
				title: submission.value.title,
				model: submission.value.model,
				miniDescription: submission.value.miniDescription,
				description: submission.value.description,
				status: submission.value.status,
				quantity: submission.value.quantity,
				lowStock: submission.value.lowStock,
				price: submission.value.price,
				discount: submission.value.discount,
				mainImage: submission.value.mainImage,
				bluePrint: submission.value.bluePrint,
				images: splittedImagesData,
				factoryId: submission.value.factoryId,
				styleId: submission.value.styleId,
				classId: submission.value.classId,
				color: { set: submission.value.colors.map((id: string) => ({ id })) }
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
	redirect("/server/products")
}