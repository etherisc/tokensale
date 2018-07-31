#!/bin/sh

truffle-flattener ./contracts/Migrations.sol > ./verification/Migrations.txt
truffle-flattener ./contracts/tokensale/DipTge.sol > ./verification/DipTge.txt
truffle-flattener ./contracts/token/DipToken.sol > ./verification/DipToken.txt
truffle-flattener ./contracts/rscconversion/RSCConversion.sol > ./verification/RSCConversion.txt
