CREATE USER user_user WITH PASSWORD 'user_password';
CREATE USER coordinat_user WITH PASSWORD 'coordinat_password';

GRANT ALL PRIVILEGES ON DATABASE users TO user_user;
GRANT ALL PRIVILEGES ON DATABASE coordinates TO coordinat_user;

\c users
GRANT CONNECT ON DATABASE coordinates TO user_user;
GRANT USAGE ON SCHEMA public TO user_user;
GRANT SELECT ON ALL TABLES IN SCHEMA public TO user_user;
ALTER DEFAULT PRIVILEGES IN SCHEMA public GRANT SELECT ON TABLES TO user_user;
ALTER ROLE user_user SET search_path TO users;

\c coordinates
GRANT CONNECT ON DATABASE users TO coordinat_user;
GRANT USAGE ON SCHEMA public TO coordinat_user;
GRANT SELECT ON ALL TABLES IN SCHEMA public TO coordinat_user;
ALTER DEFAULT PRIVILEGES IN SCHEMA public GRANT SELECT ON TABLES TO coordinat_user;
ALTER ROLE coordinat_user SET search_path TO coordinates;
