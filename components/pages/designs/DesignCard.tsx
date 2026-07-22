import { WhatsAppContactUs } from "@/components/shared/CustomButtons"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { getOneDesignsForDesignCardType } from "@/types/design.type"
import { Eye, ImageOff, MapPin, Palette } from "lucide-react"
import Image from "next/image"
import Link from "next/link"

type Props = {
	design: getOneDesignsForDesignCardType
	locale: "ar" | "en"
}

export default function DesignCard({ design, locale }: Props) {
	return (
		<Card className=" md:w-xs lg:w-md sm:w-xs w-xs min-w-2xs">
			<CardHeader>
				<CardTitle className="line-clamp-1">{locale === "en" ? design?.titleEn : design?.titleAr}</CardTitle>
				<CardDescription className="line-clamp-1">
					{locale === "en" ? design?.descriptionEn : design?.descriptionAr}
				</CardDescription>
			</CardHeader>
			<CardContent className="flex flex-col gap-2">
				{design?.mainImage ? (
					<Image
						src={design?.mainImage}
						alt={design?.titleEn}
						width={128}
						height={128}
						className="aspect-video w-full object-cover"
					/>
				) : (
					<ImageOff />
				)}

				<div className="flex flex-wrap items-center  gap-2">
					<Badge>
						<Palette />
						{locale === "en" ? design?.style.titleEn : design?.style.titleAr}
					</Badge>
					<Badge>
						<MapPin />
						{design?.country} - {design?.state}
					</Badge>
				</div>
			</CardContent>

			<CardFooter className="justify-between">
				<WhatsAppContactUs mobile={"+201503150014"} />
				<Button asChild size={"sm"} variant={"default"}>
					<Link href={`/designs/${design?.slug}`}>
						<Eye />
						{locale === "en" ? "see more" : "شاهد المزيد"}
					</Link>
				</Button>
			</CardFooter>
		</Card>
	)
}
