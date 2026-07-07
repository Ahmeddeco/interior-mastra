import OurWorks from "@/components/pages/designs/OurWorks"

type Props = {
	params: Promise<{ locale: "ar" | "en" }>
}

export default async function DesignPage({ params }: Props) {
	const locale = (await params).locale
	return (
		<>
			<OurWorks locale={locale} />
		</>
	)
}
