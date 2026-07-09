type sortByItemsType = {
  titleAr: string
  titleEn: string
  value: string
}[]


export const sortByItems: sortByItemsType = [
  {
    titleAr: "الأحدث",
    titleEn: "Latest",
    value: "latest",
  },
  {
    titleAr: "جديد",
    titleEn: "new",
    value: "new",
  },
  {
    titleAr: "السعر: من الأقل للأعلى",
    titleEn: "Price: Low to High",
    value: "price-asc",
  },
  {
    titleAr: "السعر: من الأعلى للأقل",
    titleEn: "Price: High to Low",
    value: "price-desc",
  },
]