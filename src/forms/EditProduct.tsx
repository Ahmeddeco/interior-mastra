"use client"

import { useForm } from "@conform-to/react"
import { parseWithZod } from "@conform-to/zod"
import Form from "next/form"
import { useActionState } from "react"
import { Field, FieldError, FieldLabel } from "@/components/ui/field"
import { Input } from "@/components/ui/input"
import SubmitButton from "@/components/shared/SubmitButton"
import { editProductAction } from "@/actions/product.action"
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
import { getOneProductType } from "@/types/product.type"

type Props = {
	colors: getAllColorsForProductPageType
	styles: getAllStylesForProductPageType
	factories: getAllFactoriesForProductPageType
	classes: getAllClassesForProductPageType
	product: getOneProductType
}

export default function EditProduct({ colors, factories, styles, classes, product }: Props) {
	const [lastResult, action] = useActionState(editProductAction, undefined)
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

	const formattedColorsData = product?.color?.map((color) => ({
		id: color.id,
		title: color.titleEn,
	}))

	return (
		<Form id={form.id} action={action} onSubmit={form.onSubmit} className="space-y-6">
			<Input name="id" type="hidden" value={product?.id} />
			{/* ---------------------------- title & model ---------------------------- */}
			<div className="flex lg:flex-row flex-col items-center justify-center gap-4">
				{/* ---------------------------------- titleAr --------------------------------- */}
				<Field>
					<FieldLabel htmlFor={fields.titleAr.name}>{fields.titleAr.name}</FieldLabel>
					<Input type="text" key={fields.titleAr.key} name={fields.titleAr.name} defaultValue={product?.titleAr} />
					<FieldError>{fields.titleAr.errors}</FieldError>
				</Field>

				{/* ---------------------------------- titleEn --------------------------------- */}
				<Field>
					<FieldLabel htmlFor={fields.titleEn.name}>{fields.titleEn.name}</FieldLabel>
					<Input type="text" key={fields.titleEn.key} name={fields.titleEn.name} defaultValue={product?.titleEn} />
					<FieldError>{fields.titleEn.errors}</FieldError>
				</Field>
			</div>

			{/* -------------------------------- model -------------------------------- */}
			<Field>
				<FieldLabel htmlFor={fields.model.name}>{fields.model.name}</FieldLabel>
				<Input type="text" key={fields.model.key} name={fields.model.name} defaultValue={product?.model} />
				<FieldError>{fields.model.errors}</FieldError>
			</Field>

			{/* ----------------------------- descriptionAr ----------------------------- */}
			<TiptapEditor
				name={fields.descriptionAr.name}
				label={fields.descriptionAr.name}
				editorKey={fields.descriptionAr.key ?? ""}
				defaultValue={product?.descriptionAr ?? ""}
				errors={fields.descriptionAr.errors ?? []}
			/>

			{/* --------------------------- descriptionEn -------------------------- */}
			<TiptapEditor
				name={fields.descriptionEn.name}
				label={fields.descriptionEn.name}
				editorKey={fields.descriptionEn.key ?? ""}
				defaultValue={product?.descriptionEn ?? ""}
				errors={fields.descriptionEn.errors ?? []}
			/>

			<div className="flex lg:flex-row flex-col items-center justify-center gap-4">
				{/* --------------------------- miniDescriptionAr -------------------------- */}
				<Field>
					<FieldLabel htmlFor={fields.miniDescriptionAr.name}>{fields.miniDescriptionAr.name}</FieldLabel>
					<Textarea
						key={fields.miniDescriptionAr.key}
						name={fields.miniDescriptionAr.name}
						defaultValue={product?.miniDescriptionAr ?? ""}
					/>
					<FieldError>{fields.miniDescriptionAr.errors}</FieldError>
				</Field>

				{/* ----------------------------- miniDescriptionEn ----------------------------- */}
				<Field>
					<FieldLabel htmlFor={fields.miniDescriptionEn.name}>{fields.miniDescriptionEn.name}</FieldLabel>
					<Textarea
						key={fields.miniDescriptionEn.key}
						name={fields.miniDescriptionEn.name}
						defaultValue={product?.miniDescriptionEn ?? ""}
					/>
					<FieldError>{fields.miniDescriptionEn.errors}</FieldError>
				</Field>
			</div>

			{/* -------------------------- status & quantity -------------------------- */}
			<div className="flex lg:flex-row flex-col items-center justify-center gap-4">
				{/* --------------------------------- status --------------------------------- */}
				<Field>
					<FieldLabel htmlFor={fields.status.name}>{fields.status.name}</FieldLabel>
					<Select key={fields.status.key} name={fields.status.name} defaultValue={product?.status}>
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
					<Input type="number" key={fields.quantity.key} name={fields.quantity.name} defaultValue={product?.quantity} />
					<FieldError>{fields.quantity.errors}</FieldError>
				</Field>
			</div>

			{/* ---------------------- factoryId & styleId & classId ----------------------- */}
			<div className="flex lg:flex-row flex-col items-center justify-center gap-4">
				{/* ------------------------------ factoryId ----------------------------- */}
				<Field>
					<FieldLabel htmlFor={fields.factoryId.name}>{fields.factoryId.name}</FieldLabel>
					<Select key={fields.factoryId.key} name={fields.factoryId.name} defaultValue={product?.factoryId}>
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
					<Select key={fields.styleId.key} name={fields.styleId.name} defaultValue={product?.styleId}>
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
					<Select key={fields.classId.key} name={fields.classId.name} defaultValue={product?.classId}>
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
					<Input type="number" key={fields.lowStock.key} name={fields.lowStock.name} defaultValue={product?.lowStock} />
					<FieldError>{fields.lowStock.errors}</FieldError>
				</Field>
				{/* ---------------------------------- price --------------------------------- */}
				<Field>
					<FieldLabel htmlFor={fields.price.name}>{fields.price.name}</FieldLabel>
					<Input type="number" key={fields.price.key} name={fields.price.name} defaultValue={product?.price} />
					<FieldError>{fields.price.errors}</FieldError>
				</Field>
				{/* ------------------------------ discount ------------------------------ */}
				<Field>
					<FieldLabel htmlFor={fields.discount.name}>{fields.discount.name}</FieldLabel>
					<Input
						type="number"
						key={fields.discount.key}
						name={fields.discount.name}
						defaultValue={product?.discount ?? 0}
					/>
					<FieldError>{fields.discount.errors}</FieldError>
				</Field>
			</div>

			{/* -------------------------------- colors ------------------------------- */}
			<MultiSelect
				allSelectedData={colorsData}
				inputName={fields.colors.name}
				label={fields.colors.name}
				defaultValues={formattedColorsData ?? []}
			/>

			{/* -------------------------------- mainImage ------------------------------- */}
			<UploadOneImagesDropZone
				imageName={fields.mainImage.name}
				errors={fields.mainImage.errors}
				label={fields.mainImage.name}
				dbImage={product?.mainImage}
			/>

			{/* --------------------------------- images --------------------------------- */}
			<UploadManyImagesDropZone
				imageName={fields.images.name}
				errors={fields.images.errors}
				label={fields.images.name}
				dbImages={product?.images}
			/>

			{/* ----------------------------- SubmitButton ---------------------------- */}
			<SubmitButton text={"edit product"} />
		</Form>
	)
}
