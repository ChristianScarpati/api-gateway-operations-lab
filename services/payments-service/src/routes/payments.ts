import type { FastifyInstance } from "fastify";
import { payments, type Payment } from "../data/payment.js";
import { authenticate, requireAdmin } from "../auth.js";

export default async function paymentRoutes(app: FastifyInstance) {
  app.post(
    "/payments",
    { preHandler: [authenticate, requireAdmin] },
    async (request, reply) => {
      const body = request.body as {
        customerId?: string;
        amount?: number;
        currency?: string;
      };

      if (!body?.customerId || body.amount === undefined || !body?.currency) {
        return reply.status(400).send({
          error: "Bad Request",
          message: "customerId, amount and currency are required",
        });
      }

      if (typeof body.customerId !== "string") {
        return reply.status(400).send({
          error: "Bad Request",
          message: "customerId must be a string",
        });
      }

      if (typeof body.amount !== "number") {
        return reply.status(400).send({
          error: "Bad Request",
          message: "amount must be a number",
        });
      }

      if (body.amount <= 0) {
        return reply.status(400).send({
          error: "Bad Request",
          message: "amount must be greater than 0",
        });
      }

      if (typeof body.currency !== "string" || body.currency.trim().length !== 3) {
        return reply.status(400).send({
          error: "Bad Request",
          message: "currency must be a 3-letter string",
        });
      }

      const payment: Payment = {
        id: String(payments.length + 1),
        customerId: body.customerId,
        amount: body.amount,
        currency: body.currency.toUpperCase(),
        status: "created",
      };

      payments.push(payment);

      return reply.status(201).send(payment);
    }
  );

  app.get("/payments/:id", { preHandler: authenticate }, async (request, reply) => {
    const { id } = request.params as { id: string };
    const payment = payments.find((p) => p.id === id);

    if (!payment) {
      return reply.status(404).send({
        error: "Not Found",
        message: `payment with id ${id} not found`,
      });
    }

    return payment;
  });
}