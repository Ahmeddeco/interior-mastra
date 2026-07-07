import { Role } from "./generated/prisma/enums"

declare module "better-auth" {
  interface User {
    role: Role
  }
}