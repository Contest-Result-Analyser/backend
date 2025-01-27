#!/bin/sh

STAGE=${1:-prod}

npm run migrate:$STAGE
npm run start:$STAGE