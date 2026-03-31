# Operations Guide

## Overview
This project is a small enterprise-style API platform demo designed to showcase:
- API Gateway operations
- service lifecycle thinking
- REST/HTTP-based services
- authentication and authorization
- validation and data quality checks
- observability and troubleshooting
- containerized local deployment

The platform includes:
- Traefik as API Gateway
- auth-service
- customer-service
- payments-service
- PostgreSQL
- Prometheus
- Grafana

---

## How to Run the Application

From the root of the project:

```bash
docker compose up --build
```

To stop the application:

```bash
docker compose down
```

to inspect logs:

```bash
docker compose logs
```

To inspect running containers:

```bash
docker compose ps
```

To rebuild from scratch:

```bash
docker compose down
docker compose down --build
```

---

Main URLs
API Gateway

Base entry point:

http://localhost

Traefik Dashboard

http://localhost:8080/dashboard/

Prometheus

http://localhost:9090

Grafana

http://localhost:3001

Grafana default credentials:

username: admin
password: admin
Service Routes
Auth Service
Health: http://localhost/auth/health
Readiness: http://localhost/auth/ready
Metrics: http://localhost/auth/metrics
Login: http://localhost/auth/login
Customer Service
Health: http://localhost/customers/health
Readiness: http://localhost/customers/ready
Metrics: http://localhost/customers/metrics
List customers: http://localhost/customers/customers
Get customer by ID: http://localhost/customers/customers/1
Payments Service
Health: http://localhost/payments/health
Readiness: http://localhost/payments/ready
Metrics: http://localhost/payments/metrics
Create payment: http://localhost/payments/payments
Get payment by ID: http://localhost/payments/payments/1

Example Requests
Login as admin

curl -X POST http://localhost/auth/login \
  -H "Content-Type: application/json" \
  -d '{"username":"admin","password":"secret"}'


Login as user

curl -X POST http://localhost/auth/login \
  -H "Content-Type: application/json" \
  -d '{"username":"user","password":"secret"}'


Get customers

curl -X GET http://localhost/customers/customers \
  -H "Authorization: Bearer <token>"


Get customer by ID

curl -X GET http://localhost/customers/customers/1 \
  -H "Authorization: Bearer <token>"


Create payment as Admin

curl -X POST http://localhost/payments/payments \
  -H "Authorization: Bearer demo-admin-token" \
  -H "Content-Type: application/json" \
  -d '{"amount":100,"currency":"EUR"}'


Get payment by ID

curl -X GET http://localhost/payments/payments/1 \
  -H "Authorization: Bearer demo-admin-token"


Monitoring
Prometheus

Open:
http://localhost:9090

Example metric to inspect:
app_http_requests_total

Grafana

Open:
http://localhost:3001

Add Prometheus as a data source using:
http://prometheus:9090

Recommended starter panels:

total requests
requests by service
requests by status code

## Logs

### Gateway Logs

```bash
docker compose logs -f traefik
```

### Auth Service Logs

```bash
docker compose logs -f auth-service
```

### Customer Service Logs

```bash
docker compose logs -f customer-service
```

### Payments Service Logs

```bash
docker compose logs -f payments-service
```

### Prometheus Logs

```bash
docker compose logs -f prometheus
```

### Grafana Logs

```bash
docker compose logs -f grafana
```

## Service Management

Stop payments-service

```bash
docker compose stop payments-service
```

Start payments-service

```bash
docker compose start payments-service
```

Restart payments-service

```bash
docker compose restart payments-service
```
# Security Model

## Current security scope:

mock login endpoint
bearer token authentication
role-based access
admin and user roles
payment creation restricted to admin
protected customer and payment endpoints

This demo does not yet include:

signed JWTs
token expiration
refresh tokens
external identity provider integration

---

## Health and Readiness

All services expose health endpoints:
- `GET /health`
- `GET /ready`

Traefik exposes:
- `GET /health`
- `GET /ready`
- `GET /metrics`

---

## Troubleshooting

### Common Issues

1. **Service not reachable**
   - Check `docker compose ps` to ensure all containers are running
   - Verify Traefik logs for routing issues
   - Check network connectivity between containers

2. **401 Unauthorized**
   - Ensure you're sending a valid JWT token in the Authorization header
   - Verify the token hasn't expired

3. **400 Bad Request**
   - Check the request payload for required fields
   - Validate data formats (e.g., amount > 0, valid currency)
   - Review service logs for specific validation errors

4. **502 Bad Gateway**
   - Verify the backend service is reachable
   - Check Traefik's routing configuration
   - Ensure the service port is correctly configured

---

## Development

### Adding a New Service

1. Create service directory under `services/`
2. Add Dockerfile and service code
3. Create Traefik labels in `docker-compose.yml`:
   ```yaml
   labels:
     - traefik.enable=true
     - traefik.http.routers.<service>.rule=PathPrefix(`/<service_path>`)
     - traefik.http.services.<service>.loadbalancer.server.port=<service_port>
   ```
4. Add health and readiness endpoints to the service
5. Update monitoring if needed

---
