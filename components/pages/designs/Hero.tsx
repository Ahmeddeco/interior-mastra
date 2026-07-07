import { Button } from "../../ui/button"
import Image from "next/image"
import { SlideDown, SlideUp } from "@/animation/animate"
import MotionWrapper from "@/components/shared/MotionWrapper"
export default function Hero() {
	return (
		<section className="flex flex-col lg:flex-row justify-center gap-12 lg:gap-24 min-h-[60vh] h-auto">
			{/* ---------------------------------- title --------------------------------- */}
			<div className="flex flex-col justify-center items-center lg:items-start gap-6 w-full lg:w-1/3 ">
				<MotionWrapper variants={SlideUp(0.2)}>
					<h1>
						sketch luxury <br />
						interior design{" "}
					</h1>
				</MotionWrapper>
				<MotionWrapper variants={SlideUp(0.4)}>
					<p className="max-w-sm ">Bring your dream home to life with one-on-one interior design services</p>
				</MotionWrapper>
				<MotionWrapper variants={SlideUp(0.6)} className="flex items-center gap-4">
					<Button variant="outline">contact us</Button>
					<Button>get started</Button>
				</MotionWrapper>
			</div>
			{/* ---------------------------------- Image --------------------------------- */}
			<MotionWrapper variants={SlideDown(0.8)} className="w-full lg:w-2/3 relative aspect-video ">
				<Image src={"/assets/InteriorHeroImage.webp"} alt={"hero"} fill className="object-contain " />
			</MotionWrapper>
		</section>
	)
}
