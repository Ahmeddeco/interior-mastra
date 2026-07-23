import Banner from "@/components/pages/home/Banner"
import Banner2 from "@/components/pages/home/Banner2"
import Hero from "@/components/pages/home/Hero"
import OurTools from "@/components/pages/home/OurTools"
import Testimonial from "@/components/pages/home/Testimonial"
import WhatWeProvide from "@/components/pages/home/WhatWeProvide"

type Props = {
	params: Promise<{ locale: "ar" | "en" }>
}

export default async function HomePage({ params }: Props) {
	const locale = (await params).locale

	return (
		<div className="container mx-auto">
			<Hero locale={locale} />
			<OurTools locale={locale} />
			<WhatWeProvide locale={locale} />
			<Banner locale={locale} />
			<Banner2 locale={locale} />
			<Testimonial locale={locale} />
		</div>
	)
}
