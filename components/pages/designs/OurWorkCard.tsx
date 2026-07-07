import { SlideDown, SlideUp } from "@/animation/animate"
import MotionWrapper from "@/components/shared/MotionWrapper"
import { Button } from "@/components/ui/button"
import { InteriorProject } from "@/types/interior.type"
import Image from "next/image"
import { FaWhatsapp } from "react-icons/fa6"
import { BiDetail } from "react-icons/bi"
import Link from "next/link"
import { Card, CardContent } from "@/components/ui/card"

type Props = {
	interiorProject: InteriorProject
	locale: "ar" | "en"
	index: number
}

export default function OurWorkCard({ interiorProject, locale, index }: Props) {
	return (
		<Card className="  h-auto w-full">
			<CardContent
				className={` ${index % 2 === 0 ? "lg:flex-row-reverse" : "lg:flex-row"} flex flex-col gap-12 lg:gap-24 w-full`}
			>
				{/* ---------------------------------- title --------------------------------- */}
				<div className="flex flex-col justify-center items-center lg:items-start gap-2 w-full lg:w-1/3 ">
					<MotionWrapper variants={SlideUp(0.2)}>
						<h2>{interiorProject.title[locale]}</h2>
					</MotionWrapper>
					<MotionWrapper variants={SlideUp(0.3)}>
						<h6 className="">
							{interiorProject.country} - {interiorProject.state ?? interiorProject.city}
						</h6>
					</MotionWrapper>
					<MotionWrapper variants={SlideUp(0.4)}>
						<p className="capitalize">Style - {interiorProject.style}</p>
					</MotionWrapper>
					<MotionWrapper variants={SlideUp(0.5)}>
						<p className="max-w-sm line-clamp-4">{interiorProject.description[locale]}</p>
					</MotionWrapper>
					<MotionWrapper variants={SlideUp(0.6)} className="flex items-center gap-4">
						<Button variant="outline" asChild>
							<Link href={"https://wa.me/201152640142"} target="_blank">
								<FaWhatsapp />
								{locale === "en" ? "contact us" : "اتصل بنا"}{" "}
							</Link>
						</Button>
						<Button asChild>
							<Link href={`/interior/${interiorProject._id}`}>
								<BiDetail /> {locale === "en" ? "see more details" : "شاهد المزيد من التفاصيل"}
							</Link>
						</Button>
					</MotionWrapper>
				</div>
				{/* ---------------------------------- Image --------------------------------- */}
				<MotionWrapper variants={SlideDown(0.8)} className="w-full lg:w-2/3">
					<Card className="w-full relative aspect-video ">
						<Image src={interiorProject.images[0]} alt={interiorProject.title[locale]} fill className="object-cover " />
					</Card>
				</MotionWrapper>
			</CardContent>
		</Card>
	)
}
