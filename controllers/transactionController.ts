import { Context } from "https://deno.land/x/oak/mod.ts";
import TransactionService from "../services/transactionService.ts";
import { TransactionSchemaCreate } from "../schema/transactionsSchema.ts";

const TransactionController = {
    async getAllTransactions(ctx: Context) {
        try {
            const transactions = await TransactionService.findAll();
            ctx.response.status = 200;
            ctx.response.body = transactions;
        } catch (error) {
            ctx.response.status = 500;
            ctx.response.body = { error: "Erreur survenue dans la méthode getAllTransactions." };
        }
    },

    async getTransactionByUserId(ctx: Context) {
        try {
            const userId = ctx.params.userId;

            if (!userId) {
                ctx.response.status = 400;
                ctx.response.body = { error: "ID de l'utilisateur manquant dans les paramètres de l'URL" };
                return;
            }

            const result = await TransactionService.findByUserId(parseInt(userId));
            if (!result) {
                ctx.response.status = 404;
                ctx.response.body = { error: "Transactions non trouvées" };
                return;
            }

            ctx.response.status = 200;
            ctx.response.body = result;
        } catch (error) {
            ctx.response.status = 500;
            ctx.response.body = { error: "Erreur survenue dans la méthode getTransactionByUserId." };
        }
    },

    async createTransaction(ctx: Context) {
        try {
            const data: TransactionSchemaCreate = await ctx.request.body().value;
            const result = await TransactionService.create(data);
            ctx.response.status = 201;
            ctx.response.body = result;
        } catch (error) {
            ctx.response.status = 500;
            ctx.response.body = { error: "Erreur survenue dans la méthode createTransaction." };
        }
    },
};

export default TransactionController;
