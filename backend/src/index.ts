import "dotenv/config";
import Fastify from "fastify";

import { registerApiVesselRoutes } from "./api/vessels";
import { ingestVesselsData } from "./ingest/vessels";

const port = 3000; 
const host = "0.0.0.0";

async function main() {
  // Create Fastify instance
  const fastify = Fastify({
    logger: true,
  });

  ingestVesselsData();

  await fastify.register(registerApiVesselRoutes, { prefix: "/api" });

  // Start server
  try {
    await fastify.listen({ port: port, host: host});
    fastify.log.info("API server running at http://localhost:3000/");
  } catch (err) {
    fastify.log.error(err);
    process.exit(1);
  }

  // Graceful shutdown (Ctrl+C, Docker stop)
  process.on("SIGINT", async () => {
    fastify.log.info("Shutting down...");
    await fastify.close();
    process.exit(0);
  });
}

main();
