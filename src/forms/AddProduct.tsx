"use client"

import { useForm } from "@conform-to/react"
import { parseWithZod } from "@conform-to/zod"
import Form from "next/form"
import { useActionState } from "react"
import { Field, FieldError, FieldLabel } from "@/components/ui/field"
import { Input } from "@/components/ui/input"
import SubmitButton from "@/components/shared/SubmitButton"
import { addProductAction } from "@/actions/product.action"
import ProductSchema from "@/schemas/ProductSchema"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { ProductStatus } from "@/generated/prisma/enums"
import { Textarea } from "@/components/ui/textarea"
import { UploadManyImagesDropZone, UploadOneImagesDropZone } from "@/components/shared/UploadImagesDropZone"
import MultiSelect from "@/components/shared/MultiSelect"
import { getAllColorsForProductPageType } from "@/types/color.type"
import { getAllStylesForProductPageType } from "@/types/style.type"
import { getAllFactoriesForProductPageType } from "@/types/factory.type"
import { getAllClassesForProductPageType } from "@/types/class.type"
import TiptapEditor from "@/components/shared/TiptapEditor"

type Props = {
	colors: getAllColorsForProductPageType
	styles: getAllStylesForProductPageType
	factories: getAllFactoriesForProductPageType
	classes: getAllClassesForProductPageType
}

