'use server'

import prisma from "@/lib/prisma"
import ColorSchema from "@/schemas/ColorSchema"
import { parseWithZod } from "@conform-to/zod"
import { redirect } from "next/navigation"
import slugify from "slugify"

/* ----------------------------- addColorAction ----------------------------- */
export const addColorAction = async (prevState: unknown, formData: FormData) => {
  const submission = parseWithZod(formData, {
    schema: ColorSchema,
  })
  if (submission.status !== 'success') {
    return submission.reply()
  }

  // generatedSlug
  const generatedSlug = slugify(submission.value.title, { lower: true, strict: true, locale: "ar" })

  try {
    await prisma.color.upsert({
      where: { title: submission.value.title },
      create: {
        title: submission.value.title,
        slug: generatedSlug,
        colorCode: submission.value.colorCode
      },
      update: {
        title: submission.value.title,
        slug: generatedSlug,
        colorCode: submission.value.colorCode
      }
    })
  } catch (error) {
    console.error(error)
  }
  redirect("/server/colors")
}

/* ----------------------------- editColorAction ---------------------------- */
export const editColorAction = async (prevState: unknown, formData: FormData) => {
  const submission = parseWithZod(formData, {
    schema: ColorSchema,
  })
  if (submission.status !== 'success') {
    return submission.reply()
  }

  // generatedSlug
  const generatedSlug = slugify(submission.value.title, { lower: true, strict: true, locale: "ar" })

  try {
    await prisma.color.update({
      where: {
        slug: submission.value.slug!
      },
      data: {
        title: submission.value.title,
        slug: generatedSlug,
        colorCode: submission.value.colorCode
      }
    })
  } catch (error) {
    console.error(error)
  }
  redirect("/server/colors")
}

/* ---------------------------- deleteColorAction --------------------------- */
export const deleteColorAction = async (formData: FormData) => {
  const slug = formData.get("slug")
  try {
    await prisma.color.delete({
      where: {
        slug: slug as string
      }
    })
  } catch (error) {
    console.error(error)
  }
  redirect("/server/colors")
}