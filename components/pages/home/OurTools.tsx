import { SlideLeft } from "@/animation/animate"
import MotionWrapper from "@/animation/MotionWrapper"
import { Button } from "@/components/ui/button"
import { ourTools } from "@/constants/ourTools"
import React from "react"

export default function OurTools() {
	return (
		<section className="flex flex-col items-center justify-center gap-8">
			<h2>our tools</h2>

			<div className="flex flex-wrap gap-8 items-center justify-center ">
				{ourTools.map(({ SlideLeftValue, icon, title }, index) => (
					<MotionWrapper variants={SlideLeft(SlideLeftValue)} key={index}>
						<Button variant={"outline"} size={"sm"} className="cursor-not-allowed ">
							{React.createElement(icon)} {title}
						</Button>
					</MotionWrapper>
				))}
			</div>
		</section>
	)
}
