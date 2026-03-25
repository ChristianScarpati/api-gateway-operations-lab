# API Gateway

## Purpose
The API Gateway acts as the single entry point for all backend services.

## Responsibilities
- Request routing
- Path-based service dispatch
- Prefix stripping
- Centralized traffic entry
- Basic rate limiting
- Shared HTTP response headers

## Routes
- /auth -> auth-service
- /customers -> customer-service
- /payments -> payments-service

## Notes
The gateway is implemented with Traefik and configured through Docker labels.