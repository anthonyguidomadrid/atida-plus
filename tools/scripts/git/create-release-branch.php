<?php

namespace OLP\Scripts\Git {

    require __DIR__ . '/../../changelog/scripts/util.php';

    use function OLP\Changelog\updateChangelog;

    if ($argc === 2 && $argv[1] === 'hotfix') {
        createHotfixRelease();
    } else {
        createRelease();
    }

    function createHotfixRelease()
    {
        if (exec('git checkout master', $output, $result) && (int)$result !== 0) {
            echo 'Could not checkout master. You may have uncommitted changes in your current branch.' . PHP_EOL;
            exit(1);
        }

        shell_exec('git pull --ff-only origin master');

        $currentVersion = getLastTag();
        $currentVersion[2]++;

        $nextReleaseVersion = implode('.', $currentVersion);

        shell_exec(sprintf('git checkout -b release/%s', $nextReleaseVersion));
    }

    function createRelease()
    {
        if (exec('git checkout develop', $output, $result) && (int)$result !== 0) {
            echo 'Could not checkout develop. You may have uncommitted changes in your current branch.' . PHP_EOL;
            exit(1);
        }

        if (exec('git pull --ff-only origin develop', $output, $result) && (int)$result !== 0) {
            echo 'Could not pull from remote develop branch.';
            exit(1);
        }

        $currentVersion = getLastTag();
        $currentVersion[1]++;
        $currentVersion[2] = 0;

        $nextReleaseVersion = implode('.', $currentVersion);

        if (exec(sprintf('git checkout -b release/%s', $nextReleaseVersion), $output, $result) && (int)$result !== 0) {
            echo 'Could not checkout a new release branch';
            exit(1);
        }

        updateChangelog($nextReleaseVersion);
    }

    function getLastTag(): array
    {
        shell_exec('git fetch --all');

        $latestTag = shell_exec('git describe --tags $(git rev-list --tags --max-count=1)');

        if (is_null($latestTag)) {
            echo 'Could not fetch latest version tag.' . PHP_EOL;
            exit(1);
        }

        $currentVersion = explode('.', $latestTag);

        if (!count($currentVersion) === 3) {
            echo 'Invalid release version format.' . PHP_EOL;
            exit(1);
        }

        return array_map('trim', $currentVersion);
    }

    return 0;
}
