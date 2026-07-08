import { deleteStyleAction } from "@/actions/style.action"
import { isAllowedRoles } from "@/auth/isAllowedRoles"
import EmptyCard from "@/components/shared/EmptyCard"
import ServerPageCard from "@/components/shared/ServerPageCard"
import { Button } from "@/components/ui/button"
import {
	Dialog,
	DialogClose,
	DialogContent,
	DialogDescription,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from "@/components/ui/dialog"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Input } from "@/components/ui/input"
import {
	Pagination,
	PaginationContent,
	PaginationItem,
	PaginationLink,
	PaginationNext,
	PaginationPrevious,
} from "@/components/ui/pagination"
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { getAllStylesForStylesServerPage } from "@/dl/styles.data"
import { Role } from "@/generated/prisma/enums"
import { getAllStylesForStylesServerPageType } from "@/types/style.type"
import { ImageOff, MoreVertical, PlusCircle } from "lucide-react"
import Form from "next/form"
import Image from "next/image"
import Link from "next/link"

export default async function StylesPage({ searchParams }: { searchParams: Promise<{ page: string; size: string }> }) {
	await isAllowedRoles([Role.admin])

	const { page, size } = await searchParams
	const pageNumber = +page > 1 ? +page : 1
	const pageSize = +size || 10
	const styles: getAllStylesForStylesServerPageType = await getAllStylesForStylesServerPage(pageSize, pageNumber)

	return (
		<ServerPageCard
			btnTitle="add style"
			icon={PlusCircle}
			title={"all styles"}
			description={"All styles in the database."}
			href={"/server/styles/add"}
		>
			{!styles?.data.length ? (
				<EmptyCard href={"/server/styles/add"} linkTitle={"add style"} />
			) : (
				<Table>
					{/* ---------------------------- TableHeader ---------------------------- */}
					<TableHeader>
						<TableRow>
							<TableHead>image</TableHead>
							<TableHead>titleAr</TableHead>
							<TableHead>titleEn</TableHead>
							<TableHead>slug</TableHead>
							<TableHead className="text-left">settings</TableHead>
						</TableRow>
					</TableHeader>
					{/* ----------------------------- TableBody ----------------------------- */}
					<TableBody>
						{styles.data.map(({ id, descriptionEn, titleAr, titleEn, slug, image }) => (
							<TableRow key={id}>
								<TableCell>
									{image ? (
										<Image
											src={image}
											alt={titleEn ?? "style"}
											width={48}
											height={48}
											className="aspect-square object-cover"
										/>
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
													<Link href={`/server/styles/edit/${slug}`}>edit</Link>
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
															<DialogTitle>Are you sure you want to delete this style ?</DialogTitle>
															<DialogDescription>
																This action can not be undone. This will permanently delete this style and remove its
																data from our servers.
															</DialogDescription>
														</DialogHeader>
														<div className="flex items-center justify-between ">
															<Button asChild>
																<DialogClose>cancel</DialogClose>
															</Button>
															<Form action={deleteStyleAction}>
																<Input type="hidden" name="slug" value={slug} />
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
								{Array.from({ length: styles.totalPages ?? 1 }).map((_, index) => (
									<PaginationItem key={index}>
										<PaginationLink href={`?size=${pageSize}&page=${index + 1}`} isActive={pageNumber === index + 1}>
											{index + 1}
										</PaginationLink>
									</PaginationItem>
								))}
								<PaginationItem>
									{/* ----------------------------- Next ----------------------------- */}
									{pageNumber < styles.totalPages && (
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
