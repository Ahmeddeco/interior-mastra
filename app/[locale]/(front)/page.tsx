import Banner from "@/components/pages/home/Banner"
import Banner2 from "@/components/pages/home/Banner2"
import Hero from "@/components/pages/home/Hero"
import OurTools from "@/components/pages/home/OurTools"
import Subscribe from "@/components/pages/home/Subscribe"
import Testimonial from "@/components/pages/home/Testimonial"
import WhatWeProvide from "@/components/pages/home/WhatWeProvide"

export default function HomePage() {
	return (
		<>
			<Hero />
			<OurTools />
			<WhatWeProvide />
			<Banner />
			<Banner2 />
			<Testimonial />
			<Subscribe />
		</>
	)
}
