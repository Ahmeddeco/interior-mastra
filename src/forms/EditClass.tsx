"use client"

import { useForm } from "@conform-to/react"
import { parseWithZod } from "@conform-to/zod"
import Form from "next/form"
import { useActionState } from "react"
import { Input } from "@/components/ui/input"
import { Field, FieldError, FieldLabel } from "@/components/ui/field"
import SubmitButton from "@/components/shared/SubmitButton"
import ClassSchema from "@/schemas/ClassSchema"
import { Textarea } from "@/components/ui/textarea"
import { editClassAction } from "@/actions/class.action"
import { UploadOneImagesDropZone } from "@/components/shared/UploadImagesDropZone"
import { getOneClassType } from "@/types/class.type"

type Props = {
	oneClass: getOneClassType
}

export default function EditClass({ oneClass }: Props) {
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
			<Input type="hidden" name="id" value={oneClass?.id} />

			{/* ---------------------------------- titleAr --------------------------------- */}
			<div className="flex lg:flex-row flex-col gap-6">
				<Field>
					<FieldLabel htmlFor={fields.titleAr.name}>{fields.titleAr.name}</FieldLabel>
					<Input type="text" key={fields.titleAr.key} name={fields.titleAr.name} defaultValue={oneClass?.titleAr} />
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
					/>
					<FieldError>{oneClass?.titleEn}</FieldError>
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
				<FieldError>{oneClass?.descriptionAr}</FieldError>
			</Field>

			{/* ------------------------------- descriptionEn ------------------------------ */}
			<Field>
				<FieldLabel htmlFor={fields.descriptionEn.name}>{fields.descriptionEn.name}</FieldLabel>
				<Textarea
					key={fields.descriptionEn.key}
					name={fields.descriptionEn.name}
					defaultValue={fields.descriptionEn.initialValue}
				/>
				<FieldError>{oneClass?.descriptionEn}</FieldError>
			</Field>
			{/* ---------------------------------- image --------------------------------- */}
			<UploadOneImagesDropZone
				imageName={fields.image.name}
				errors={fields.image.errors}
				dbImage={oneClass?.image ?? ""}
			/>

			<SubmitButton text={"edit class"} />
		</Form>
	)
}
