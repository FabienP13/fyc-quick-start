import dbClient from "../connectDb.ts";
import { UserSchema, UserSchemaCreate, UserSchemaAccountUpdate, UserSchemaInfoUpdate, UserSchemaRoleUpdate } from "../schema/usersSchema.ts";

const UserService = {
    findAll: async (): Promise<UserSchema[]> => {
        try {
            const result = await dbClient.query(`SELECT * FROM users`);
            return result as UserSchema[];
        } catch (error) {
            throw new Error(`Error while fetching all users: ${error.message}`);
        }
    },
    findById: async (id: number): Promise<UserSchema | null> => {
        try {
            const result = await dbClient.query("SELECT * FROM users WHERE id = ?", [id]);
            return result.length > 0 ? (result[0] as UserSchema) : (null as null);
        } catch (error) {
            throw new Error(`Error while fetching user by Id: ${error.message}`);
        }
    },
    findByEmail: async (email: string): Promise<UserSchema | null> => {
        try {
            const result = await dbClient.query("SELECT * FROM users WHERE email = ?", [email]);
            return result.length > 0 ? (result[0] as UserSchema) : (null as null);
        } catch (error) {
            throw new Error(`Error while fetching user by Email: ${error.message}`);
        }
    },
    create: async (data: UserSchemaCreate): Promise<boolean> => {
        try {
            await dbClient.query("INSERT INTO users (first_name, last_name, email, password, account, is_cdu, cdu_accepted_at, register_at, role_id) VALUES (?, ?, ?, ?, ?, ?, ?, NOW(), ?)", [
                data.firstName,
                data.lastName,
                data.email,
                data.password,
                data.account,
                data.isCdu,
                data.cduAcceptedAt,
                data.roleId,
            ]);
            return true;
        } catch (error) {
            throw new Error(`Error while creating user: ${error.message}`);
        }
    },
};
export default UserService;
