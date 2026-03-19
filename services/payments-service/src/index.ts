import Fastify from "fastify";
import paymentRoutes from "./routes/payments.js";

const app = Fastify({ logger: true });

app.get("/health", async () => {
  return { status: "ok", service: "payments-service" };
});

app.register(paymentRoutes);

const start = async () => {
  try {
    await app.listen({ port: 3000, host: "0.0.0.0" });
  } catch (err) {
    app.log.error(err);
    process.exit(1);
  }
};

start();