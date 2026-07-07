'use server'

import prisma from "@/lib/prisma"
import StyleSchema from "@/schemas/StyleSchema"
import { parseWithZod } from "@conform-to/zod"
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

  // generatedSlug
  const generatedSlug = slugify(submission.value.title, { lower: true, strict: true, locale: "ar" })

  try {
    await prisma.style.upsert({
      where: { title: submission.value.title },
      create: {
        title: submission.value.title,
        slug: generatedSlug,
        description: submission.value.description,
        image: submission.value.image
      },
      update: {
        title: submission.value.title,
        slug: generatedSlug,
        description: submission.value.description,
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

  // generatedSlug
  const generatedSlug = slugify(submission.value.title, { lower: true, strict: true, locale: "ar" })

  try {
    await prisma.style.update({
      where: {
        slug: submission.value.slug!
      },
      data: {
        title: submission.value.title,
        slug: generatedSlug,
        description: submission.value.description,
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
  redirect("/server/styles")
}