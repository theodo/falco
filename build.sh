#!/bin/bash
set -euo pipefail

# Pull the latest version of the image, in order to
# populate the build cache:
# docker pull itamarst/helloworld:compile-stage || true
# docker pull itamarst/helloworld:latest        || true

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

# Push the new versions:
# docker push falco/falco-front:compile-stage
# docker push falco/falco:latest