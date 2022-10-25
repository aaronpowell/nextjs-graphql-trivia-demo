#!/usr/bin/env bash

set -euxo pipefail

ipAddress=https://$(docker inspect $(docker ps -f "name=cosmos-nextjs-graphql-swa" -q)  -f '{{range .NetworkSettings.Networks}}{{.IPAddress}}{{end}}'):8081

# Try to get the emulator cert in a loop
until sudo curl -ksf "${ipAddress}/_explorer/emulator.pem" -o '/usr/local/share/ca-certificates/emulator.crt'; do
  echo "Downloading cert from $ipAddress"
  sleep 1
done

sudo update-ca-certificates

if [ ! -f .env.local ]
then
  echo COSMOS_ENDPOINT=$ipAddress > ./.env.local
  echo COSMOS_KEY=C2y6yDjf5/R+ob0N8A7Cgv30VRDJIWEHLM+4QDU5DE2nQ9nDuVTqobD4b8mGGyPMbIZnqyMsEcaGQy67XIw/Jw== > ./.env.local
  echo COSMOS_DATABASE_ID=trivia > ./.env.local
  echo COSMOS_CONTAINER_ID=questions > ./.env.local
fi
