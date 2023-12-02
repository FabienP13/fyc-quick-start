import { Router } from "https://deno.land/x/oak/mod.ts";
import RoleController from "../controllers/roleController.ts";

const router = new Router();

router.get("/", RoleController.getAllRoles).post("/", RoleController.createRole).put("/:roleId", RoleController.updateRole).delete("/:roleId", RoleController.deleteRole);

export default router;
