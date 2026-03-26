import Fastify from "fastify";
import customerRoutes from "./routes/customers.js";

const app = Fastify({ logger: true });

app.get("/health", async () => {
  return { status: "ok", service: "customer-service" };
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

app.setNotFoundHandler((request, reply) => {
  reply.status(404).send({
    error: "Not Found",
    message: `route ${request.method} ${request.url} not found`,
    service: "customer-service"
  });
});

start();