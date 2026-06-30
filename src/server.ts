import app from "./app";
import { env } from "./config/env";
import { db } from "./database/db";

async function startServer() {
  try {
    await db.query("SELECT 1");

    console.log("✅ Connected to MySQL");

    app.listen(env.port, () => {
      console.log(`🚀 Server running on port ${env.port}`);
    });
  } catch (error) {
    console.error("❌ Failed to connect to MySQL");
    console.error(error);

    process.exit(1);
  }
}

startServer();
