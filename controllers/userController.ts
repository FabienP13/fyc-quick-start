import dbClient from "../connectDb.ts";
import { Context } from "https://deno.land/x/oak/mod.ts";

const UserController = {
    async getAllUsers(ctx: Context) {
        const users = await dbClient.query(`SELECT * FROM users`);
        ctx.response.body = JSON.stringify(users);
    },
    async createUser(ctx: Context) {
        const data = {
            firstName: "Fabien",
            lastName: "Poncet",
            email: "fponcet@gmail.com",
            password: "password",
            account: 29,
            isCdu: false,
            cduAcceptedAt: null,
            roleId: 2,
        };
        const response = await dbClient.query(
            "INSERT INTO users (first_name, last_name, email, password, account, is_cdu, cdu_accepted_at, register_at, role_id) VALUES (?, ?, ?, ?, ?, ?, ?, NOW(), ?)",
            [data.firstName, data.lastName, data.email, data.password, data.account, data.isCdu, data.cduAcceptedAt, data.roleId]
        );
        ctx.response.body = response;
    },
};

export default UserController;
