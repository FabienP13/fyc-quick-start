import { UserSchema } from "./usersSchema.ts";
import { SharePriceSchema } from "./sharePricesSchema.ts";

export interface TransactionSchema {
    id: number;
    volume: number;
    typeTransaction: string;
    transactedAt: Date;
    user: UserSchema;
    sharePriceId: number;
}

export interface TransactionSchemaCreate {
    volume: number;
    typeTransaction: string;
    userId: number;
    sharePriceId: number;
}
