import { Card, CardContent, CardHeader, CardTitle } from "../ui/card"
import Image from "next/image"
import { Color } from "@/enums/color"
import { Separator } from "../ui/separator"

type Props = {
	className?: string
	image: string
	name: string
	job: string
	description: string
	color: Color
}

export default function AvatarCard({ className, image, name, description, job, color = Color.black }: Props) {
	return (
		<Card className={`${className} ${color} border-white w-xs `}>
			<CardHeader>
				<CardTitle className="flex items-center gap-4">
					<div className="relative aspect-square size-12">
						<Image
							src={image}
							alt={"customer"}
							fill
							className={`rounded-full ${color === Color.white ? "border-foreground" : "border-background"} border`}
						/>
					</div>
					<div className="flex flex-col gap-1">
						<h6>{name}</h6>
						<p>{job}</p>
					</div>
				</CardTitle>
				<Separator className={color === Color.white ? "bg-foreground" : "bg-background"} />
			</CardHeader>
			<CardContent className="line-clamp-4">
				<p>{description}</p>
			</CardContent>
		</Card>
	)
}
