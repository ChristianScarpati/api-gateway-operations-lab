# Security

## Current scope
This demo implements simple token-based authentication and basic role-based authorization.

## Roles
- admin
- user

## Protected endpoints
- /customers/*
- /payments/*
- POST /payments requires admin role

## Notes
This is a demo-oriented implementation and does not yet include:
- real JWT signing
- token expiration
- refresh tokens
- external identity provider