export default function AddProduct({ colors, factories, styles, classes }: Props) {
	const [lastResult, action] = useActionState(addProductAction, undefined)
	const [form, fields] = useForm({
		lastResult,
		onValidate({ formData }) {
			return parseWithZod(formData, { schema: ProductSchema })
		},
		shouldValidate: "onBlur",
		shouldRevalidate: "onInput",
	})

	const colorsData = colors?.map((color) => ({
		id: color.id,
		title: color.titleEn,
	}))

	return (
		<Form id={form.id} action={action} onSubmit={form.onSubmit} className="space-y-6">
			{/* ---------------------------- title & model ---------------------------- */}
			<div className="flex lg:flex-row flex-col items-center justify-center gap-4">
				{/* ---------------------------------- titleAr --------------------------------- */}
				<Field>
					<FieldLabel htmlFor={fields.titleAr.name}>{fields.titleAr.name}</FieldLabel>
					<Input
						type="text"
						key={fields.titleAr.key}
						name={fields.titleAr.name}
						defaultValue={fields.titleAr.initialValue}
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
					/>
					<FieldError>{fields.titleEn.errors}</FieldError>
				</Field>
			</div>

			{/* -------------------------------- model -------------------------------- */}
			<Field>
				<FieldLabel htmlFor={fields.model.name}>{fields.model.name}</FieldLabel>
				<Input
					type="text"
					key={fields.model.key}
					name={fields.model.name}
					defaultValue={fields.model.initialValue}
					placeholder="komo-123 "
				/>
				<FieldError>{fields.model.errors}</FieldError>
			</Field>

			{/* ----------------------------- descriptionAr ----------------------------- */}
			<TiptapEditor
				name={fields.descriptionAr.name}
				label={fields.descriptionAr.name}
				editorKey={fields.descriptionAr.key ?? ""}
				defaultValue={fields.descriptionAr.initialValue ?? ""}
				errors={fields.descriptionAr.errors ?? []}
			/>

			{/* --------------------------- descriptionEn -------------------------- */}
			<TiptapEditor
				name={fields.descriptionEn.name}
				label={fields.descriptionEn.name}
				editorKey={fields.descriptionEn.key ?? ""}
				defaultValue={fields.descriptionEn.initialValue ?? ""}
				errors={fields.descriptionEn.errors ?? []}
			/>

			<div className="flex lg:flex-row flex-col items-center justify-center gap-4">
				{/* --------------------------- miniDescriptionAr -------------------------- */}
				<Field>
					<FieldLabel htmlFor={fields.miniDescriptionAr.name}>{fields.miniDescriptionAr.name}</FieldLabel>
					<Textarea
						key={fields.miniDescriptionAr.key}
						name={fields.miniDescriptionAr.name}
						defaultValue={fields.miniDescriptionAr.initialValue}
					/>
					<FieldError>{fields.miniDescriptionAr.errors}</FieldError>
				</Field>

				{/* ----------------------------- miniDescriptionEn ----------------------------- */}
				<Field>
					<FieldLabel htmlFor={fields.miniDescriptionEn.name}>{fields.miniDescriptionEn.name}</FieldLabel>
					<Textarea
						key={fields.miniDescriptionEn.key}
						name={fields.miniDescriptionEn.name}
						defaultValue={fields.miniDescriptionEn.initialValue}
					/>
					<FieldError>{fields.miniDescriptionEn.errors}</FieldError>
				</Field>
			</div>

			{/* -------------------------- status & quantity -------------------------- */}
			<div className="flex lg:flex-row flex-col items-center justify-center gap-4">
				{/* --------------------------------- status --------------------------------- */}
				<Field>
					<FieldLabel htmlFor={fields.status.name}>{fields.status.name}</FieldLabel>
					<Select key={fields.status.key} name={fields.status.name} defaultValue={ProductStatus.draft}>
						<SelectTrigger>
							<SelectValue />
						</SelectTrigger>
						<SelectContent>
							{Object.entries(ProductStatus).map(([key, value]) => (
								<SelectItem value={value} key={value}>
									{key}
								</SelectItem>
							))}
						</SelectContent>
					</Select>
					<FieldError>{fields.status.errors}</FieldError>
				</Field>
				{/* -------------------------------- quantity -------------------------------- */}
				<Field>
					<FieldLabel htmlFor={fields.quantity.name}>{fields.quantity.name}</FieldLabel>
					<Input
						type="number"
						key={fields.quantity.key}
						name={fields.quantity.name}
						defaultValue={fields.quantity.initialValue}
						placeholder="0 "
					/>
					<FieldError>{fields.quantity.errors}</FieldError>
				</Field>
			</div>

			{/* ---------------------- factoryId & styleId & classId ----------------------- */}
			<div className="flex lg:flex-row flex-col items-center justify-center gap-4">
				{/* ------------------------------ factoryId ----------------------------- */}
				<Field>
					<FieldLabel htmlFor={fields.factoryId.name}>{fields.factoryId.name}</FieldLabel>
					<Select key={fields.factoryId.key} name={fields.factoryId.name} defaultValue={fields.factoryId.initialValue}>
						<SelectTrigger>
							<SelectValue />
						</SelectTrigger>
						<SelectContent>
							{factories?.map(({ id, name }) => (
								<SelectItem value={id} key={id}>
									{name}
								</SelectItem>
							))}
						</SelectContent>
					</Select>
					<FieldError>{fields.factoryId.errors}</FieldError>
				</Field>
				{/* ------------------------------- styleId ------------------------------ */}
				<Field>
					<FieldLabel htmlFor={fields.styleId.name}>{fields.styleId.name}</FieldLabel>
					<Select key={fields.styleId.key} name={fields.styleId.name} defaultValue={fields.styleId.initialValue}>
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
				{/* --------------------------------- classId -------------------------------- */}
				<Field>
					<FieldLabel htmlFor={fields.classId.name}>{fields.classId.name}</FieldLabel>
					<Select key={fields.classId.key} name={fields.classId.name} defaultValue={fields.classId.initialValue}>
						<SelectTrigger>
							<SelectValue />
						</SelectTrigger>
						<SelectContent>
							{classes?.map(({ id, titleEn }) => (
								<SelectItem value={id} key={id}>
									{titleEn}
								</SelectItem>
							))}
						</SelectContent>
					</Select>
					<FieldError>{fields.classId.errors}</FieldError>
				</Field>
			</div>

			{/* ----------------------- lowStock & price & discount ---------------------- */}
			<div className="flex lg:flex-row flex-col items-center justify-center gap-4">
				<Field>
					<FieldLabel htmlFor={fields.lowStock.name}>{fields.lowStock.name}</FieldLabel>
					<Input
						type="number"
						key={fields.lowStock.key}
						name={fields.lowStock.name}
						defaultValue={fields.lowStock.initialValue}
						placeholder="0 "
					/>
					<FieldError>{fields.lowStock.errors}</FieldError>
				</Field>
				{/* ---------------------------------- price --------------------------------- */}
				<Field>
					<FieldLabel htmlFor={fields.price.name}>{fields.price.name}</FieldLabel>
					<Input
						type="number"
						key={fields.price.key}
						name={fields.price.name}
						defaultValue={fields.price.initialValue}
						placeholder="0 "
					/>
					<FieldError>{fields.price.errors}</FieldError>
				</Field>
				{/* ------------------------------ discount ------------------------------ */}
				<Field>
					<FieldLabel htmlFor={fields.discount.name}>{fields.discount.name}</FieldLabel>
					<Input
						type="number"
						key={fields.discount.key}
						name={fields.discount.name}
						defaultValue={fields.discount.initialValue}
						placeholder="0 "
					/>
					<FieldError>{fields.discount.errors}</FieldError>
				</Field>
			</div>

			{/* -------------------------------- colors ------------------------------- */}
			<MultiSelect allSelectedData={colorsData} inputName={fields.colors.name} label={fields.colors.name} />

			{/* -------------------------------- mainImage ------------------------------- */}
			<UploadOneImagesDropZone
				imageName={fields.mainImage.name}
				errors={fields.mainImage.errors}
				label={fields.mainImage.name}
			/>

			{/* --------------------------------- images --------------------------------- */}
			<UploadManyImagesDropZone
				imageName={fields.images.name}
				errors={fields.images.errors}
				label={fields.images.name}
			/>

			{/* ----------------------------- SubmitButton ---------------------------- */}
			<SubmitButton text={"add product"} />
		</Form>
	)
}
