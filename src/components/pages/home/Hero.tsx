import { Button } from "@/components/ui/button"
import Image from "next/image"
import { SlideDown, SlideUp } from "@/animation/animate"
import MotionWrapper from "@/animation/MotionWrapper"
import { getDictionary } from "@/locales/dictionaries"

type Props = {
	locale: "en" | "ar"
}

export default async function Hero({ locale }: Props) {
	const dic = await getDictionary(locale)

	return (
		<section className="flex flex-col lg:flex-row justify-center lg:items-center gap-12 lg:gap-24 lg:max-h-[70vh] h-auto ">
			{/* ---------------------------------- title --------------------------------- */}
			<div className="flex flex-col justify-center items-center lg:items-start gap-4 w-full lg:w-1/3 ">
				<MotionWrapper variants={SlideUp(0.2)}>
					<h2>
						{dic.homePage.heroSection.title} <br />
						{dic.homePage.heroSection.titleBr}
					</h2>
				</MotionWrapper>
				<MotionWrapper variants={SlideUp(0.4)}>
					<h6 className="max-w-sm ">{dic.homePage.heroSection.subTitle}</h6>
				</MotionWrapper>
				<MotionWrapper variants={SlideUp(0.6)} className="flex items-center gap-4">
					<Button>{dic.homePage.heroSection.mainButtonTitle}</Button>
					<Button variant={"ghost"}>{dic.homePage.heroSection.secondaryButtonTitle}</Button>
				</MotionWrapper>
			</div>
			{/* ---------------------------------- Image --------------------------------- */}
			<MotionWrapper variants={SlideDown(0.8)} className="w-full lg:w-2/3 relative aspect-square ">
				<Image src={"/images/hero.webp"} alt={"hero"} fill className="object-contain" />
			</MotionWrapper>
		</section>
	)
}
