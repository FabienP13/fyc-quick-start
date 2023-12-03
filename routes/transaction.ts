import { Router } from "https://deno.land/x/oak/mod.ts";
import TransactionController from "../controllers/transactionController.ts";
const router = new Router();

router.get("/", TransactionController.getAllTransactions).get("/users/:userId", TransactionController.getTransactionByUserId).post("/", TransactionController.createTransaction);

export default router;
