"use client"

import { oneInteriorProject } from "@/types/interior.type"
import { Card, CardContent } from "../ui/card"
import { useState } from "react"
import Image from "next/image"
import { MapPinHouse, Palette, User } from "lucide-react"
import { Dialog, DialogContent, DialogClose, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Button } from "../ui/button"
import Link from "next/link"

type Props = {
	data: oneInteriorProject
	locale: "ar" | "en"
}

export default function ProductCard({ data, locale }: Props) {
	const [image, setImage] = useState(0)

	return (
		<section className="flex flex-col lg:flex-row gap-4 ">
			{/* ---------------------------------- Image --------------------------------- */}
			<div className="flex flex-col gap-4 lg:w-2/3 w-full">
				{/* Pop up image to fullscreen and show the image in DialogTrigger */}
				<Dialog>
					<DialogTrigger>
						<Card className=" p-0 min-h-[60vh] h-auto relative aspect-video">
							<Image src={data.images[image]} alt={data.title[locale]} fill className="object-cover" />
						</Card>
					</DialogTrigger>
					<DialogContent className="w-[95vw]  h-[95vh] ">
						<DialogHeader>
							<DialogClose>
								<DialogTitle>
									<Card>
										<CardContent>
											<Image src={data.images[image]} alt={data.title[locale]} fill className="object-cover" />
										</CardContent>
									</Card>
								</DialogTitle>
							</DialogClose>
						</DialogHeader>
					</DialogContent>
				</Dialog>

				<Card className="min-h-[18vh] h-24 ">
					<CardContent className="flex flex-nowrap overflow-x-scroll items-center gap-4 h-full">
						{data.images.map((img, index) => (
							<div
								className={`${image === index ? "border-4 border-foreground" : ""} relative aspect-video h-full`}
								key={index}
								onClick={() => setImage(index)}
							>
								<Image
									src={img}
									alt={data.title[locale]}
									fill
									className={`${
										image === index ? "border border-foreground saturate-150 " : "contrast-75"
									} relative h-full object-cover`}
								/>
							</div>
						))}
					</CardContent>
				</Card>
			</div>

			{/* ---------------------------------- text ---------------------------------- */}
			<Card className="lg:w-1/3 w-full ">
				<CardContent className="flex flex-col gap-2">
					<h2 className="w-sm text-start">{data.title[locale]}</h2>
					<h3 className="capitalize flex items-center gap-2">
						<User /> {data.client.fullName} - {data.client.job ?? ""}
					</h3>
					<h4 className="capitalize flex items-center gap-2">
						<MapPinHouse /> {data.country} - {data.state} - {data.city ?? "no city"}
					</h4>
					<h5 className="capitalize flex items-center gap-2">
						<Palette /> {data.style}
					</h5>
					<p className="text-pretty text-start">{data.description[locale]}</p>
					<Button asChild>
						<Link href={`/interior/start`}>{locale === "en" ? "start your design now" : "إبدأ تصميمك الآن"}</Link>
					</Button>
				</CardContent>
			</Card>
		</section>
	)
}
