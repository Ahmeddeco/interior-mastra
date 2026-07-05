import { CircleDollarSign, ClipboardPenLine, Workflow } from "lucide-react"
import { SlideUp } from "@/animation/animate"
import MotionWrapper from "@/animation/MotionWrapper"
import CustomCard from "@/components/shared/CustomCard"

export default function WhatWeProvide() {
	return (
		<section className="flex flex-col gap-12 items-center">
			{/* ---------------------------------- title --------------------------------- */}
			<div className="flex flex-col items-center gap-6">
				<MotionWrapper variants={SlideUp(0.2)}>
					<h2>What We Provide</h2>
				</MotionWrapper>
				<MotionWrapper variants={SlideUp(0.4)}>
					<p className="max-w-2xs text-pretty text-center">
						We provide a wide range of interior design services to meet your needs.
					</p>
				</MotionWrapper>
			</div>
			{/* ---------------------------------- cards --------------------------------- */}
			<div className="flex flex-wrap justify-center gap-8">
				<MotionWrapper variants={SlideUp(0.2)} className="">
					<CustomCard
						title={"luxury"}
						titleBr={"facilities"}
						paragraph={"The advantage of hiring a workspace with us is that gives you comfortable services."}
						link={"#"}
						linkTitle={"learn more"}
						icon={ClipboardPenLine}
					/>
				</MotionWrapper>
				<MotionWrapper variants={SlideUp(0.4)} className="">
					<CustomCard
						title={"affordable"}
						titleBr={"price"}
						paragraph={"You can get a workspace of the highest quality at an affordable price."}
						link={"#"}
						linkTitle={"learn more"}
						icon={CircleDollarSign}
						color={"black"}
					/>
				</MotionWrapper>
				<MotionWrapper variants={SlideUp(0.6)} className="">
					<CustomCard
						title={"smooth"}
						titleBr={"workflow"}
						paragraph={"We provide the most easy smooth workflow of interior design."}
						link={"#"}
						linkTitle={"learn more"}
						icon={Workflow}
					/>
				</MotionWrapper>
			</div>
		</section>
	)
}
