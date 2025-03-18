CREATE DATABASE keycloak;

CREATE USER keycloak WITH ENCRYPTED PASSWORD 'keycloak_password';
GRANT ALL PRIVILEGES ON DATABASE keycloak TO keycloak;

\connect keycloak

GRANT USAGE, CREATE ON SCHEMA public TO keycloak;