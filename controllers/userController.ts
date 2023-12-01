import { Context } from "https://deno.land/x/oak/mod.ts";
import UserService from "../services/userService.ts";
import { UserSchemaCreate, UserSchemaRoleUpdate, UserSchemaInfoUpdate, UserSchemaAccountUpdate } from "../schema/usersSchema.ts";

const UserController = {
    async getAllUsers(ctx: Context) {
        try {
            const users = await UserService.findAll();
            ctx.response.status = 200;
            ctx.response.body = users;
        } catch (error) {
            console.error("Error in getAllUsers method:", error);
            ctx.response.status = 500;
            ctx.response.body = { error: "Internal server error" };
        }
    },
    async getUserById(ctx: Context) {
        try {
            const userId = ctx.params.id;

            const result = await UserService.findById(parseInt(userId));
            if (!result) {
                ctx.response.status = 404;
                ctx.response.body = { error: "Utilisateur non trouvé" };
                return;
            }

            ctx.response.status = 200;
            ctx.response.body = result;
        } catch (error) {
            console.error("Error in getUserById method:", error);
            ctx.response.status = 500;
            ctx.response.body = { error: "Internal server error" };
        }
    },
    async createUser(ctx: Context) {
        try {
            const data: UserSchemaCreate = await ctx.request.body().value;

            // Vérification si l'e-mail existe déjà
            const existingUser = await UserService.findByEmail(data.email);

            if (existingUser) {
                ctx.response.status = 400;
                ctx.response.body = { error: "Cet email est déjà associée à un utilisateur" };
                return;
            }

            const result = await UserService.create(data);
            ctx.response.status = 201;
            ctx.response.body = data; // renvoi true
        } catch (error) {
            console.error("Error in createUser method:", error);
            ctx.response.status = 500;
            ctx.response.body = { error: "Internal server error" };
        }
    },
    // async createUser(ctx: Context) {
    // const data = {
    //     firstName: "Fabien",
    //     lastName: "Poncet",
    //     email: "fponcet@gmail.com",
    //     password: "password",
    //     account: 29,
    //     isCdu: false,
    //     cduAcceptedAt: null,
    //     roleId: 2,
    // };
    //     const response = await dbClient.query(
    //         "INSERT INTO users (first_name, last_name, email, password, account, is_cdu, cdu_accepted_at, register_at, role_id) VALUES (?, ?, ?, ?, ?, ?, ?, NOW(), ?)",
    //         [data.firstName, data.lastName, data.email, data.password, data.account, data.isCdu, data.cduAcceptedAt, data.roleId]
    //     );
    //     ctx.response.body = response;
    // },
};

export default UserController;
