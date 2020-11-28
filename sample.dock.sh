#!/usr/bin/env bash
tag=$(git rev-parse --abbrev-ref HEAD)
echo $tag
docker build -t xxx/xxx:$tag
docker run --env-file .env -p 80:5000 -it xxx/xxx:$tag