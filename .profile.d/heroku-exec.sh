#!/usr/bin/env bash

# see https://devcenter.heroku.com/articles/exec#enabling-docker-support
[ -z "$SSH_CLIENT" ] && source <(curl --fail --retry 3 -sSL "$HEROKU_EXEC_URL")