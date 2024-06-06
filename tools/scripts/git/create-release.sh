#!/usr/bin/env bash

set -e

TYPE=$1

php tools/scripts/git/create-release-branch.php "$TYPE"
