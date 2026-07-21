"use client"

import { useForm } from "@conform-to/react"
import { parseWithZod } from "@conform-to/zod"
import Form from "next/form"
import { useActionState, useState } from "react"
import { Field, FieldError, FieldLabel } from "@/components/ui/field"
import { Input } from "@/components/ui/input"
import SubmitButton from "@/components/shared/SubmitButton"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { UploadManyImagesDropZone, UploadOneImagesDropZone } from "@/components/shared/UploadImagesDropZone"
import { getAllStylesForProductPageType } from "@/types/style.type"
import TiptapEditor from "@/components/shared/TiptapEditor"
import { editDesignAction } from "@/actions/design.action"
import DesignSchema from "@/schemas/DesignSchema"
import { getAllClientsType } from "@/types/user.type"
import CountryInput from "@/components/shared/CountryInput"
import DatePicker from "@/components/shared/DatePicker"
import slugify from "slugify"
import { getOneDesignType } from "@/types/design.type"

type Props = {
	styles: getAllStylesForProductPageType
	clients: getAllClientsType
	design: getOneDesignType
}

export default function EditDesign({ styles, clients, design }: Props) {
	const [slug, setSlug] = useState(design?.slug ?? "")
	const slugTitle = slugify(slug)

	const [lastResult, action] = useActionState(editDesignAction, undefined)
	const [form, fields] = useForm({
		lastResult,
		onValidate({ formData }) {
			return parseWithZod(formData, { schema: DesignSchema })
		},
		shouldValidate: "onBlur",
		shouldRevalidate: "onInput",
	})

	return (
		<Form id={form.id} action={action} onSubmit={form.onSubmit} className="space-y-6">
			<Input name="id" value={design?.id} type="hidden" />
			{/* ---------------------------- title & model ---------------------------- */}
			<div className="flex lg:flex-row flex-col items-center justify-center gap-4">
				{/* ---------------------------------- titleAr --------------------------------- */}
				<Field>
					<FieldLabel htmlFor={fields.titleAr.name}>{fields.titleAr.name}</FieldLabel>
					<Input type="text" key={fields.titleAr.key} name={fields.titleAr.name} defaultValue={design?.titleAr} />
					<FieldError>{fields.titleAr.errors}</FieldError>
				</Field>

				{/* ---------------------------------- titleEn --------------------------------- */}
				<Field>
					<FieldLabel htmlFor={fields.titleEn.name}>{fields.titleEn.name}</FieldLabel>
					<Input
						type="text"
						key={fields.titleEn.key}
						name={fields.titleEn.name}
						defaultValue={design?.titleEn}
						onChange={(e) => setSlug(e.target.value)}
					/>
					<FieldError>{fields.titleEn.errors}</FieldError>
				</Field>
			</div>
			{/* ---------------------------------- slug ---------------------------------- */}
			<Field>
				<FieldLabel>slug</FieldLabel>
				<Input type="text" name={"slug"} value={slugTitle} readOnly />
			</Field>

			{/* ------------------------ style & clients & createdAt ----------------------- */}
			<div className="flex lg:flex-row flex-col items-center justify-center gap-4">
				{/* --------------------------------- style -------------------------------- */}
				<Field>
					<FieldLabel htmlFor={fields.styleId.name}>style</FieldLabel>
					<Select key={fields.styleId.key} name={fields.styleId.name} defaultValue={design?.styleId}>
						<SelectTrigger>
							<SelectValue />
						</SelectTrigger>
						<SelectContent>
							{styles?.map(({ id, titleEn }) => (
								<SelectItem value={id} key={id}>
									{titleEn}
								</SelectItem>
							))}
						</SelectContent>
					</Select>
					<FieldError>{fields.styleId.errors}</FieldError>
				</Field>

				{/* --------------------------------- clients -------------------------------- */}
				<Field>
					<FieldLabel htmlFor={fields.userId.name}>{"clients"}</FieldLabel>
					<Select key={fields.userId.key} name={fields.userId.name} defaultValue={design?.userId}>
						<SelectTrigger>
							<SelectValue />
						</SelectTrigger>
						<SelectContent>
							{clients?.map(({ id, name }) => (
								<SelectItem value={id} key={id}>
									{name}
								</SelectItem>
							))}
						</SelectContent>
					</Select>
					<FieldError>{fields.userId.errors}</FieldError>
				</Field>

				{/* -------------------------------- createdAt ------------------------------- */}
				<DatePicker
					name={fields.createdAt.name}
					defaultValue={design?.createdAt ? design.createdAt.toISOString() : undefined}
					errors={fields.createdAt.errors}
					key={fields.createdAt.key}
				/>
			</div>

			{/* ----------------------------- CountryInput ---------------------------- */}
			<CountryInput userCountry={design?.country ?? ""} userCity={design?.city ?? ""} userState={design?.state ?? ""} />

			{/* ----------------------------- descriptionAr ----------------------------- */}
			<TiptapEditor
				name={fields.descriptionAr.name}
				label={fields.descriptionAr.name}
				editorKey={fields.descriptionAr.key ?? ""}
				defaultValue={design?.descriptionAr ?? ""}
				errors={fields.descriptionAr.errors ?? []}
			/>

			{/* --------------------------- descriptionEn -------------------------- */}
			<TiptapEditor
				name={fields.descriptionEn.name}
				label={fields.descriptionEn.name}
				editorKey={fields.descriptionEn.key ?? ""}
				defaultValue={design?.descriptionEn ?? ""}
				errors={fields.descriptionEn.errors ?? []}
			/>

			{/* ------------------------------ painPointsAr ------------------------------ */}
			<TiptapEditor
				name={fields.painPointsAr.name}
				label={fields.painPointsAr.name}
				editorKey={fields.painPointsAr.key ?? ""}
				defaultValue={design?.painPointsAr ?? ""}
				errors={fields.painPointsAr.errors ?? []}
			/>

			{/* ----------------------------- painPointsEn ---------------------------- */}
			<TiptapEditor
				name={fields.painPointsEn.name}
				label={fields.painPointsEn.name}
				editorKey={fields.painPointsEn.key ?? ""}
				defaultValue={design?.painPointsEn ?? ""}
				errors={fields.painPointsEn.errors ?? []}
			/>

			{/* ------------------------------- solutionsAr ------------------------------ */}
			<TiptapEditor
				name={fields.solutionsAr.name}
				label={fields.solutionsAr.name}
				editorKey={fields.solutionsAr.key ?? ""}
				defaultValue={design?.solutionsAr ?? ""}
				errors={fields.solutionsAr.errors ?? []}
			/>

			{/* ----------------------------- solutionsEn ----------------------------- */}
			<TiptapEditor
				name={fields.solutionsEn.name}
				label={fields.solutionsEn.name}
				editorKey={fields.solutionsEn.key ?? ""}
				defaultValue={design?.solutionsEn ?? ""}
				errors={fields.solutionsEn.errors ?? []}
			/>

			{/* -------------------------------- mainImage ------------------------------- */}
			<UploadOneImagesDropZone
				imageName={fields.mainImage.name}
				errors={fields.mainImage.errors}
				label={fields.mainImage.name}
				dbImage={design?.mainImage}
			/>

			{/* --------------------------------- images --------------------------------- */}
			<UploadManyImagesDropZone
				imageName={fields.images.name}
				errors={fields.images.errors}
				label={fields.images.name}
				dbImages={design?.images}
			/>

			{/* ----------------------------- SubmitButton ---------------------------- */}
			<SubmitButton text={"edit design"} />
		</Form>
	)
}
