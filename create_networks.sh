docker network create --driver bridge --attachable web4_keycloak_network
docker network create --driver bridge --attachable web4_user_network
docker network create --driver bridge --attachable web4_postgres_network
docker network create --driver bridge --attachable web4_coordinates_network
docker network create --driver bridge --attachable web4_gateway
