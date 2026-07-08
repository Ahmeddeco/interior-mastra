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
import { deleteClassAction } from "@/actions/class.action"
import { isAllowedRoles } from "@/auth/isAllowedRoles"
import { Role } from "@/generated/prisma/enums"
import Image from "next/image"
import { getAllClassesForClassesServerPageType } from "@/types/class.type"
import { getAllClassesForClassesServerPage } from "@/dl/class.data"

export default async function ClassPage({ searchParams }: { searchParams: Promise<{ page: string; size: string }> }) {
	await isAllowedRoles([Role.admin, Role.manufacturer])

	const { page, size } = await searchParams
	const pageNumber = +page > 1 ? +page : 1
	const pageSize = +size || 10
	const classes: getAllClassesForClassesServerPageType = await getAllClassesForClassesServerPage(pageSize, pageNumber)

	return (
		<ServerPageCard
			title={"all classes"}
			description={"All classes in the database."}
			icon={PlusCircle}
			href={"/server/classes/add"}
			btnTitle="add class"
		>
			{!classes?.data.length ? (
				<EmptyCard href={"/server/classes/add"} linkTitle={"add class"} />
			) : (
				<Table>
					{/* ---------------------------- TableHeader ---------------------------- */}
					<TableHeader>
						<TableRow>
							<TableHead>image</TableHead>
							<TableHead>titleAr</TableHead>
							<TableHead>titleEn</TableHead>
							<TableHead>slug</TableHead>
							<TableHead>descriptionEn</TableHead>
							<TableHead className="text-left">settings</TableHead>
						</TableRow>
					</TableHeader>
					{/* ----------------------------- TableBody ----------------------------- */}
					<TableBody>
						{classes.data.map(({ id, titleAr, titleEn, slug, image, descriptionEn }) => (
							<TableRow key={id}>
								<TableCell className="relative rounded-lg size-12 ">
									{image ? (
										<Image src={image} alt={titleEn} width={48} height={48} className="aspect-square object-cover" />
									) : (
										<ImageOff size={48} />
									)}
								</TableCell>
								<TableCell className="capitalize ">{titleAr}</TableCell>
								<TableCell className="capitalize ">{titleEn}</TableCell>
								<TableCell>{slug}</TableCell>
								<TableCell className="line-clamp-2">{descriptionEn}</TableCell>

								{/* -------------------------------- settings -------------------------------- */}
								<TableCell className="text-left">
									<DropdownMenu>
										<DropdownMenuTrigger>
											<MoreVertical />
										</DropdownMenuTrigger>
										<DropdownMenuContent align="start" className="space-y-2">
											<DropdownMenuItem asChild>
												<Button variant={"default"} size={"full"} asChild>
													<Link href={`/server/classes/edit/${slug}`}>edit</Link>
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
															<DialogTitle>Are you sure you want to delete this class ?</DialogTitle>
															<DialogDescription>
																This action can not be undone. This will permanently delete this class and remove its
																data from our servers.
															</DialogDescription>
														</DialogHeader>
														<div className="flex items-center justify-between ">
															<Button asChild>
																<DialogClose>cancel</DialogClose>
															</Button>
															<Form action={deleteClassAction}>
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
						))}
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
								{Array.from({ length: classes.totalPages ?? 1 }).map((_, index) => (
									<PaginationItem key={index}>
										<PaginationLink href={`?size=${pageSize}&page=${index + 1}`} isActive={pageNumber === index + 1}>
											{index + 1}
										</PaginationLink>
									</PaginationItem>
								))}
								<PaginationItem>
									{/* ----------------------------- Next ----------------------------- */}
									{pageNumber < classes.totalPages && (
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
