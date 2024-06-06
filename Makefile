SHELL := /bin/bash

# Some useful variables...

ERROR   := "   \033[41;1m error \033[0m "
INFO    := "    \033[34;1m info \033[0m "
OK      := "      \033[32;1m ok \033[0m "
WARNING := " \033[33;1m warning \033[0m "

# Task: help | show this help message.
# {
.PHONY: help
help:
	@echo
	@echo -e '\033[33mUsage:\033[0m'
	@echo '  make <target> [--] [<command>...] [options]'
	@echo
	@echo -e '\033[33mTargets:\033[0m'
	@egrep '^# Task: ([a-z-]+) \| (.+)$$' Makefile | awk -F '[:|]' '{print " \033[32m"$$2"\033[0m" "|" $$3}' | column -t -s '|'
	@echo
# }

# Task: changelog-updates | gets new entries to add to the changelog by scanning the tools/changelog directory
# {
.PHONY: changelog-updates
changelog-updates:
	@php tools/changelog/scripts/changelog-updates.php
# }

# Task: release | creates a new release branch
# {
.PHONY: release
release:
	@bash tools/scripts/git/create-release.sh
# }

# Task: release-hotfix | creates a new hotfix branch
# {
.PHONY: release-hotfix
release-hotfix:
	@bash tools/scripts/git/create-release.sh hotfix
# }

# Task: release-prod | updates master with the latest release, creates the next tag and pushes the tag and master
# {
.PHONY: release-prod
release-prod:
	@bash tools/scripts/git/prod-release.sh
# }
