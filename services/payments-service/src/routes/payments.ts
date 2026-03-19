import type { FastifyInstance } from "fastify";
import { payments, type Payment } from "../data/payment.js";

export default async function paymentRoutes(app: FastifyInstance) {
  app.post("/payments", async (request, reply) => {
    const body = request.body as {
      customerId?: string;
      amount?: number;
      currency?: string;
    };

    if (!body?.customerId || !body?.amount || !body?.currency) {
      return reply.status(400).send({
        error: "Bad Request",
        message: "customerId, amount and currency are required",
      });
    }

    if (body.amount <= 0) {
      return reply.status(400).send({
        error: "Bad Request",
        message: "amount must be greater than 0",
      });
    }

    const payment: Payment = {
      id: String(payments.length + 1),
      customerId: body.customerId,
      amount: body.amount,
      currency: body.currency,
      status: "created",
    };

    payments.push(payment);

    return reply.status(201).send(payment);
  });

  app.get("/payments/:id", async (request, reply) => {
    const { id } = request.params as { id: string };
    const payment = payments.find((payment) => payment.id === id);

    if (!payment) {
      return reply.status(404).send({
        error: "Not Found",
        message: `payment with id ${id} not found`,
      });
    }

    return payment;
  });
}