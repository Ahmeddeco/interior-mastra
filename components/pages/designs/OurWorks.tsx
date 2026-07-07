import { getAllInteriors } from "@/dl/interior.data"
import { InteriorProject } from "@/types/interior.type"
import OurWorkCard from "./OurWorkCard"

type Props = {
	locale: "en" | "ar"
}

export default async function OurWorks({ locale }: Props) {
	const data: InteriorProject[] | undefined = await getAllInteriors()

	return (
		<section className="flex flex-col gap-8 items-center justify-center">
			<h1>{locale === "en" ? "Our Works" : "أعمالنا"}</h1>
			<div className="flex flex-col gap-8 lg:gap-16 w-full">
				{data?.map((interior, index) => (
					<div className={`flex flex-col justify-center gap-12 lg:gap-24 min-h-[60vh] h-auto`} key={index}>
						<OurWorkCard interiorProject={interior} locale={locale} index={index} />
					</div>
				))}
			</div>
		</section>
	)
}
