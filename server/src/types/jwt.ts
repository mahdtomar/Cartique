// types/jwt.ts
import { JwtPayload } from "jsonwebtoken";
export type Role = "vendor" | "customer" | "admin";
export const VALID_ROLES: Role[] = ["vendor", "customer", "admin"];

export interface CustomPayload extends JwtPayload {
    id: string;
    role: Role;
}
// types/jwt.ts
export function isCustomPayload(decoded: any): decoded is CustomPayload {
    return (
        typeof decoded === "object" &&
        typeof decoded.id === "string" &&
        VALID_ROLES.includes(decoded.role) // Use the constant here
    );
}
