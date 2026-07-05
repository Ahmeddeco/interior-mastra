import { redirect } from "next/navigation"
import { getSession } from "./getSession"

export const isAllowedRoles = async (isAllowedRoles: string[]) => {
  const superAdmin = process.env.SUPER_ADMIN
  const session = await getSession()

  if (session?.user.email === superAdmin) {
    return
  }
  if (!session || !isAllowedRoles.includes(session.user.role!)) {
    redirect("/")
  }
  return
}