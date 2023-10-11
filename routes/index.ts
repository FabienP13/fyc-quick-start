import { Router } from "https://deno.land/x/oak/mod.ts";

const router = new Router();
router
    .get("/", (context) => {
        context.response.body = "The server is alive! 🚀";
    })
    .get("/hello", (context) => {
        context.response.body = "Hello DenoFan ! 🚀";
    });

export default router;
