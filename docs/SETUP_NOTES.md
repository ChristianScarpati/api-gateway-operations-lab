# Setup Notes

## Initial decisions
- Traefik chosen as API gateway for simple routing and container integration.
- Fastify chosen for backend services due to lightweight setup.
- Docker Compose chosen for local operational simulation.

## Issues found
- Port conflicts
- Missing tsconfig options
- Docker build cache problems

## Day 2
- Implemented initial REST endpoints for auth, customer and payments services.
- Added mock login flow.
- Added customer listing and lookup.
- Added payment creation and retrieval.
- Standardized JSON responses and basic error handling.
