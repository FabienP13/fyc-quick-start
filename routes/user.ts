import { Router } from "https://deno.land/x/oak/mod.ts";
import UserController from "../controllers/userController.ts";

const router = new Router();
router
    .get("/", UserController.getAllUsers)
    .get("/:userId", UserController.getUserById)
    .post("/", UserController.createUser)
    .put("/:userId/roles", UserController.updateUserRole)
    .put("/:id/info", UserController.updateUserInfo)
    .put("/:id/wallet", UserController.updateUserWallet);

export default router;
