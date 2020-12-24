#!/bin/bash

echo What should the version be?
read VERSION

docker build -t hengfelix/bloom:$VERSION .
docker push hengfelix/bloom:$VERSION
ssh root@46.101.180.173 "docker pull hengfelix/bloom:$VERSION && docker tag hengfelix/bloom:$VERSION dokku/api:$VERSION && dokku deploy api $VERSION"