import { Router } from "https://deno.land/x/oak/mod.ts";
import SharePriceController from "../controllers/sharePriceController.ts";

const router = new Router();

router
    .get("/", SharePriceController.getAllSharePrices)
    .get("/:sharePriceId", SharePriceController.getSharePriceById)
    .post("/", SharePriceController.createSharePrice)
    .put("/:sharePriceId", SharePriceController.updateSharePrice);

export default router;
