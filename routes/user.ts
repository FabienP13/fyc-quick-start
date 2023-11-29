import { Router } from "https://deno.land/x/oak/mod.ts";
import UserController from "../controllers/userController.ts";

const router = new Router();
router.get("/all", UserController.getAllUsers);

router.post("/create", UserController.createUser);

export default router;
