import { Router } from "https://deno.land/x/oak/mod.ts";
import UserController from "../controllers/userController.ts";

const router = new Router();
router.get("/all", UserController.getAllUsers)
.get("/:id", UserController.getUserById)
.post("/create", UserController.createUser)
.delete("/:id", UserController.deleteUser)
.put("/:id/role", UserController.updateUserRole)
.put("/:id/info", UserController.updateUserInfo)
.put("/:id/account", UserController.updateUserAccount);

export default router;
