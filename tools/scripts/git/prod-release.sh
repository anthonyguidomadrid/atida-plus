#!/usr/bin/env bash

set -o errexit
set -o nounset
set -o pipefail

main() {
    if [ "$(git status -uno --porcelain)" ]; then
        echo "You have un-committed changes, please stash them and then run 'make release-prod' again."
        exit 1
    fi

    echo "Please provide the release version (e.g 2.7.0)"
    read -r releaseVersion

    confirmAuthorisation
    updateMasterBranch "${releaseVersion}"
    tagRelease "${releaseVersion}"
    pushToRemote
}

function confirmAuthorisation() {
    echo "Have you received authorisation from the product owner for this release? (Y/N)"

    read -r confirmation

    if [[ "${confirmation}" != "Y" && "${confirmation}" != "y" ]]; then
        echo "Please seek authorisation from the product owner that this release is ready for production."
        exit 1
    fi
}

function updateMasterBranch() {
    local RELEASE_VERSION="$1"
    git checkout "release/${RELEASE_VERSION}"
    git pull --ff-only origin "release/${RELEASE_VERSION}"

    git checkout master
    git pull --ff-only origin master

    git merge --ff-only "release/${RELEASE_VERSION}"
}

function pushToRemote() {
    echo "Confirm ready to push to remote master branch? (Y/N)"
    read -r pushToRemote

    if [[ "${pushToRemote}" != "Y" && "${pushToRemote}" != "y" ]]; then
        echo "Command exiting - if changes further required, make these and manually commit and push to the remote."
        exit 1
    fi

    git push origin master --no-verify
}

function tagRelease() {
    local RELEASE_VERSION="$1"
    git tag "$RELEASE_VERSION"
    git push origin "$RELEASE_VERSION" --no-verify
}

main
