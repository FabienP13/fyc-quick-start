import { RoleSchema } from "./rolesSchema.ts";

export interface UserSchema {
    id: number;
    firstName: string;
    lastName: string;
    email: string;
    password: string;
    account: number;
    isCdu: boolean;
    cduAcceptedAt: Date;
    registerAt: Date;
    updatedAt: Date;
    role: RoleSchema;
}

export interface UserSchemaCreate {
    firstName: string;
    lastName: string;
    email: string;
    password: string;
    account: number;
    isCdu: boolean;
    cduAcceptedAt: Date;
    roleId: number;
}
export interface UserSchemaRoleUpdate {
    id: number;
    roleId: number;
}

export interface UserSchemaInfoUpdate {
    id: number;
    firstName?: string;
    lastName?: string;
    email?: string;
}

export interface UserSchemaAccountUpdate {
    id: number;
    account: number;
}
