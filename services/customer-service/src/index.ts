import Fastify from "fastify";
import customerRoutes from "./routes/customers.js";
import client from "prom-client";

const app = Fastify({ logger: true });

const register = new client.Registry();
client.collectDefaultMetrics({ register });

const httpRequests = new client.Counter({
  name: "app_http_requests_total",
  help: "Total number of HTTP requests",
  labelNames: ["service", "method", "route", "statusCode"] as const,
});

register.registerMetric(httpRequests);

app.addHook("onResponse", async (request, reply) => {
  httpRequests.inc({
    service: "customer-service",
    method: request.method,
    route: request.routeOptions.url || request.url,
    statusCode: String(reply.statusCode),
  });
});

app.get("/metrics", async (_request, reply) => {
  reply.header("Content-Type", register.contentType);
  return register.metrics();
});

app.get("/health", async () => {
  return { status: "ok", service: "customer-service" };
});

app.get("/ready", async () => {
  return { status: "ready", service: "customer-service" };
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