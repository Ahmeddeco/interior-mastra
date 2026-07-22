import ImageSlider from "@/components/shared/ImageSlider"
import { Badge } from "@/components/ui/badge"
import { dateFormate } from "@/logic/dateFormate"
import { FaRegCalendarAlt } from "react-icons/fa"
import { getOneArticleType } from "@/types/article.type"
import { getOneArticle } from "@/dl/article.data"
import { FaUserPen } from "react-icons/fa6"

type Props = {
	params: Promise<{ slug: string; locale: "ar" | "en" }>
}
export default async function OneArticlesPage({ params }: Props) {
	const locale = (await params).locale
	const slug = (await params).slug
	const oneArticle: getOneArticleType = await getOneArticle(slug)

	return (
		<article className="flex flex-col gap-6 container mx-auto">
			<section className="flex lg:flex-row flex-col  gap-6  h-fit">
				{/* ----------------------------- ImageSlider ----------------------------- */}
				<div className="flex-1 h-full">
					<ImageSlider
						mainImage={oneArticle?.mainImage ?? "/images/noImage.svg"}
						images={oneArticle?.images ?? []}
						alt={oneArticle?.titleEn ?? "design image"}
					/>
				</div>

				{/* ------------------------------- title ------------------------------ */}
				<div className="flex-1 flex flex-col gap-4 h-auto">
					<h1>{locale === "en" ? oneArticle?.titleEn : oneArticle?.titleAr}</h1>

					{/* ------------------------ author & createdAt ----------------------- */}
					<div className="flex flex-wrap w-full items-center gap-4 ">
						<Badge>
							<FaUserPen />
							{oneArticle?.author.name ?? ""}
						</Badge>
						<Badge>
							<FaRegCalendarAlt />
							{dateFormate(oneArticle?.createdAt as Date, locale, "full")}
						</Badge>
					</div>

					{/* ------------------------------- description ------------------------------ */}
					<h6>{locale === "en" ? oneArticle?.descriptionEn : oneArticle?.descriptionAr}</h6>

					{/* ---------------------------------- topic --------------------------------- */}
					{oneArticle?.topicAr && oneArticle.topicEn && (
						<div
							className="prose dark:prose-invert max-w-none"
							dangerouslySetInnerHTML={{
								__html: locale === "en" ? oneArticle?.topicEn : oneArticle?.topicAr,
							}}
						/>
					)}
				</div>
			</section>
		</article>
	)
}
