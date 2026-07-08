'use server'

import prisma from "@/lib/prisma"
import ColorSchema from "@/schemas/ColorSchema"
import { parseWithZod } from "@conform-to/zod"
import { refresh } from "next/cache"
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
  const generatedSlug = slugify(submission.value.titleEn, { lower: true, strict: true, })

  try {
    await prisma.color.upsert({
      where: { slug: submission.value.slug },
      create: {
        titleAr: submission.value.titleAr,
        titleEn: submission.value.titleEn,
        slug: generatedSlug,
        colorCode: submission.value.colorCode
      },
      update: {
        titleAr: submission.value.titleAr,
        titleEn: submission.value.titleEn,
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
  const generatedSlug = slugify(submission.value.titleEn, { lower: true, strict: true, })

  try {
    await prisma.color.update({
      where: {
        slug: submission.value.slug!
      },
      data: {
        titleAr: submission.value.titleAr,
        titleEn: submission.value.titleEn,
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
  const id = formData.get("id")
  try {
    await prisma.color.delete({
      where: {
        id: id as string
      }
    })
  } catch (error) {
    console.error(error)
  }
  refresh()
}