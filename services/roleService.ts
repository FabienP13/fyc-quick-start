import dbClient from "../connectDB.ts";
import { RoleSchema, RoleSchemaCreate, RoleSchemaUpdate } from "../schema/rolesSchema.ts";

const RoleService = {
    findAll: async (): Promise<RoleSchema[]> => {
        try {
            const result = await dbClient.query(`SELECT * FROM roles`);
            return result as RoleSchema[];
        } catch (error) {
            throw new Error(`Erreur lors de la récupération des rôles :  ${error.message}`);
        }
    },
    findById: async (id: number): Promise<RoleSchema | null> => {
        try {
            const result = await dbClient.query("SELECT * FROM roles WHERE id = ?", [id]);
            return result.length > 0 ? (result[0] as RoleSchema) : (null as null);
        } catch (error) {
            throw new Error(`Erreur lors de la récupération du rôle : ${error.message}`);
        }
    },
    checkIfNameExists: async (name: string): Promise<boolean> => {
        try {
            const existingRole = await dbClient.query(`SELECT * FROM roles WHERE name = ?`, [name]);
            return existingRole.length > 0;
        } catch (error) {
            throw new Error(`Erreur lors de la vérification de l'existence d'un rôle avec ce nom : ${error.message}`);
        }
    },
    create: async (data: RoleSchemaCreate): Promise<boolean> => {
        try {
            await dbClient.execute("INSERT INTO roles (name, created_at) VALUES (?, NOW())", [data.name]);

            return true;
        } catch (error) {
            throw new Error(`Erreur lors de la création du rôle : ${error.message}`);
        }
    },
    updateById: async (data: RoleSchemaUpdate): Promise<boolean> => {
        try {
            await dbClient.query("UPDATE roles SET name = ?, updated_at = NOW() WHERE id = ?", [data.name, data.id]);

            return true;
        } catch (error) {
            throw new Error(`Erreur lors de la mise à jour du rôle : ${error.message}`);
        }
    },
    deleteById: async (id: number): Promise<boolean> => {
        try {
            await dbClient.query("DELETE FROM roles WHERE id = ?", [id]);
            return true;
        } catch (error) {
            throw new Error(`Erreur lors de la suppression du rôle : ${error.message}`);
        }
    },
};

export default RoleService;
