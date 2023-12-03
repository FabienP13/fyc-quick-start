import dbClient from "../connectDB.ts";
import { TransactionSchema, TransactionSchemaCreate } from "../schema/transactionsSchema.ts";

const TransactionService = {
    findAll: async (): Promise<TransactionSchema[]> => {
        try {
            const result = await dbClient.query(`SELECT * FROM transactions`);
            return result as TransactionSchema[];
        } catch (error) {
            throw new Error(`Erreur lors de la récupération des transactions : ${error.message}`);
        }
    },
    findByUserId: async (id: number): Promise<TransactionSchema | null> => {
        try {
            const result = await dbClient.query("SELECT * FROM transactions WHERE user_id = ?", [id]);
            return result.length > 0 ? (result as TransactionSchema) : (null as null);
        } catch (error) {
            throw new Error(`Erreur lors de la récupération des transactions de l'utilisateur : ${error.message}`);
        }
    },
    findById: async (id: number): Promise<TransactionSchema | null> => {
        try {
            const result = await dbClient.query("SELECT * FROM transactions WHERE id = ?", [id]);
            return result.length > 0 ? (result[0] as TransactionSchema) : (null as null);
        } catch (error) {
            throw new Error(`Erreur lors de la récupération de la transaction : ${error.message}`);
        }
    },
    create: async (data: TransactionSchemaCreate): Promise<boolean> => {
        try {
            await dbClient.query("INSERT INTO transactions (volume, type_transaction, transacted_at, user_id, share_price_id) VALUES (?, ?, NOW(), ?, ?)", [
                data.volume,
                data.typeTransaction,
                data.userId,
                data.sharePriceId,
            ]);
            return true;
        } catch (error) {
            throw new Error(`Erreur lors de la création de la transaction : ${error.message}`);
        }
    },
};

export default TransactionService;
