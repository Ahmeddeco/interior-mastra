import Image from "next/image"
import { Button } from "@/components/ui/button"
import { SlideLeft, SlideRight } from "@/animation/animate"
import MotionWrapper from "@/animation/MotionWrapper"
import { getDictionary } from "@/locales/dictionaries"

type Props = {
	locale: "en" | "ar"
}

export default async function Banner2({ locale }: Props) {
	const dic = await getDictionary(locale)

	return (
		<section className="flex lg:flex-row flex-col lg:gap-12 gap-6 justify-evenly ">
			<div className="w-full lg:w-1/3 flex flex-col lg:justify-center items-center lg:items-start gap-8 ">
				<MotionWrapper variants={SlideRight(0.2)}>
					<h2 className="max-w-2xs ">{dic.banner2.title}</h2>
				</MotionWrapper>
				<MotionWrapper variants={SlideRight(0.3)}>
					<h6 className="max-w-2xs ">{dic.banner2.subTitle}</h6>
				</MotionWrapper>
				<div className="flex gap-8 items-center justify-between">
					{dic.banner2.details.map(({ latency, number, text, textBr }, index) => (
						<MotionWrapper variants={SlideRight(latency)} className="flex flex-col gap-4" key={index}>
							<h2>{number}</h2>
							<h6>
								{text}
								<br /> {textBr}
							</h6>
						</MotionWrapper>
					))}
				</div>
				<MotionWrapper variants={SlideRight(1)} className="">
					<Button>{locale === "en" ? "contact us now" : "اتصل بنا الآن"}</Button>
				</MotionWrapper>
			</div>
			<MotionWrapper variants={SlideLeft(1)} className="w-full lg:w-2/3  relative  aspect-square  ">
				<Image src={"/images/banner2.webp"} alt={"banner"} fill className="object-contain" />
			</MotionWrapper>
		</section>
	)
}
