"use client"

import { useForm } from "@conform-to/react"
import { parseWithZod } from "@conform-to/zod"
import Form from "next/form"
import { useActionState } from "react"
import { Field, FieldError, FieldLabel } from "@/components/ui/field"
import { Input } from "@/components/ui/input"
import SubmitButton from "@/components/shared/SubmitButton"
import { addFactoryAction } from "@/actions/factory.action"
import FactorySchema from "@/schemas/FactorySchema"
import { Textarea } from "@/components/ui/textarea"
import { UploadOneImagesDropZone } from "@/components/shared/UploadImagesDropZone"
import Phone from "@/components/shared/Phone"
import CountryInput from "@/components/shared/CountryInput"
import MultiSelect from "@/components/shared/MultiSelect"

type Props = {
	users: { id: string; name: string | null }[] | undefined
}

export default function AddFactory({ users }: Props) {
	const [lastResult, action] = useActionState(addFactoryAction, undefined)
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
			{/* ---------------------------------- name --------------------------------- */}
			<Field>
				<FieldLabel htmlFor={fields.name.name}>{fields.name.name}</FieldLabel>
				<Input type="text" key={fields.name.key} name={fields.name.name} defaultValue={fields.name.initialValue} />
				<FieldError>{fields.name.errors}</FieldError>
			</Field>

			{/* ---------------------------------- owners --------------------------------- */}
			<MultiSelect
				allSelectedData={users?.map((u) => ({ id: u.id, title: u.name || "" }))}
				inputName={fields.users.name}
				label={fields.users.name}
			/>

			{/* ---------------------------------- info ---------------------------------- */}
			<Field>
				<FieldLabel htmlFor={fields.info.name}>{fields.info.name}</FieldLabel>
				<Textarea key={fields.info.key} name={fields.info.name} defaultValue={fields.info.initialValue} />
				<FieldError>{fields.info.errors}</FieldError>
			</Field>

			{/* ---------------------------------- logo ---------------------------------- */}
			<UploadOneImagesDropZone
				errors={fields.logo.errors}
				imageName={fields.logo.name}
				key={fields.logo.key}
				label={fields.logo.name}
			/>

			{/* --------------------------------- mobile --------------------------------- */}
			<Phone name={fields.mobile.name} defaultValue={fields.mobile.initialValue!} errors={fields.mobile.errors} />

			{/* --------------------------------- hotLine -------------------------------- */}
			<Phone name={fields.hotLine.name} defaultValue={fields.hotLine.initialValue!} errors={fields.hotLine.errors} />

			{/* --------------------------------- address -------------------------------- */}
			<CountryInput cityName={fields.city.name} countryName={fields.country.name} stateName={fields.state.name} />

			{/* ----------------------------- SubmitButton ---------------------------- */}
			<SubmitButton text={"add factory"} />
		</Form>
	)
}
