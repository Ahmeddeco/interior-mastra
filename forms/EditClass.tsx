"use client"

import { useForm } from "@conform-to/react"
import { parseWithZod } from "@conform-to/zod"
import Form from "next/form"
import { useActionState } from "react"
import { Input } from "@/components/ui/input"
import { Field, FieldError, FieldLabel } from "@/components/ui/field"
import SubmitButton from "@/components/shared/SubmitButton"
import { Class } from "@/generated/modelSchema/ClassSchema"
import ClassSchema from "@/schemas/ClassSchema"
import { Textarea } from "@/components/ui/textarea"
import { editClassAction } from "@/actions/class.action"
import { UploadOneImagesDropZone } from "@/components/shared/UploadImagesDropZone"

type Props = {
	data: Class
}

export default function EditClass({ data }: Props) {
	const [lastResult, action] = useActionState(editClassAction, undefined)
	const [form, fields] = useForm({
		lastResult,
		onValidate({ formData }) {
			return parseWithZod(formData, { schema: ClassSchema })
		},
		shouldValidate: "onBlur",
		shouldRevalidate: "onInput",
	})
	return (
		<Form id={form.id} action={action} onSubmit={form.onSubmit} className="space-y-6">
			<Input type="hidden" name="id" value={data.id} />

			{/* ---------------------------------- title --------------------------------- */}
			<Field>
				<FieldLabel htmlFor={fields.title.name}>{fields.title.name}</FieldLabel>
				<Input
					type="text"
					key={fields.title.key}
					name={fields.title.name}
					defaultValue={data.title ?? ""}
					placeholder="Red"
				/>
				<FieldError>{fields.title.errors}</FieldError>
			</Field>

			{/* ------------------------------- description ------------------------------ */}
			<Field>
				<FieldLabel htmlFor={fields.description.name}>{fields.description.name}</FieldLabel>
				<Textarea key={fields.description.key} name={fields.description.name} defaultValue={data.description ?? ""} />
				<FieldError>{fields.description.errors}</FieldError>
			</Field>

			{/* ---------------------------------- image --------------------------------- */}
			<UploadOneImagesDropZone imageName={fields.image.name} errors={fields.image.errors} dbImage={data.image ?? ""} />

			<SubmitButton text={"edit class"} />
		</Form>
	)
}
