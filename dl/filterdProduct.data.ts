"use cache"

import { Prisma } from "@/generated/prisma/client"
import prisma from "@/lib/prisma"
import { ProductSearchParamsType } from "@/types/product.type"
import { subDays } from "date-fns"
import { cacheLife, cacheTag } from "next/cache"

/* ------------------- getFilteredProductsForFilteredPage ------------------- */
export const getFilteredProductsForFilteredPage = async (searchParams: ProductSearchParamsType, size: number, page: number) => {
  cacheLife("hours")
  cacheTag('products')

  try {
    const where: Prisma.ProductWhereInput = { status: "published" }
    /* ----------------------------- price filter ----------------------------- */
    if (searchParams.min_price || searchParams.max_price) {
      where.price = {}
      if (searchParams.min_price) {
        where.price.gte = Number(searchParams.min_price)
      }
      if (searchParams.max_price) {
        where.price.lte = Number(searchParams.max_price)
      }
    }

    /* ---------------------------- factory filter ---------------------------- */
    if (searchParams.factory) {
      where.factory = Array.isArray(searchParams.factory) ? { slug: { in: searchParams.factory } } : { slug: searchParams.factory }
    }

    /* ----------------------------- class filter ----------------------------- */
    if (searchParams.class) {
      where.class = Array.isArray(searchParams.class) ? { slug: { in: searchParams.class } } : { slug: searchParams.class }
    }

    /* ----------------------------- style filter ----------------------------- */
    if (searchParams.style) {
      where.style = Array.isArray(searchParams.style) ? { slug: { in: searchParams.style } } : { slug: searchParams.style }
    }

    /* ----------------------------- color filter ----------------------------- */
    // لأن المنتج غالباً يمتلك علاقة Many-to-Many مع الألوان
    if (searchParams.color) {
      where.color = Array.isArray(searchParams.color) ? { some: { slug: { in: searchParams.color } } } : { some: { slug: searchParams.color } }
    }

    /* ----------------------- dynamic latest filter ----------------------- */
    // إذا كان الترتيب حسب الأحدث، نفلتر أولاً المنتجات المضافة خلال آخر 30 يوماً
    if (searchParams.sort_by === "new") {
      where.createdAt = { gte: subDays(new Date(), 30) }
    }

    /* ------------------------------ order by ------------------------------ */
    let orderBy: Prisma.ProductOrderByWithRelationInput = { createdAt: "desc" }
    if (searchParams.sort_by) {
      switch (searchParams.sort_by) {
        case "new":
          orderBy = { createdAt: "desc" }
          break
        case "latest":
          orderBy = { createdAt: "desc" }
          break
        case "price-asc":
          orderBy = { price: "asc" }
          break
        case "price-desc":
          orderBy = { price: "desc" }
          break
        default:
          orderBy = { titleEn: "asc" }
          break
      }
    }

    const totalProducts = await prisma.product.count({ where })
    const totalPages = Math.ceil(totalProducts / size)

    const data = await prisma.product.findMany({
      where,
      orderBy,
      skip: (page * size) - size,
      take: size,
      select: {
        id: true,
        titleAr: true,
        titleEn: true,
        miniDescriptionAr: true,
        miniDescriptionEn: true,
        slug: true,
        model: true,
        price: true,
        discount: true,
        mainImage: true,
        createdAt: true,
        class: { select: { titleAr: true, titleEn: true, slug: true } },
        color: { select: { titleAr: true, titleEn: true, slug: true } },
        style: { select: { titleAr: true, titleEn: true, slug: true } },
        factory: { select: { name: true, slug: true } },
      }
    })
    return { data, totalPages, totalProducts }
  } catch (error) {
    console.error(error)
    return { data: [], totalPages: 0, totalProducts: 0 }
  }
}

