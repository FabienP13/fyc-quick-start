import { Context } from "https://deno.land/x/oak/mod.ts";
import SharePriceService from "../services/sharePriceService.ts";
import { SharePriceSchemaCreate, SharePriceSchemaUpdate } from "../schema/sharePricesSchema.ts";

const SharePriceController = {
    async getAllSharePrices(ctx: Context) {
        try {
            const sharePrices = await SharePriceService.findAll();
            ctx.response.status = 200;
            ctx.response.body = sharePrices;
        } catch (error) {
            ctx.response.status = 500;
            ctx.response.body = { error: "Erreur survenue dans la méthode getAllSharePrices." };
        }
    },

    async getSharePriceById(ctx: Context) {
        try {
            const sharePriceId = ctx.params.sharePriceId;

            if (!sharePriceId) {
                ctx.response.status = 400;
                ctx.response.body = { error: "ID de l'action manquant dans les paramètres de l'URL" };
                return;
            }

            const result = await SharePriceService.findById(parseInt(sharePriceId));
            if (!result) {
                ctx.response.status = 404;
                ctx.response.body = { error: "Actions non trouvé" };
                return;
            }

            ctx.response.status = 200;
            ctx.response.body = result;
        } catch (error) {
            ctx.response.status = 500;
            ctx.response.body = { error: "Erreur survenue dans la méthode getSharePriceById." };
        }
    },

    async createSharePrice(ctx: Context) {
        try {
            const data: SharePriceSchemaCreate = await ctx.request.body().value;

            const nameExists = await SharePriceService.checkIfNameNotExists(data.name);
            if (nameExists) {
                ctx.response.status = 400;
                ctx.response.body = { error: "Ce nom d'action est déjà utilisé" };
                return;
            }

            const result = await SharePriceService.create(data);
            ctx.response.status = 201;
            ctx.response.body = result;
        } catch (error) {
            ctx.response.status = 500;
            ctx.response.body = { error: "Erreur survenue dans la méthode createSharePrice." };
        }
    },

    async updateSharePrice(ctx: Context) {
        try {
            const sharePriceId = ctx.params.sharePriceId;

            if (!sharePriceId) {
                ctx.response.status = 400;
                ctx.response.body = { error: "ID de l'action manquant dans les paramètres de l'URL" };
                return;
            }

            const data: SharePriceSchemaUpdate = await ctx.request.body().value;
            data.id = parseInt(sharePriceId);

            const nameExists = await SharePriceService.checkIfNameNotExists(data.name);
            if (nameExists) {
                ctx.response.status = 400;
                ctx.response.body = { error: "Ce nom d'action est déjà utilisé" };
                return;
            }

            const existingSharePrice = await SharePriceService.findById(data.id);
            if (!existingSharePrice) {
                ctx.response.status = 404;
                ctx.response.body = { error: "Action non trouvée" };
                return;
            }

            const result = await SharePriceService.updateById(data);
            ctx.response.status = 200;
            ctx.response.body = result;
        } catch (error) {
            ctx.response.status = 500;
            ctx.response.body = { error: "Erreur survenue dans la méthode updateSharePrice." };
        }
    },
};

export default SharePriceController;
