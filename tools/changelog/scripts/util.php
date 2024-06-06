<?php

namespace OLP\Changelog {
    const CHANGELOG_PATH = __DIR__ . '/../../../CHANGELOG.md';
    const COMPARISON_URL_PATTERN = '[%s]: https://gitlab.com/atida/frontend/atida-plus/compare/%s...%s';

    const ENTRY_PATTERN = '* [%1$s](https://olp.atlassian.net/browse/%1$s) %2$s';
    const JQL_QUERY_PATTERN = 'project IN (PLUS) AND key IN (%s)';

    function updateChangelog(?string $nextReleaseVersion = null)
    {
        chdir(join(DIRECTORY_SEPARATOR, [__DIR__, '..', '..', '..']));

        $changelogSnippets = glob(join(DIRECTORY_SEPARATOR, ['tools', 'changelog', '*']));

        $changes = [];
        $keys = '';
        foreach ($changelogSnippets as $changelogSnippet) {
            if (is_dir($changelogSnippet)) {
                continue;
            }

            $ticketRef = basename($changelogSnippet);
            $changes[] = sprintf(ENTRY_PATTERN, $ticketRef, trim(file_get_contents($changelogSnippet)));
            $keys .= sprintf('%s,', $ticketRef);

            exec(sprintf('git rm %s', $changelogSnippet), $commandOutput, $commandReturn);

            if ($commandReturn === 0) {
                printf('Removed changelog snippet "%s" from git index.' . PHP_EOL, $changelogSnippet);
            } else {
                printf(
                    'Could not remove changelog snippet "%s" from git index, please check yourself.' . PHP_EOL,
                    $changelogSnippet
                );
            }
        }

        echo PHP_EOL;

        if (null !== $nextReleaseVersion) {
            if (count($changes) === 0) {
                echo 'No changes found.';
            } else {
                addNextReleaseLines($changes, $nextReleaseVersion);
                echo 'Changelog file has been updated automatically.';

                echo implode(PHP_EOL, $changes) . PHP_EOL;

                $ticketQuery = sprintf(JQL_QUERY_PATTERN, rtrim($keys, ','));
                printf(PHP_EOL . 'Ticket search: https://olp.atlassian.net/browse/PLUS-1?jql=%s', urlencode($ticketQuery));
            }
        }

        echo PHP_EOL;
    }

    function addNextReleaseLines(array $changeLines, string $nextReleaseVersion)
    {
        $lines = file(CHANGELOG_PATH);

        $linesToInsert = [];
        $positionToInsert = 0;
        foreach ($lines as $n => $line) {
            $line = trim($line);

            if (substr($line, 0, 2) === '##') {
                $linesToInsert = array_merge([
                    sprintf('## [%s]', $nextReleaseVersion),
                    ''
                ], $changeLines, ['']);

                $positionToInsert = $n;
                break;
            }
        }

        array_splice($lines, $positionToInsert, 0, $linesToInsert);
        $lines = addComparisonLink($lines, $nextReleaseVersion);
        $lines[] = '';
        file_put_contents(CHANGELOG_PATH, join("\n", array_map('trim', $lines)));
    }

    function addComparisonLink(array $lines, string $nextReleaseVersion): array
    {
        $lastComparison = trim($lines[count($lines) - 1]);

        preg_match('/\[(\d+\.\d+\.\d+)\]/', $lastComparison, $version);

        $lastVersion = $version[1];

        $lines[] = sprintf(COMPARISON_URL_PATTERN, $nextReleaseVersion, $lastVersion, $nextReleaseVersion);

        return $lines;
    }
}
