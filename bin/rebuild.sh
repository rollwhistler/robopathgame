#!/bin/bash

set -e

SCRIPT_DIR="$( cd "$( dirname "${BASH_SOURCE[0]}" )" && pwd )"

# rebuild containers
${SCRIPT_DIR}/down.sh
${SCRIPT_DIR}/up.sh

# allow database to start up
sleep 10

# rebuild sdk and restart client to ensure it detects new files
${SCRIPT_DIR}/npm-server.sh run sdk
${SCRIPT_DIR}/restart.sh client

# Migrate the database
${SCRIPT_DIR}/npm-server.sh run migrate up
${SCRIPT_DIR}/npm-server.sh run migrate up:test

# Run the e2e tests
${SCRIPT_DIR}/e2e.sh