import dbClient from "../connectDb.ts";
import { SharePriceSchema, SharePriceSchemaCreate, SharePriceSchemaUpdate } from "../schema/sharePricesSchema.ts";

const SharePriceService = {
    findAll: async (): Promise<SharePriceSchema[]> => {
        try {
            const result = await dbClient.query(`SELECT * FROM share_prices`);
            return result as SharePriceSchema[];
        } catch (error) {
            throw new Error(`Erreur lors de la récupération des actions : ${error.message}`);
        }
    },
    findById: async (id: number): Promise<SharePriceSchema | null> => {
        try {
            const result = await dbClient.query("SELECT * FROM share_prices WHERE id = ?", [id]);
            return result.length > 0 ? (result[0] as SharePriceSchema) : (null as null);
        } catch (error) {
            throw new Error(`Erreur lors de la récupération de l'action : ${error.message}`);
        }
    },
    checkIfNameNotExists: async (name: string): Promise<boolean> => {
        try {
            const existingSharePrice = await dbClient.query(`SELECT * FROM share_prices WHERE name = ?`, [name]);

            return existingSharePrice.length > 0;
        } catch (error) {
            throw new Error(`Erreur lors de la vérification de l'existence d"une action par son nom : ${error.message}`);
        }
    },
    create: async (data: SharePriceSchemaCreate): Promise<boolean> => {
        try {
            await dbClient.query("INSERT INTO share_prices (name, value, volume, created_at) VALUES (?, ?, ?, NOW())", [data.name, data.value, data.volume]);
            return true;
        } catch (error) {
            throw new Error(`Erreur lors de la création de l'action : ${error.message}`);
        }
    },
    updateById: async (data: SharePriceSchemaUpdate): Promise<boolean> => {
        const updates: string[] = [];

        if (data.name) updates.push(`name = '${data.name}'`);
        if (data.value) updates.push(`value = '${data.value}'`);
        if (data.volume) updates.push(`volume = '${data.volume}'`);

        if (updates.length === 0) {
            return false;
        }
        try {
            const updateString = updates.join(", ");
            await dbClient.query(`UPDATE share_prices SET ${updateString}, updated_at = NOW() WHERE id = ?`, [data.id]);

            return true;
        } catch (error) {
            throw new Error(`Erreur lors de la mise à jour de l'action : ${error.message}`);
        }
    },
};

export default SharePriceService;
