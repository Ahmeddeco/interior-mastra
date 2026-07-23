"use client"

import { useForm } from "@conform-to/react"
import { parseWithZod } from "@conform-to/zod"
import Form from "next/form"
import { useActionState } from "react"
import { Field, FieldError, FieldLabel } from "@/components/ui/field"
import { Input } from "@/components/ui/input"
import SubmitButton from "@/components/shared/SubmitButton"
import { addStyleAction } from "@/actions/style.action"
import { Textarea } from "@/components/ui/textarea"
import StyleSchema from "@/schemas/StyleSchema"
import { UploadOneImagesDropZone } from "@/components/shared/UploadImagesDropZone"

export default function AddStyle() {
	const [lastResult, action] = useActionState(addStyleAction, undefined)
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
			<div className="flex lg:flex-row flex-col gap-6">
				{/* ---------------------------------- titleAr --------------------------------- */}
				<Field>
					<FieldLabel htmlFor={fields.titleAr.name}>{fields.titleAr.name}</FieldLabel>
					<Input
						type="text"
						key={fields.titleAr.key}
						name={fields.titleAr.name}
						defaultValue={fields.titleAr.initialValue}
						placeholder="Modern"
					/>
					<FieldError>{fields.titleAr.errors}</FieldError>
				</Field>
				{/* ---------------------------------- titleEn --------------------------------- */}
				<Field>
					<FieldLabel htmlFor={fields.titleEn.name}>{fields.titleEn.name}</FieldLabel>
					<Input
						type="text"
						key={fields.titleEn.key}
						name={fields.titleEn.name}
						defaultValue={fields.titleEn.initialValue}
						placeholder="Modern"
					/>
					<FieldError>{fields.titleEn.errors}</FieldError>
				</Field>
			</div>

			{/* ------------------------------- descriptionAr ------------------------------ */}
			<Field>
				<FieldLabel htmlFor={fields.descriptionAr.name}>{fields.descriptionAr.name}</FieldLabel>
				<Textarea
					key={fields.descriptionAr.key}
					name={fields.descriptionAr.name}
					defaultValue={fields.descriptionAr.initialValue}
				/>
				<FieldError>{fields.descriptionAr.errors}</FieldError>
			</Field>

			{/* ------------------------------- descriptionEn ------------------------------ */}
			<Field>
				<FieldLabel htmlFor={fields.descriptionEn.name}>{fields.descriptionEn.name}</FieldLabel>
				<Textarea
					key={fields.descriptionEn.key}
					name={fields.descriptionEn.name}
					defaultValue={fields.descriptionEn.initialValue}
				/>
				<FieldError>{fields.descriptionEn.errors}</FieldError>
			</Field>

			{/* ---------------------------------- image --------------------------------- */}
			<UploadOneImagesDropZone imageName={fields.image.name} errors={fields.image.errors} />

			<SubmitButton text={"add style"} />
		</Form>
	)
}
