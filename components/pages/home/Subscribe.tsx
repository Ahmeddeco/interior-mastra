import { SlideUp } from "@/animation/animate"
import MotionWrapper from "@/animation/MotionWrapper"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

export default function Subscribe() {
	return (
		<section className="flex flex-col items-center justify-center gap-8">
			<MotionWrapper variants={SlideUp(0.5)}>
				<h2>subscribe to our newsletter</h2>
			</MotionWrapper>
			<MotionWrapper variants={SlideUp(0.5)}>
				<p className="max-w-md text-center text-pretty">
					Bring your dream home to life with one-on-one interior design help & hand picked products colored to your
					style,
				</p>
			</MotionWrapper>
			<MotionWrapper variants={SlideUp(0.5)} className="flex items-center gap-0 h-14 w-md">
				<Input className="h-full" placeholder="Enter your email" />
				<Button className="h-full">subscribe</Button>
			</MotionWrapper>
		</section>
	)
}
