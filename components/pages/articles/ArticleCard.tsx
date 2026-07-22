import { WhatsAppContactUs } from "@/components/shared/CustomButtons"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { OneArticleCard } from "@/types/article.type"
import { Eye, ImageOff } from "lucide-react"
import Image from "next/image"
import Link from "next/link"

type Props = {
	article: OneArticleCard
	locale: "ar" | "en"
}

export default function ArticleCard({ article, locale }: Props) {
	return (
		<Card className=" md:w-xs lg:w-md sm:w-xs w-xs min-w-2xs">
			<CardHeader>
				<CardTitle className="line-clamp-1">{locale === "en" ? article?.titleEn : article?.titleAr}</CardTitle>
				<CardDescription className="line-clamp-2">
					{locale === "en" ? article?.descriptionEn : article?.descriptionAr}
				</CardDescription>
			</CardHeader>
			<CardContent className="flex flex-col gap-2">
				{article?.mainImage ? (
					<Image
						src={article?.mainImage}
						alt={article?.titleEn}
						width={128}
						height={128}
						className="aspect-video w-full object-cover"
					/>
				) : (
					<ImageOff />
				)}
			</CardContent>

			<CardFooter className="justify-between">
				<WhatsAppContactUs mobile={"+201503150014"} />
				<Button asChild size={"sm"} variant={"default"}>
					<Link href={`/articles/${article?.slug}`}>
						<Eye />
						{locale === "en" ? "see more" : "شاهد المزيد"}
					</Link>
				</Button>
			</CardFooter>
		</Card>
	)
}
