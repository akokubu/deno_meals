import { postgres } from "./deps.ts";

const config: postgres.ClientOptions = {
  password: Deno.env.get("PASSWORD"),
  port: Deno.env.get("DB_PORT"),
  hostname: Deno.env.get("HOST_NAME"),
  user: Deno.env.get("DB_USER"),
  database: Deno.env.get("DATABASE"),
  tls: {
    enabled: false,
  },
};

try {
  const pool = new postgres.Pool(config, 2, true);
  console.log("Pool created successfully");

  // 簡単な接続テスト
  const client = await pool.connect();
  console.log("Connected to database");
  client.release();
} catch (e) {
  console.error("Failed to create Pool or connect:", e);
}

console.log("=== Pool Config ===");
console.log(JSON.stringify(config, null, 2));

const pool = new postgres.Pool(config, 2, true);
console.log("Pool created successfully");

export async function getConnection(): Promise<postgres.PoolClient> {
  return await pool.connect();
}

export const TABLE_NAME = Deno.env.get("TABLE_NAME") || "meals";

export async function createTable() {
  const conn = await getConnection();
  try {
    await conn.queryObject(`
      
CREATE TABLE IF NOT EXISTS ${TABLE_NAME} (
  id SERIAL PRIMARY KEY,
  name varchar(20) NOT NULL,
  protein int NOT NULL,
  fat int NOT NULL,
  carbo int NOT NULL,
  calorie int NOT NULL,
  created_at timestamp default CURRENT_TIMESTAMP
)
`);
  } finally {
    conn.release();
  }
}

export async function withConnection<T>(
  run: (conn: postgres.PoolClient) => Promise<T>
): Promise<T> {
  const conn = await getConnection();
  try {
    return await run(conn);
  } finally {
    conn.release();
  }
}
