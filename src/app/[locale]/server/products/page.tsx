import { ImageOff, MoreVertical, PlusCircle } from "lucide-react"
import ServerPageCard from "@/components/shared/ServerPageCard"
import EmptyCard from "@/components/shared/EmptyCard"
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import {
	Pagination,
	PaginationContent,
	PaginationItem,
	PaginationLink,
	PaginationNext,
	PaginationPrevious,
} from "@/components/ui/pagination"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import {
	Dialog,
	DialogClose,
	DialogContent,
	DialogDescription,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from "@/components/ui/dialog"
import Form from "next/form"
import { Input } from "@/components/ui/input"
import Image from "next/image"
import { getAllProductsForProductsPage } from "@/dl/product.data"
import { deleteProductAction } from "@/actions/product.action"
import { isAllowedRoles } from "@/auth/isAllowedRoles"
import { Role } from "@/generated/prisma/enums"
import { getAllProductsForProductsPageType } from "@/types/product.type"

export default async function ProductsPage({
	searchParams,
}: {
	searchParams: Promise<{ page: string; size: string }>
}) {
	await isAllowedRoles([Role.admin])

	const { page, size } = await searchParams
	const pageNumber = +page > 1 ? +page : 1
	const pageSize = +size || 10
	const products: getAllProductsForProductsPageType = await getAllProductsForProductsPage(pageSize, pageNumber)

	return (
		<ServerPageCard
			btnTitle="add product"
			icon={PlusCircle}
			title={"all products"}
			description={"All products in the database."}
			href={"/server/products/add"}
		>
			{!products?.data.length ? (
				<EmptyCard href={"/server/products/add"} linkTitle={"add product"} />
			) : (
				<Table>
					{/* ---------------------------- TableHeader ---------------------------- */}
					<TableHeader>
						<TableRow>
							<TableHead>logo</TableHead>
							<TableHead>name ar</TableHead>
							<TableHead>model</TableHead>
							<TableHead>price</TableHead>
							<TableHead>factory</TableHead>
							<TableHead>style</TableHead>
							<TableHead>class</TableHead>
							<TableHead>status</TableHead>
							<TableHead className="text-left">settings</TableHead>
						</TableRow>
					</TableHeader>
					{/* ----------------------------- TableBody ----------------------------- */}
					<TableBody>
						{products.data.map(
							({ id, mainImage, titleAr, model, price, status, factory, style, class: productClass }) => (
								<TableRow key={id}>
									<TableCell>
										{mainImage ? (
											<Image
												src={mainImage}
												alt={titleAr}
												width={48}
												height={48}
												className=" object-cover aspect-square"
											/>
										) : (
											<ImageOff size={48} />
										)}
									</TableCell>
									<TableCell className="capitalize ">{titleAr}</TableCell>
									<TableCell>{model}</TableCell>
									<TableCell>{price}</TableCell>
									<TableCell>{factory.name}</TableCell>
									<TableCell>{style?.titleEn}</TableCell>
									<TableCell>{productClass?.titleEn}</TableCell>
									<TableCell>{status}</TableCell>

									{/* -------------------------------- settings -------------------------------- */}
									<TableCell className="text-left">
										<DropdownMenu>
											<DropdownMenuTrigger>
												<MoreVertical />
											</DropdownMenuTrigger>
											<DropdownMenuContent align="start" className="space-y-2">
												<DropdownMenuItem asChild>
													<Button variant={"default"} size={"full"} asChild>
														<Link href={`/server/products/edit/${id}`}>edit</Link>
													</Button>
												</DropdownMenuItem>
												{/* ---------------------------- delete --------------------------- */}
												<DropdownMenuItem asChild>
													<Dialog>
														<DialogTrigger asChild>
															<Button variant={"destructive"} size={"full"}>
																delete
															</Button>
														</DialogTrigger>
														<DialogContent>
															<DialogHeader>
																<DialogTitle>Are you sure you want to delete this product ?</DialogTitle>
																<DialogDescription>
																	This action can not be undone. This will permanently delete this product and remove
																	its data from our servers.
																</DialogDescription>
															</DialogHeader>
															<div className="flex items-center justify-between ">
																<Button asChild>
																	<DialogClose>cancel</DialogClose>
																</Button>
																<Form action={deleteProductAction}>
																	<Input type="hidden" name="id" value={id} />
																	<Button variant={"destructive"} type="submit">
																		delete
																	</Button>
																</Form>
															</div>
														</DialogContent>
													</Dialog>
												</DropdownMenuItem>
											</DropdownMenuContent>
										</DropdownMenu>
									</TableCell>
								</TableRow>
							),
						)}
					</TableBody>
					{/* ---------------------------- Pagination ---------------------------- */}
					<TableCaption>
						<Pagination>
							<PaginationContent>
								<PaginationItem>
									{/* --------------------------- Previous --------------------------- */}
									{pageNumber > 1 && <PaginationPrevious href={`?size=${pageSize}&page=${pageNumber - 1}`} />}
								</PaginationItem>
								{/* ------------------------- PaginationLink ------------------------ */}
								{Array.from({ length: products.totalPages ?? 1 }).map((_, index) => (
									<PaginationItem key={index}>
										<PaginationLink href={`?size=${pageSize}&page=${index + 1}`} isActive={pageNumber === index + 1}>
											{index + 1}
										</PaginationLink>
									</PaginationItem>
								))}
								<PaginationItem>
									{/* ----------------------------- Next ----------------------------- */}
									{pageNumber < products.totalPages && (
										<PaginationNext href={`?size=${pageSize}&page=${pageNumber + 1}`} />
									)}
								</PaginationItem>
							</PaginationContent>
						</Pagination>
					</TableCaption>
				</Table>
			)}
		</ServerPageCard>
	)
}
