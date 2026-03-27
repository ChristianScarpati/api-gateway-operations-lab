# Incident Runbook

## Incident 1: Unauthorized access
### Symptom
Request returns 401 Unauthorized.

### Possible causes
- Missing Authorization header
- Invalid bearer token
- Wrong token format

### Diagnosis
- Check request headers
- Review service logs
- Verify token value

### Resolution
- Send a valid bearer token
- Retry request with correct format

---

## Incident 2: Invalid payment payload
### Symptom
Payment creation returns 400 Bad Request.

### Possible causes
- Missing required fields
- amount <= 0
- invalid currency format

### Diagnosis
- Inspect request body
- Review validation error message
- Check logs in payments-service

### Resolution
- Correct payload fields
- Retry request

---

## Incident 3: Payments service unavailable
### Symptom
Gateway cannot reach payments-service.

### Possible causes
- Container stopped
- Service crash
- wrong routing target

### Diagnosis
- Run docker compose ps
- Check docker compose logs payments-service
- Check Traefik logs

### Resolution
- Restart payments-service
- verify docker network connectivity
- rebuild service if needed