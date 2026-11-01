#!/bin/sh
set -eu
cd /opt/prisma
node ./node_modules/prisma/build/index.js migrate deploy
cd /app
exec node server.js
