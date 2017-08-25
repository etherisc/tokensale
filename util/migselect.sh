#!/bin/bash

#
#	Select migrations to be used.
#
#

pushd migrations
rm *

#
#	Comment/uncomment desired migrations:
#
ln -s ../migrations-available/1_initial_migration.js 1_initial_migration.js
ln -s ../migrations-available/2_deploy_contracts.js 2_deploy_contracts.js

#
#	List selected migrations
#
ls -alF
popd
