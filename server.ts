import { Application, Router } from "https://deno.land/x/oak/mod.ts";
import { oakCors } from "https://deno.land/x/cors/mod.ts";
import userRouter from "./routes/user.ts";
import roleRouter from "./routes/role.ts";
import { config } from "https://deno.land/x/dotenv/mod.ts";

const env = config();
const { PORT, HOSTNAME } = env;

const app = new Application();
const router = new Router();

router.use("/user", userRouter.routes());
router.use("/role", roleRouter.routes());

app.use(router.routes());
app.use(router.allowedMethods());
app.use(oakCors({ origin: "*" }));

app.addEventListener("listen", ({ secure, hostname, port }) => {
    const protocol = secure ? "https://" : "http://";
    const url = `${protocol}${hostname ?? "localhost"}:${port}`;
    console.log(`Listening on: ${port}`);
});

const port = parseInt(PORT) || 8080;
await app.listen({ port, hostname: HOSTNAME || "localhost" });
