import type { FastifyInstance } from "fastify";
import { customers } from "../data/customers.js";
import { authenticate } from "../auth.js";

export default async function customerRoutes(app: FastifyInstance) {
    app.get("/customers", { preHandler: authenticate }, async () => {
        return { items: customers, count: customers.length };
    });

    app.get("/customers/:id", { preHandler: authenticate }, async (request, reply) => {
        const { id } = request.params as { id: string };
        const customer = customers.find((c) => c.id === id);

        if (!customer) {
            return reply.status(404).send({
                error: "Not Found",
                message: `customer with id ${id} not found`,
            });
        }

        return customer;
    });
}