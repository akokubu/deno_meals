import { app } from "./app.ts";

console.log("=== main.ts start ===");

// const port = 8080;
// console.log(`Setting up the server on port ${port}`);

const port = Number(Deno.env.get("PORT")) || 8080;
console.log(`Setting up the server on port ${port}`);

await app.listen({ port, hostname: "0.0.0.0" });

setTimeout(() => {
  console.log("=== Tick: 3秒経過 ===");
}, 3000);

try {
  app
    .listen({ port, hostname: "0.0.0.0" })
    .then(() => console.log("Server started successfully"))
    .catch((e) => console.error("Server failed to start:", e));

  console.log("app.listen() called (non-blocking)");
} catch (e) {
  console.error("Error calling app.listen:", e);
}
