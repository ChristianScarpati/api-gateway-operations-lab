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

        if (body.username === "admin" && body.password === "secret") {
            return {
                accessToken: "demo-admin-token",
                tokenType: "Bearer",
                user: {
                    id: "u-1",
                    username: "admin",
                    role: "admin",
                },
            };
        }

        if (body.username === "user" && body.password === "secret") {
            return {
                accessToken: "demo-user-token",
                tokenType: "Bearer",
                user: {
                    id: "u-2",
                    username: "user",
                    role: "user",
                },
            };
        }

        return reply.status(401).send({
            error: "Unauthorized",
            message: "invalid credentials",
        });
    });
}