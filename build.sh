#!/bin/bash
set -euo pipefail

export DOCKER_BUILDKIT=1

# Build the compile stage:
docker build --target node \
       --cache-from=falco/falco-front:compile-stage \
       --tag falco/falco-front:compile-stage .

# Build the runtime stage, using cached compile stage:
docker build --target backend \
       --cache-from=falco/falco-front:compile-stage \
       --cache-from=falco/falco:latest \
       --tag falco/falco:latest .

docker tag falco/falco:latest registry.heroku.com/falco-nicolasgo/web
