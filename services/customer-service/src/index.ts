import Fastify from "fastify";
import customerRoutes from "./routes/routes.js";

const app = Fastify({ logger: true });

app.get("/health", async () => {
  return { status: "ok", service: "auth-service" };
});

app.register(customerRoutes);

const start = async () => {
  try {
    await app.listen({ port: 3000, host: "0.0.0.0" });
  } catch (err) {
    app.log.error(err);
    process.exit(1);
  }
};

start();