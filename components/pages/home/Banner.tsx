import Image from "next/image"
import { Button } from "@/components/ui/button"
import { SlideLeft, SlideRight } from "@/animation/animate"
import MotionWrapper from "@/animation/MotionWrapper"
import { getDictionary } from "@/locales/dictionaries"

type Props = {
	locale: "en" | "ar"
}

export default async function Banner({ locale }: Props) {
	const dic = await getDictionary(locale)

	return (
		<section className="flex lg:flex-row flex-col-reverse lg:gap-12 gap-4  ">
			<MotionWrapper variants={SlideRight(0.5)} className="w-full lg:w-2/3  relative  aspect-square  ">
				<Image src={"/images/banner.webp"} alt={"banner"} fill className="object-contain" />
			</MotionWrapper>
			<div className="w-full lg:w-1/3 flex flex-col lg:justify-center items-center lg:items-start gap-8 ">
				<MotionWrapper variants={SlideLeft(0.5)}>
					<h2 className="max-w-2xs">{dic.banner.title}</h2>
				</MotionWrapper>
				<MotionWrapper variants={SlideLeft(0.8)}>
					<h6 className="max-w-xs">{dic.banner.subTitle}</h6>
				</MotionWrapper>
				<MotionWrapper variants={SlideLeft(1)}>
					<Button>{locale === "en" ? "discover now" : "اكتشف الآن"}</Button>
				</MotionWrapper>
			</div>
		</section>
	)
}
