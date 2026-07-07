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
import { getOneProductType } from "@/types/product.type"

type Props = {
	colors: { id: string; title: string }[]
	factories: { id: string; name: string }[]
	styles: { id: string; title: string }[]
	classes: { id: string; title: string }[]
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
	return (
		<Form id={form.id} action={action} onSubmit={form.onSubmit} className="space-y-6">
			{/* ---------------------------- title & model ---------------------------- */}
			<div className="flex lg:flex-row flex-col items-center justify-center gap-4">
				{/* ---------------------------------- title --------------------------------- */}
				<Field>
					<FieldLabel htmlFor={fields.title.name}>{fields.title.name}</FieldLabel>
					<Input type="text" key={fields.title.key} name={fields.title.name} defaultValue={product?.title} />
					<FieldError>{fields.title.errors}</FieldError>
				</Field>
				{/* -------------------------------- model -------------------------------- */}
				<Field>
					<FieldLabel htmlFor={fields.model.name}>{fields.model.name}</FieldLabel>
					<Input type="text" key={fields.model.key} name={fields.model.name} defaultValue={product?.model} />
					<FieldError>{fields.model.errors}</FieldError>
				</Field>
			</div>

			{/* -------------------- description & miniDescription -------------------- */}
			<div className="flex lg:flex-row flex-col items-center justify-center gap-4">
				{/* ----------------------------- description ----------------------------- */}
				<Field>
					<FieldLabel htmlFor={fields.description.name}>{fields.description.name}</FieldLabel>
					<Textarea
						key={fields.description.key}
						name={fields.description.name}
						defaultValue={product?.description ?? ""}
					/>
					<FieldError>{fields.description.errors}</FieldError>
				</Field>
				{/* --------------------------- miniDescription -------------------------- */}
				<Field>
					<FieldLabel htmlFor={fields.miniDescription.name}>{fields.miniDescription.name}</FieldLabel>
					<Textarea
						key={fields.miniDescription.key}
						name={fields.miniDescription.name}
						defaultValue={product?.miniDescription}
					/>
					<FieldError>{fields.miniDescription.errors}</FieldError>
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
					<Select key={fields.factoryId.key} name={fields.factoryId.name} defaultValue={product?.factory.id}>
						<SelectTrigger>
							<SelectValue />
						</SelectTrigger>
						<SelectContent>
							{factories.map(({ id, name }) => (
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
					<Select key={fields.styleId.key} name={fields.styleId.name} defaultValue={product?.style?.id}>
						<SelectTrigger>
							<SelectValue />
						</SelectTrigger>
						<SelectContent>
							{styles.map(({ id, title }) => (
								<SelectItem value={id} key={id}>
									{title}
								</SelectItem>
							))}
						</SelectContent>
					</Select>
					<FieldError>{fields.styleId.errors}</FieldError>
				</Field>
				{/* --------------------------------- classId -------------------------------- */}
				<Field>
					<FieldLabel htmlFor={fields.classId.name}>{fields.classId.name}</FieldLabel>
					<Select key={fields.classId.key} name={fields.classId.name} defaultValue={product?.class?.id}>
						<SelectTrigger>
							<SelectValue />
						</SelectTrigger>
						<SelectContent>
							{classes.map(({ id, title }) => (
								<SelectItem value={id} key={id}>
									{title}
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
						defaultValue={product?.discount ?? ""}
					/>
					<FieldError>{fields.discount.errors}</FieldError>
				</Field>
			</div>

			{/* -------------------------------- colors ------------------------------- */}
			<MultiSelect
				allSelectedData={colors}
				inputName={fields.colors.name}
				label={fields.colors.name}
				defaultValues={product?.color}
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

			{/* -------------------------------- bluePrint ------------------------------- */}
			<UploadOneImagesDropZone
				imageName={fields.bluePrint.name}
				errors={fields.bluePrint.errors}
				label={fields.bluePrint.name}
				dbImage={product?.bluePrint ?? ""}
			/>
			{/* ----------------------------- SubmitButton ---------------------------- */}
			<SubmitButton text={"edit product"} />
		</Form>
	)
}
