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
			{/* ---------------------------------- title --------------------------------- */}
			<Field>
				<FieldLabel htmlFor={fields.title.name}>{fields.title.name}</FieldLabel>
				<Input
					type="text"
					key={fields.title.key}
					name={fields.title.name}
					defaultValue={fields.title.initialValue}
					placeholder="Red"
				/>
				<FieldError>{fields.title.errors}</FieldError>
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
