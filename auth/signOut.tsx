import { Button } from "@/components/ui/button"
import { auth } from "@/lib/auth"
import Form from "next/form"
import { headers } from "next/headers"

export default async function SignOut() {
	const signOut = async () => {
		"use server"
		await auth.api.signOut({ headers: await headers() })
	}

	return (
		<Form action={signOut} className="w-full">
			<Button type="submit" variant={"destructive"} size={"full"}>
				SignOut
			</Button>
		</Form>
	)
}
