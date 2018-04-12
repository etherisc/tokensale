#!/bin/sh

./node_modules/.bin/truffle-flattener ./contracts/tokensale/DipTge.sol >> ./verification/DipTge.txt
./node_modules/.bin/truffle-flattener ./contracts/tokensale/VestedTokens.sol >> ./verification/VestedTokens.txt
./node_modules/.bin/truffle-flattener ./contracts/Migrations.sol >> ./verification/Migrations.txt
./node_modules/.bin/truffle-flattener ./contracts/token/DipToken.sol >> ./verification/DipToken.txt
