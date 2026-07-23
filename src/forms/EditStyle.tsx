"use client"

import { useForm } from "@conform-to/react"
import { parseWithZod } from "@conform-to/zod"
import Form from "next/form"
import { useActionState } from "react"
import { Field, FieldError, FieldLabel } from "@/components/ui/field"
import { Input } from "@/components/ui/input"
import SubmitButton from "@/components/shared/SubmitButton"
import { editStyleAction } from "@/actions/style.action"
import { Textarea } from "@/components/ui/textarea"
import StyleSchema from "@/schemas/StyleSchema"
import { UploadOneImagesDropZone } from "@/components/shared/UploadImagesDropZone"
import { getOneStyleType } from "@/types/style.type"

type Props = {
	oneStyle: getOneStyleType
}

export default function EditStyle({ oneStyle }: Props) {
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
			<div className="flex lg:flex-row flex-col gap-6">
				<Input type="hidden" name="id" value={oneStyle?.id ?? ""} />
				{/* ---------------------------------- titleAr --------------------------------- */}
				<Field>
					<FieldLabel htmlFor={fields.titleAr.name}>{fields.titleAr.name}</FieldLabel>
					<Input type="text" key={fields.titleAr.key} name={fields.titleAr.name} defaultValue={oneStyle?.titleAr} />
					<FieldError>{fields.titleAr.errors}</FieldError>
				</Field>
				{/* ---------------------------------- titleEn --------------------------------- */}
				<Field>
					<FieldLabel htmlFor={fields.titleEn.name}>{fields.titleEn.name}</FieldLabel>
					<Input type="text" key={fields.titleEn.key} name={fields.titleEn.name} defaultValue={oneStyle?.titleEn} />
					<FieldError>{fields.titleEn.errors}</FieldError>
				</Field>
			</div>

			{/* ------------------------------- descriptionAr ------------------------------ */}
			<Field>
				<FieldLabel htmlFor={fields.descriptionAr.name}>{fields.descriptionAr.name}</FieldLabel>
				<Textarea
					key={fields.descriptionAr.key}
					name={fields.descriptionAr.name}
					defaultValue={oneStyle?.descriptionAr ?? ""}
				/>
				<FieldError>{fields.descriptionAr.errors}</FieldError>
			</Field>

			{/* ------------------------------- descriptionEn ------------------------------ */}
			<Field>
				<FieldLabel htmlFor={fields.descriptionEn.name}>{fields.descriptionEn.name}</FieldLabel>
				<Textarea
					key={fields.descriptionEn.key}
					name={fields.descriptionEn.name}
					defaultValue={oneStyle?.descriptionEn ?? ""}
				/>
				<FieldError>{fields.descriptionEn.errors}</FieldError>
			</Field>

			{/* ---------------------------------- image --------------------------------- */}
			<UploadOneImagesDropZone
				imageName={fields.image.name}
				errors={fields.image.errors}
				imageKey={fields.image.key}
				dbImage={oneStyle?.image ?? ""}
			/>

			<SubmitButton text={"edit style"} />
		</Form>
	)
}
