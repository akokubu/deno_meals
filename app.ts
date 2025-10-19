import { Application } from "./deps.ts";
import { router } from "./router.ts";

console.log("=== app.ts start ===");

const app = new Application();
console.log("Application instance created");

app.use(async (ctx, next) => {
  console.log("Middleware start"); // ここまで到達しているか
  try {
    await next();
  } catch (e) {
    console.error("Error in middleware:", e.message);
    ctx.response.status = 500;
    ctx.response.body = { message: e.message };
  }
});

app.use(router.routes());
console.log("Router registered");

export { app };
