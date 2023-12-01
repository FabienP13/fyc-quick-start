import dbClient from "../connectDb.ts";
import {
  UserSchema,
  UserSchemaAccountUpdate,
  UserSchemaCreate,
  UserSchemaInfoUpdate,
  UserSchemaRoleUpdate,
} from "../schema/usersSchema.ts";

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
      const result = await dbClient.query("SELECT * FROM users WHERE id = ?", [
        id,
      ]);
      return result.length > 0 ? (result[0] as UserSchema) : (null as null);
    } catch (error) {
      throw new Error(`Error while fetching user by Id: ${error.message}`);
    }
  },
  findByEmail: async (email: string): Promise<UserSchema | null> => {
    try {
      const result = await dbClient.query(
        "SELECT * FROM users WHERE email = ?",
        [email],
      );
      return result.length > 0 ? (result[0] as UserSchema) : (null as null);
    } catch (error) {
      throw new Error(`Error while fetching user by Email: ${error.message}`);
    }
  },
  create: async (data: UserSchemaCreate): Promise<boolean> => {
    try {
      await dbClient.query(
        "INSERT INTO users (first_name, last_name, email, password, account, is_cdu, cdu_accepted_at, register_at, role_id) VALUES (?, ?, ?, ?, ?, ?, ?, NOW(), ?)",
        [
          data.firstName,
          data.lastName,
          data.email,
          data.password,
          data.account,
          data.isCdu,
          data.cduAcceptedAt,
          data.roleId,
        ],
      );
      return true;
    } catch (error) {
      throw new Error(`Error while creating user: ${error.message}`);
    }
  },
  deleteById: async (id: number): Promise<boolean> => {
    try {
      await dbClient.query("DELETE FROM users WHERE id = ?", [id]);
      return true;
    } catch (error) {
      throw new Error(`Error while deleting user by Id: ${error.message}`);
    }
  },
  updateUserRoleById: async (data: UserSchemaRoleUpdate): Promise<boolean> => {
    try {
      await dbClient.query(
        "UPDATE users SET role_id = ?, updated_at = NOW() WHERE id = ?",
        [data.roleId, data.id],
      );
      return true;
    } catch (error) {
      throw new Error(`Error while updating user role by Id: ${error.message}`);
    }
  },
  updateUserInfoById: async (data: UserSchemaInfoUpdate): Promise<boolean> => {
    const updates: string[] = [];

    if (data.firstName) updates.push(`first_name = '${data.firstName}'`);
    if (data.lastName) updates.push(`last_name = '${data.lastName}'`);
    if (data.email) updates.push(`email = '${data.email}'`);

    if (updates.length === 0) {
      return false;
    }

    try {
      const updateString = updates.join(", ");
      await dbClient.query(
        `UPDATE users SET ${updateString}, updated_at = NOW() WHERE id = ?`,
        [data.id],
      );
      return true;
    } catch (error) {
      throw new Error(`Error while updating user info by Id: ${error.message}`);
    }
  },

  updateUserAccountById: async (
    data: UserSchemaAccountUpdate,
  ): Promise<boolean> => {
    try {
      await dbClient.query(
        "UPDATE users SET account = ?, updated_at = NOW() WHERE id = ?",
        [data.account, data.id],
      );
      return true;
    } catch (error) {
      throw new Error(
        `Error while updating user account by Id: ${error.message}`,
      );
    }
  },
};
export default UserService;
