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
import { getAllFactories } from "@/dl/factory.data"
import Image from "next/image"
import { deleteFactoryAction } from "@/actions/factory.action"
import { getAllFactoriesType } from "@/types/factory.type"
import { isAllowedRoles } from "@/auth/isAllowedRoles"
import { Role } from "@/generated/prisma/enums"

export default async function FactoriesPage({
	searchParams,
}: {
	searchParams: Promise<{ page: string; size: string }>
}) {
	await isAllowedRoles([Role.admin])

	const { page, size } = await searchParams
	const pageNumber = +page > 1 ? +page : 1
	const pageSize = +size || 10
	const factories: getAllFactoriesType = await getAllFactories(pageSize, pageNumber)

	return (
		<ServerPageCard
			btnTitle="add factory"
			icon={PlusCircle}
			title={"all factories"}
			description={"All factories in the database."}
			href={"/server/factories/add"}
		>
			{!factories?.data.length ? (
				<EmptyCard href={"/server/factories/add"} linkTitle={"add factory"} />
			) : (
				<Table>
					{/* ---------------------------- TableHeader ---------------------------- */}
					<TableHeader>
						<TableRow>
							<TableHead>logo</TableHead>
							<TableHead>name</TableHead>
							<TableHead>owner</TableHead>
							<TableHead>slug</TableHead>
							<TableHead>mobile</TableHead>
							<TableHead>address</TableHead>
							<TableHead className="text-left">settings</TableHead>
						</TableRow>
					</TableHeader>
					{/* ----------------------------- TableBody ----------------------------- */}
					<TableBody>
						{factories.data.map(({ id, slug, name, logo, country, state, mobile, owner, city }) => (
							<TableRow key={id}>
								<TableCell className="relative rounded-lg size-16 ">
									{logo ? (
										<Image src={logo} alt={name} fill className="rounded-lg object-contain" />
									) : (
										<ImageOff size={72} />
									)}
								</TableCell>
								<TableCell className="capitalize ">{name}</TableCell>
								<TableCell className="capitalize ">{owner?.[0]?.name}</TableCell>
								<TableCell>{slug}</TableCell>
								<TableCell>{mobile}</TableCell>
								<TableCell>
									{country} - {state}
									{city ? ` - ${city}` : ""}
								</TableCell>

								{/* -------------------------------- settings -------------------------------- */}
								<TableCell className="text-left">
									<DropdownMenu>
										<DropdownMenuTrigger>
											<MoreVertical />
										</DropdownMenuTrigger>
										<DropdownMenuContent align="start" className="space-y-2">
											<DropdownMenuItem asChild>
												<Button variant={"default"} size={"full"} asChild>
													<Link href={`/server/factories/edit/${slug}`}>edit</Link>
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
															<DialogTitle>Are you sure you want to delete this factory ?</DialogTitle>
															<DialogDescription>
																This action can not be undone. This will permanently delete this factory and remove its
																data from our servers.
															</DialogDescription>
														</DialogHeader>
														<div className="flex items-center justify-between ">
															<Button asChild>
																<DialogClose>cancel</DialogClose>
															</Button>
															<Form action={deleteFactoryAction}>
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
								{Array.from({ length: factories.totalPages ?? 1 }).map((_, index) => (
									<PaginationItem key={index}>
										<PaginationLink href={`?size=${pageSize}&page=${index + 1}`} isActive={pageNumber === index + 1}>
											{index + 1}
										</PaginationLink>
									</PaginationItem>
								))}
								<PaginationItem>
									{/* ----------------------------- Next ----------------------------- */}
									{pageNumber < factories.totalPages && (
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
