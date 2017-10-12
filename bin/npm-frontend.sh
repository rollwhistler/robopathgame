#!/bin/bash

SCRIPT_DIR="$( cd "$( dirname "${BASH_SOURCE[0]}" )" && pwd )"
ROOT_DIR=$(cd ${SCRIPT_DIR}/..; pwd)

CMD="npm $@"

docker run --rm -v ${ROOT_DIR}/frontend:/usr/src/app -u node bluerose/docker-node bash -c "${CMD}"
