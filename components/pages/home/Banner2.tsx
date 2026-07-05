import Image from "next/image"
import { Button } from "@/components/ui/button"
import { SlideLeft, SlideRight } from "@/animation/animate"
import MotionWrapper from "@/animation/MotionWrapper"

export default function Banner2() {
	return (
		<section className="flex lg:flex-row flex-col lg:gap-12 gap-6 justify-evenly ">
			<div className="w-full lg:w-1/3 flex flex-col lg:justify-center items-center lg:items-start gap-8 ">
				<MotionWrapper variants={SlideRight(0.2)}>
					<h2 className="max-w-2xs ">we believe that a team makes any project better</h2>
				</MotionWrapper>
				<MotionWrapper variants={SlideRight(0.3)}>
					<p className="max-w-2xs ">
						Bring your dream home to life with one-on-one interior design help & hand picked products colored to your
						style, space, and budget.
					</p>
				</MotionWrapper>
				<div className="flex gap-8 items-center justify-between">
					<MotionWrapper variants={SlideRight(0.5)} className="flex flex-col gap-4">
						<h2>15</h2>
						<p>
							Year of
							<br /> Experience
						</p>
					</MotionWrapper>
					<MotionWrapper variants={SlideRight(0.7)} className="flex flex-col gap-4">
						<h2>38</h2>
						<p>
							Projects
							<br /> Complete
						</p>
					</MotionWrapper>
					<MotionWrapper variants={SlideRight(0.9)} className="flex flex-col gap-4">
						<h2>29</h2>
						<p>
							Different
							<br /> Cities
						</p>
					</MotionWrapper>
				</div>
				<MotionWrapper variants={SlideRight(1)} className="">
					<Button>contact us</Button>
				</MotionWrapper>
			</div>
			<MotionWrapper variants={SlideLeft(1)} className="w-full lg:w-2/3  relative  aspect-square  ">
				<Image src={"/images/banner2.webp"} alt={"banner"} fill className="object-contain" />
			</MotionWrapper>
		</section>
	)
}
