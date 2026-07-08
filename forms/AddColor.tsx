"use client"

import { useForm } from "@conform-to/react"
import { parseWithZod } from "@conform-to/zod"
import Form from "next/form"
import { useActionState } from "react"
import ColorSchema from "@/schemas/ColorSchema"
import { addColorAction } from "@/actions/color.action"
import { Field, FieldError, FieldLabel } from "@/components/ui/field"
import { Input } from "@/components/ui/input"
import SubmitButton from "@/components/shared/SubmitButton"

export default function AddColor() {
	const [lastResult, action] = useActionState(addColorAction, undefined)
	const [form, fields] = useForm({
		lastResult,
		onValidate({ formData }) {
			return parseWithZod(formData, { schema: ColorSchema })
		},
		shouldValidate: "onBlur",
		shouldRevalidate: "onInput",
	})
	return (
		<Form id={form.id} action={action} onSubmit={form.onSubmit} className="space-y-6">
			{/* ---------------------------------- titleAr --------------------------------- */}
			<Field>
				<FieldLabel htmlFor={fields.titleAr.name}>{fields.titleAr.name}</FieldLabel>
				<Input
					type="text"
					key={fields.titleAr.key}
					name={fields.titleAr.name}
					defaultValue={fields.titleAr.initialValue}
					placeholder="اسود"
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
					placeholder="Black"
				/>
				<FieldError>{fields.titleEn.errors}</FieldError>
			</Field>

			{/* ------------------------------ colorCode ------------------------------ */}
			<Field>
				<FieldLabel htmlFor={fields.colorCode.name}>{fields.colorCode.name}</FieldLabel>
				<Input
					type="color"
					key={fields.colorCode.key}
					name={fields.colorCode.name}
					defaultValue={fields.colorCode.initialValue}
				/>
				<FieldError>{fields.colorCode.errors}</FieldError>
			</Field>

			<SubmitButton text={"add color"} />
		</Form>
	)
}
