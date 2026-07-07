"use client"

import { useForm } from "@conform-to/react"
import { parseWithZod } from "@conform-to/zod"
import Form from "next/form"
import { useActionState } from "react"
import { Field, FieldError, FieldLabel } from "@/components/ui/field"
import { Input } from "@/components/ui/input"
import SubmitButton from "@/components/shared/SubmitButton"
import { editFactoryAction } from "@/actions/factory.action"
import FactorySchema from "@/schemas/FactorySchema"
import { Textarea } from "@/components/ui/textarea"
import { UploadOneImagesDropZone } from "@/components/shared/UploadImagesDropZone"
import Phone from "@/components/shared/Phone"
import CountryInput from "@/components/shared/CountryInput"
import MultiSelect from "@/components/shared/MultiSelect"

type Props = {
	factory:
		| ({
				owner: {
					id: string
					name: string | null
				}[]
		  } & {
				info: string | null
				id: string
				name: string
				slug: string
				logo: string | null
				country: string
				state: string
				city: string | null
				mobile: string
				hotLine: string | null
		  })
		| null
	users: { id: string; name: string | null }[] | undefined
}

export default function EditFactory({ factory, users }: Props) {
	const [lastResult, action] = useActionState(editFactoryAction, undefined)
	const [form, fields] = useForm({
		lastResult,
		onValidate({ formData }) {
			return parseWithZod(formData, { schema: FactorySchema })
		},
		shouldValidate: "onBlur",
		shouldRevalidate: "onInput",
	})

	return (
		<Form id={form.id} action={action} onSubmit={form.onSubmit} className="space-y-6">
			{/* --------------------------------- slug -------------------------------- */}
			<Input type="hidden" name="slug" value={factory?.slug} />
			{/* ---------------------------------- name --------------------------------- */}
			<Field>
				<FieldLabel htmlFor={fields.name.name}>{fields.name.name}</FieldLabel>
				<Input
					type="text"
					key={fields.name.key}
					name={fields.name.name}
					defaultValue={factory?.name}
					placeholder="Mobilia"
				/>
				<FieldError>{fields.name.errors}</FieldError>
			</Field>

			{/* ---------------------------------- owners --------------------------------- */}
			<MultiSelect
				allSelectedData={users?.map((u) => ({ id: u.id, title: u.name || "" }))}
				inputName={fields.users.name}
				label={fields.users.name}
				defaultValues={factory?.owner.map((person) => ({ id: person.id, title: person.name || "" }))}
			/>

			{/* ---------------------------------- info ---------------------------------- */}
			<Field>
				<FieldLabel htmlFor={fields.info.name}>{fields.info.name}</FieldLabel>
				<Textarea key={fields.info.key} name={fields.info.name} defaultValue={factory?.info ?? ""} />
				<FieldError>{fields.info.errors}</FieldError>
			</Field>

			{/* ---------------------------------- logo ---------------------------------- */}
			<UploadOneImagesDropZone
				errors={fields.logo.errors}
				imageName={fields.logo.name}
				key={fields.logo.key}
				label={fields.logo.name}
				dbImage={factory?.logo ?? ""}
			/>

			{/* --------------------------------- mobile --------------------------------- */}
			<Phone name={fields.mobile.name} defaultValue={factory?.mobile ?? ""} errors={fields.mobile.errors} />

			{/* --------------------------------- hotLine -------------------------------- */}
			<Phone name={fields.hotLine.name} defaultValue={factory?.hotLine ?? ""} errors={fields.hotLine.errors} />

			{/* --------------------------------- address -------------------------------- */}
			<CountryInput
				cityName={fields.city.name}
				countryName={fields.country.name}
				stateName={fields.state.name}
				userCountry={factory?.country}
				userState={factory?.state}
				userCity={factory?.city ?? ""}
			/>

			{/* ----------------------------- SubmitButton ---------------------------- */}
			<SubmitButton text={"edit factory"} />
		</Form>
	)
}
