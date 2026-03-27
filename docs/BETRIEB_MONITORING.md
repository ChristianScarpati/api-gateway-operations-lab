# Betrieb und Monitoring

## Ziel
Diese Demo-Plattform zeigt grundlegende Betriebsfähigkeit für eine API-Gateway-basierte Service-Landschaft.

## Verfügbare Endpunkte
- /health
- /ready
- /metrics

## Monitoring
- Prometheus sammelt Metriken aus allen Services.
- Grafana dient zur Visualisierung einfacher Betriebskennzahlen.

## Logging
- Die Backend-Services nutzen strukturiertes Logging über Fastify.
- Das Gateway erzeugt Access Logs über Traefik.

## Typische Prüfschritte
- Erreichbarkeit über den Gateway prüfen
- Health- und Readiness-Endpunkte prüfen
- Metriken in Prometheus kontrollieren
- Logs der betroffenen Services analysieren