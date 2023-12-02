import { Context } from "https://deno.land/x/oak/mod.ts";
import UserService from "../services/userService.ts";
import { UserSchemaWalletUpdate, UserSchemaCreate, UserSchemaInfoUpdate, UserSchemaRoleUpdate } from "../schema/usersSchema.ts";

const UserController = {
    async getAllUsers(ctx: Context) {
        try {
            const users = await UserService.findAll();
            ctx.response.status = 200;
            ctx.response.body = users;
        } catch (error) {
            ctx.response.status = 500;
            ctx.response.body = { error: "Erreur survenue dans la méthode getAllUsers." };
        }
    },
    async getUserById(ctx: Context) {
        try {
            const userId = ctx.params.userId;

            const result = await UserService.findById(parseInt(userId));
            if (!result) {
                ctx.response.status = 404;
                ctx.response.body = { error: "Utilisateur non trouvé." };
                return;
            }

            ctx.response.status = 200;
            ctx.response.body = result;
        } catch (error) {
            ctx.response.status = 500;
            ctx.response.body = { error: "Erreur survenue dans la méthode getUserById." };
        }
    },
    async createUser(ctx: Context) {
        try {
            const data: UserSchemaCreate = await ctx.request.body().value;

            // Vérification si l'e-mail existe déjà
            const existingUser = await UserService.findByEmail(data.email);

            if (existingUser) {
                ctx.response.status = 400;
                ctx.response.body = {
                    error: "Cet email est déjà associée à un utilisateur",
                };
                return;
            }

            const result = await UserService.create(data);
            ctx.response.status = 201;
            ctx.response.body = data; // renvoi true
        } catch (error) {
            ctx.response.status = 500;
            ctx.response.body = { error: "Erreur survenue dans la méthode createUser." };
        }
    },

    async updateUserInfo(ctx: Context) {
        try {
            const userId = ctx.params.id;

            const data: UserSchemaInfoUpdate = await ctx.request.body().value;
            data.id = parseInt(userId);

            const existingUser = await UserService.findById(parseInt(userId));

            if (!existingUser) {
                ctx.response.status = 404;
                ctx.response.body = { error: "Utilisateur non trouvé" };
                return;
            }

            const result = await UserService.updateUserInfoById(data);

            ctx.response.status = 200;
            ctx.response.body = result;
        } catch (error) {
            ctx.response.status = 500;
            ctx.response.body = { error: "Erreur survenue dans la méthode updateUserInfo." };
        }
    },
    async updateUserRole(ctx: Context) {
        try {
            const userId = ctx.params.userId;

            const data: UserSchemaRoleUpdate = await ctx.request.body().value;
            data.id = parseInt(userId);

            const existingUser = await UserService.findById(parseInt(userId));

            if (!existingUser) {
                ctx.response.status = 404;
                ctx.response.body = { error: "Utilisateur non trouvé" };
                return;
            }

            const result = await UserService.updateUserRoleById(data);

            if (!result) {
                ctx.response.status = 400;
                ctx.response.body = { error: "Aucune donnée mise à jour fournie" };
                return;
            }
            ctx.response.status = 200;
            ctx.response.body = result;
        } catch (error) {
            ctx.response.status = 500;
            ctx.response.body = { error: "Erreur survenue dans la méthode updateUserRole." };
        }
    },
    async updateUserWallet(ctx: Context) {
        try {
            const userId = ctx.params.id;

            const data: UserSchemaWalletUpdate = await ctx.request.body().value;
            data.id = parseInt(userId);

            const existingUser = await UserService.findById(parseInt(userId));

            if (!existingUser) {
                ctx.response.status = 404;
                ctx.response.body = { error: "Utilisateur non trouvé" };
                return;
            }

            const result = await UserService.updateUserWalletById(data);

            ctx.response.status = 200;
            ctx.response.body = result;
        } catch (error) {
            ctx.response.status = 500;
            ctx.response.body = { error: "Erreur survenue dans la méthode updateUserWallet." };
        }
    },
};

export default UserController;
