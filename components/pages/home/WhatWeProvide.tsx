import { SlideUp } from "@/animation/animate"
import MotionWrapper from "@/animation/MotionWrapper"
import CustomCard from "@/components/shared/CustomCard"
import { getDictionary } from "@/locales/dictionaries"

type Props = {
	locale: "en" | "ar"
}

export default async function WhatWeProvide({ locale }: Props) {
	const dic = await getDictionary(locale)

	return (
		<section className="flex flex-col gap-12 items-center">
			{/* ---------------------------------- title --------------------------------- */}
			<div className="flex flex-col items-center gap-6">
				<MotionWrapper variants={SlideUp(0.2)}>
					<h2>{dic.whatWeProvide.title}</h2>
				</MotionWrapper>
				<MotionWrapper variants={SlideUp(0.4)}>
					<h6 className="max-w-2xs text-pretty text-center">{dic.whatWeProvide.subTitle}</h6>
				</MotionWrapper>
			</div>
			{/* ---------------------------------- cards --------------------------------- */}
			<div className="flex flex-wrap justify-center gap-8">
				{dic.whatWeProvide.cards.map(({ paragraph, title, titleBr, icon }, index) => (
					<MotionWrapper variants={SlideUp(0.2)} key={index}>
						<CustomCard
							title={title}
							titleBr={titleBr}
							paragraph={paragraph}
							link={"#"}
							linkTitle={locale === "en" ? "learn more" : "إعرف المزيد"}
							icon={icon}
							color={index % 2 === 1 ? "black" : "white"}
						/>
					</MotionWrapper>
				))}
			</div>
		</section>
	)
}
