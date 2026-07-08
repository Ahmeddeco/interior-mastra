"use client"

import { useForm } from "@conform-to/react"
import { parseWithZod } from "@conform-to/zod"
import Form from "next/form"
import { useActionState } from "react"
import { editColorAction } from "@/actions/color.action"
import ColorSchema from "@/schemas/ColorSchema"
import { Input } from "@/components/ui/input"
import { Field, FieldError, FieldLabel } from "@/components/ui/field"
import SubmitButton from "@/components/shared/SubmitButton"
import { getOneColorType } from "@/types/color.type"

type Props = {
	color: getOneColorType
}

export default function EditColor({ color }: Props) {
	const [lastResult, action] = useActionState(editColorAction, undefined)
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
			<Input type="hidden" name="slug" value={color?.slug} />

			{/* ---------------------------------- titleAr --------------------------------- */}
			<Field>
				<FieldLabel htmlFor={fields.titleAr.name}>{fields.titleAr.name}</FieldLabel>
				<Input type="text" key={fields.titleAr.key} name={fields.titleAr.name} defaultValue={color?.titleAr} />
				<FieldError>{fields.titleAr.errors}</FieldError>
			</Field>

			{/* ---------------------------------- titleEn --------------------------------- */}
			<Field>
				<FieldLabel htmlFor={fields.titleEn.name}>{fields.titleEn.name}</FieldLabel>
				<Input type="text" key={fields.titleEn.key} name={fields.titleEn.name} defaultValue={color?.titleEn} />
				<FieldError>{fields.titleEn.errors}</FieldError>
			</Field>

			{/* ------------------------------ colorCode ------------------------------ */}
			<Field>
				<FieldLabel htmlFor={fields.colorCode.name}>{fields.colorCode.name}</FieldLabel>
				<Input
					type="color"
					key={fields.colorCode.key}
					name={fields.colorCode.name}
					defaultValue={color?.colorCode ?? ""}
				/>
				<FieldError>{fields.colorCode.errors}</FieldError>
			</Field>

			<SubmitButton text={"edit color"} />
		</Form>
	)
}
