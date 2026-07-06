import AvatarCard from "@/components/shared/AvatarCard"
import { Card, CardContent } from "@/components/ui/card"
import { SlideLeft, SlideUp } from "@/animation/animate"
import MotionWrapper from "@/animation/MotionWrapper"
import { getDictionary } from "@/locales/dictionaries"

type Props = {
	locale: "en" | "ar"
}

export default async function Testimonial({ locale }: Props) {
	const dic = await getDictionary(locale)

	return (
		<section className="flex flex-col justify-center items-center gap-8 ">
			<div className="flex flex-col items-center gap-4">
				<MotionWrapper variants={SlideUp(0.3)}>
					<h2>{dic.testimonial.title}</h2>
				</MotionWrapper>
				<MotionWrapper variants={SlideUp(0.5)}>
					<h6 className="max-w-md text-center text-pretty">{dic.testimonial.subTitle}</h6>
				</MotionWrapper>
			</div>
			<Card className="lg:py-24 h-auto bg-foreground w-full">
				<CardContent className="flex flex-wrap items-center gap-8 justify-center h-full">
					{dic.testimonial.TestimonialData.map(({ delay, job, id, img, name, text, backgroundColor }) => (
						<MotionWrapper key={id} variants={SlideLeft(delay)}>
							<AvatarCard
								image={img}
								name={name}
								job={job}
								description={text}
								color={backgroundColor === "black" ? "black" : "white"}
							/>
						</MotionWrapper>
					))}
				</CardContent>
			</Card>
		</section>
	)
}
