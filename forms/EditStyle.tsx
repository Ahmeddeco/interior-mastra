"use client"

import { useForm } from "@conform-to/react"
import { parseWithZod } from "@conform-to/zod"
import Form from "next/form"
import { useActionState } from "react"
import { Field, FieldError, FieldLabel } from "@/components/ui/field"
import { Input } from "@/components/ui/input"
import SubmitButton from "@/components/shared/SubmitButton"
import { Textarea } from "@/components/ui/textarea"
import StyleSchema, { Style } from "@/schemas/StyleSchema"
import { editStyleAction } from "@/actions/style.action"
import { UploadOneImagesDropZone } from "@/components/shared/UploadImagesDropZone"

type Props = {
	style: Style
}

export default function EditStyle({ style }: Props) {
	const [lastResult, action] = useActionState(editStyleAction, undefined)
	const [form, fields] = useForm({
		lastResult,
		onValidate({ formData }) {
			return parseWithZod(formData, { schema: StyleSchema })
		},
		shouldValidate: "onBlur",
		shouldRevalidate: "onInput",
	})
	return (
		<Form id={form.id} action={action} onSubmit={form.onSubmit} className="space-y-6">
			{/* --------------------------------- slug -------------------------------- */}
			<Input type="hidden" name="slug" value={style.slug!} />
			{/* ---------------------------------- title --------------------------------- */}
			<Field>
				<FieldLabel htmlFor={fields.title.name}>{fields.title.name}</FieldLabel>
				<Input
					type="text"
					key={fields.title.key}
					name={fields.title.name}
					defaultValue={style.title}
					placeholder="Modern"
				/>
				<FieldError>{fields.title.errors}</FieldError>
			</Field>

			{/* ------------------------------ description ------------------------------ */}
			<Field>
				<FieldLabel htmlFor={fields.description.name}>{fields.description.name}</FieldLabel>
				<Textarea key={fields.description.key} name={fields.description.name} defaultValue={style.description ?? ""} />
				<FieldError>{fields.description.errors}</FieldError>
			</Field>

			{/* ---------------------------------- image --------------------------------- */}
			<UploadOneImagesDropZone imageName={fields.image.name} errors={fields.image.errors} dbImage={style.image ?? ""} />

			<SubmitButton text={"edit style"} />
		</Form>
	)
}
