import { Role } from "./src/generated/prisma/enums"

declare module "better-auth" {
  interface User {
    role: Role
  }
}