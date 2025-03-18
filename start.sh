#!/bin/sh

echo preparing networks...
sh prepare.sh 1>&2 2>/dev/null
docker network list

echo preparing config...
CURRENT_PATH=$(pwd)
DEV_PATH="$CURRENT_PATH/env/dev"
echo using env path: "$DEV_PATH"
export CONFIG_BASE_PATH="$DEV_PATH"

# starting postgres
echo starting postgres
cd ./service/postgres && make && cd $CURRENT_PATH
sleep 5
echo postgres started!

# starting keycloak
echo starting keycloak
cd ./service/keycloak && make && cd $CURRENT_PATH
sleep 10
echo keycloak started!

# starting other components
cd api && make && cd $CURRENT_PATH

sleep 5
docker ps
echo all services started successfully!
