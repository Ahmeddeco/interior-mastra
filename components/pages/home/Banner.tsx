import Image from "next/image"
import { Button } from "@/components/ui/button"
import { SlideLeft, SlideRight } from "@/animation/animate"
import MotionWrapper from "@/animation/MotionWrapper"
export default function Banner() {
	return (
		<section className="flex lg:flex-row flex-col-reverse lg:gap-12 gap-6  ">
			<MotionWrapper variants={SlideRight(0.5)} className="w-full lg:w-2/3  relative  aspect-square  ">
				<Image src={"/images/banner.webp"} alt={"banner"} fill className="object-contain" />
			</MotionWrapper>
			<div className="w-full lg:w-1/3 flex flex-col lg:justify-center items-center lg:items-start gap-8 ">
				<MotionWrapper variants={SlideLeft(0.5)}>
					<h2 className="max-w-2xs">simple way to make stylish living room</h2>
				</MotionWrapper>
				<MotionWrapper variants={SlideLeft(0.8)}>
					<p className="max-w-2xs">
						Bring your dream home to life with one-on-one interior design help & hand-picked products colored to your
						style, space, and budget.
					</p>
				</MotionWrapper>
				<MotionWrapper variants={SlideLeft(1)}>
					<Button>discover now</Button>
				</MotionWrapper>
			</div>
		</section>
	)
}
