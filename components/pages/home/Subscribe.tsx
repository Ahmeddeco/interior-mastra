import { SlideUp } from "@/animation/animate"
import MotionWrapper from "@/animation/MotionWrapper"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { getDictionary } from "@/locales/dictionaries"

type Props = {
	locale: "en" | "ar"
}

export default async function Subscribe({ locale }: Props) {
	const dic = await getDictionary(locale)

	return (
		<section className="flex flex-col items-center justify-center gap-4">
			<MotionWrapper variants={SlideUp(0.5)}>
				<h2>{dic.subscribe.title}</h2>
			</MotionWrapper>
			<MotionWrapper variants={SlideUp(0.5)}>
				<h6 className="max-w-md text-center text-pretty">{dic.subscribe.subTitle}</h6>
			</MotionWrapper>
			<MotionWrapper variants={SlideUp(0.5)} className="flex items-center gap-0 h-14 w-md">
				<Input placeholder={locale === "en" ? "Enter your email" : "أدخل الإيميل"} />
				<Button size={"default"} variant={"default"}>
					{locale === "en" ? "subscribe" : "سجل الآن"}
				</Button>
			</MotionWrapper>
		</section>
	)
}
