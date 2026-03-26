import type { FastifyReply, FastifyRequest } from "fastify";

type DemoUser = {
    id: string;
    username: string;
    role: "admin" | "user";
};

declare module "fastify" {
    interface FastifyRequest {
        user?: DemoUser;
    }
}

export async function authenticate(request: FastifyRequest, reply: FastifyReply) {
    const authHeader = request.headers.authorization;

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
        return reply.status(401).send({
            error: "Unauthorized",
            message: "missing or invalid authorization header",
        });
    }

    const token = authHeader.replace("Bearer ", "").trim();

    if (token === "demo-admin-token") {
        request.user = { id: "u-1", username: "admin", role: "admin" };
        return;
    }

    if (token === "demo-user-token") {
        request.user = { id: "u-2", username: "user", role: "user" };
        return;
    }

    return reply.status(401).send({
        error: "Unauthorized",
        message: "invalid token",
    });
}

export async function requireAdmin(request: FastifyRequest, reply: FastifyReply) {
    if (request.user?.role !== "admin") {
        return reply.status(403).send({
            error: "Forbidden",
            message: "admin role required",
        });
    }
}