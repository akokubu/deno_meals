import { app } from "./app.ts";

console.log("=== main.ts start ===");

const port = 8080;
console.log(`Setting up the server on localhost:${port}`);

try {
  await app.listen({ port: port, hostname: "0.0.0.0" });
  console.log("Server started successfully");
} catch (e) {
  console.error("Server failed to start:", e);
}
