#!/bin/bash

set -e
echo "Neuer Versuch"
npm run testrpc > testrpc.log &

echo "Select resources"
npm run select-resources

echo "Start compiling"
npm run compile

echo "Start testing"
time npm run test
