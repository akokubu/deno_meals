import { app } from "./app.ts";

console.log("=== main.ts start ===");

console.log(`PORT ${Deno.env.get("PORT")}`);
const port = Number(Deno.env.get("PORT")) || 8081;
console.log(`Setting up the server on port ${port}`);

app
  .listen({ port, hostname: "0.0.0.0" })
  .then(() => console.log("Server started successfully"))
  .catch((e) => console.error("Server failed to start:", e));

console.log("app.listen() called (non-blocking)");

setTimeout(() => {
  console.log("=== Tick: 3秒経過 ===");
}, 3000);
