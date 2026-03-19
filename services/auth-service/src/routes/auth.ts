import type { FastifyInstance } from "fastify";

export default async function authRoutes(app: FastifyInstance) {
    app.post("/login", async (request, reply) => {
        const body = request.body as { username?: string; password?: string };

        if (!body?.username || !body?.password) {
            return reply.status(400).send({
                error: "Bad Request",
                message: "username and password are required",
            });
        }

        return {
            token: "demo-jwt-token",
            user: {
                id: "u-1",
                username: body.username,
                role: "admin",
            },
        };
    });
}