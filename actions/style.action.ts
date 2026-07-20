'use server'

import prisma from "@/lib/prisma"
import StyleSchema from "@/schemas/StyleSchema"
import { parseWithZod } from "@conform-to/zod"
import { refresh } from "next/cache"
import { redirect } from "next/navigation"
import slugify from "slugify"

/* ----------------------------- addStyleAction ----------------------------- */
export const addStyleAction = async (prevState: unknown, formData: FormData) => {
  const submission = parseWithZod(formData, {
    schema: StyleSchema,
  })
  if (submission.status !== 'success') {
    return submission.reply()
  }
  const generatedSlug = slugify(submission.value.titleEn, { lower: true, strict: true, })

  try {
    await prisma.style.upsert({
      where: { slug: submission.value.slug },
      create: {
        titleAr: submission.value.titleAr,
        titleEn: submission.value.titleEn,
        slug: generatedSlug,
        descriptionAr: submission.value.descriptionAr,
        descriptionEn: submission.value.descriptionEn,
        image: submission.value.image
      },
      update: {
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
  redirect("/server/styles")
}

/* ----------------------------- editStyleAction ---------------------------- */
export const editStyleAction = async (prevState: unknown, formData: FormData) => {
  const submission = parseWithZod(formData, {
    schema: StyleSchema,
  })
  if (submission.status !== 'success') {
    return submission.reply()
  }
  const generatedSlug = slugify(submission.value.titleEn, { lower: true, strict: true })

  try {
    await prisma.style.update({
      where: {
        id: submission.value.id!
      },
      data: {
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
  redirect("/server/styles")
}

/* ---------------------------- deleteStyleAction --------------------------- */
export const deleteStyleAction = async (formData: FormData) => {
  const slug = formData.get("slug")
  try {
    await prisma.style.delete({
      where: {
        slug: slug as string
      }
    })
  } catch (error) {
    console.error(error)
  }
  refresh()
}