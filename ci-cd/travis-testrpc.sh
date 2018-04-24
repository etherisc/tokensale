#!/bin/bash

set -e
echo "Start Testrpc"
npm run testrpc > testrpc.log &

echo "Select resources"
npm run select-resources

echo "Start compiling"
npm run compile

echo "Start testing"
time npm run test

cat node_modules/zeppelin-solidity/package.json

ls node_modules/zeppelin-solidity/contracts/token
