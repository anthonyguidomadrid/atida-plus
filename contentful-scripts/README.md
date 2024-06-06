# Contentful Scripts

## Installation

### Pre-requisites

* Node: 16.17.0
* Npm: 8.15.0

### Env variables
Add your `.env.local` with the following:
```
CMS_SPACE_ID=Contentful Space ID
CMS_DEFAULT_COUNTER_ID=Entry ID of the Migration Counter
CMS_DEFAULT_COUNTER_LOCALE=Locale of the field used for Migrations ("en-GB")
CMS_DEFAULT_FIXTURE_ID=Entry ID of the Fixture Counter
CMS_DEFAULT_COUNTER_LOCALE=Locale of the field used for Fixtures ("pt-PT")
CMS_LOCALE_DEFAULT=Default locale of the Space ("en-GB")
CMS_LOCALE_USED_LIST=Locale(s) used for the content displayed - ie: "de-DE,de-AT"
CMS_MANAGEMENT_TOKEN=CMA Token
CMS_DELIVERY_TOKEN=CDA Token
```
If you don't have a CMA and/or a CDA token you should generate one in Contentful Web App (on `master` environment). From 'Settings > API Keys > Content Management Token'.

### Install necessary packages
To install the needed packages inside the `contentful-script` folder, just run:

```shell
$ npm install
```

You can verify the integrity of the Contentful helper scripts by running:

```shell
$ npm run test
```

And you also have the linter enable

```shell
$ npm run lint
$ npm run lint-fix
```

## Run migrations
Apply latest migration to a destination environment.
```shell
$ node scripts/apply-migrations.js --to "<environment>"
```

### Additional options
* `--force-yes` / Default behavior of the Migration script is to ask confirmation for each migration that has to be applied. This option will apply the migrations without asking confirmation. **Note: useful for integration with CI**
* `--counter-entry-id  "<entry-id>"` / Each Contentful environment has a Counter Entry (Translation CT with value as ID of the latest migration). This option override that Entry ID if the feature environment you are working on doesn't have the Counter entry - the entry needs to be created manually.

```shell
$ node scripts/apply-migrations.js --to "<environment>" (--force-yes) (--counter-entry-id  "<entry-id>")
```

### Notes
The migrations should follow the naming conventions as follow:
* 4 digit unique and progressive number, with leading zeros. Ie: `0012`
* Dash (`-`) sign as separation
* The ticket number. Ie: `PLUS-1234`
* Further, dash separation and a description of the migration
* `cjs` extension (instead of just `js`)

Example: `0012-PLUS-1234-Adding-new-filed-to-Promotion-Content-type.cjs`

## Run Fixtures
Apply latest migration to a destination environment.
```shell
$ node scripts/fixture-importer.js --to "<environment>"
```

### Notes
The migrations should follow the naming conventions as follow:
* 6 digit unique and progressive number, with leading zeros. Ie: `000012`
* Dash (`-`) sign as separation
* The ticket number. Ie: `PLUS-1234`
* Further, dash separation and a description of the migration
* `csv` extension

Example: `000005-PLUS-1108-New-translations-for-login.csv`

* The file content should have the following format, `content-type.field-id` separated by ','
* And optionally can contain the locale: en-GB default, pt-PT, es-ES
* Rememeber that all the mandatory field should be filled when creating an entry
* A 'sys.tags' fields is necessary to enable the entry for a country

An example, for content-type `translation` would be:
    - translation.key: String (Entry name)
    - translation.value.en-GB: String (Entry translation for en-GB contry)
    - translation.value.en-PT: String (Entry translation for en-PT contry)
    - translation.value.en-ES: String (Entry translation for en-ES contry)
    - translation.complete: Boolean "true"/"false" (Field to mark if all the values for every country are completed)
    - sys.tags: String (Tags for the entry, if there are more than one, they must be concatenated with '|', example "country-pt|country-es")

## Export Environment
Export all the data from an environment. By default, the data exported will include entries in all statuses (also drafts and archived) and will not include native Contentful assets.

```shell
$ node scripts/export-env.js --from "<environment>"
```

### Additional options
* `--only-published` / It will include only Published entries and exclude Drafts and Archived entries.
* `--include-assets` / It will download all the Contentful assets in a folder. Both the exported JSON, and the folder will be then compressed into a ZIP file.
* `--verbose` / It will display the progress line by line (instead of progression bars). This is useful for CI.
* `--destination-folder "path/to/folder"` / Customised destination folder in which files will be saved. This is useful for CI.

```shell
$ node scripts/export-env.js --from "<environment>" (--only-published) (--include-assets) (--verbose) (--destination-folder "path/to/folder")
```

## Sync Environments
Sync the data between 2 environments

```shell
$ node scripts/sync-env.js --from "<environment>" --to "<environment>"
```

### Additional options
* `--exclude-ct "category, page"` / It excludes specific Content-types from the sync
* `--only-insert` / Only insert newer entries (do not update existing one)
* `--verbose` / It will display more logging information. It can be added a verbosity level like `--verbose 2` for more detailed logging.
* `--ignore-counter` / Ignore the migration counter of the two environments (WARNING: this can break the sync)
* `--dry-run` / Only shows the main summary, but do not perform the actual sync
* `--save-db-in` / It allows to specify the path, optionally with filename of the SQLite DB file
* `--include-assets` / Include Assets in the Sync between the two environments
* `--only-published` / Only sync the published valid entries from the FROM environment

```shell
$ node scripts/sync-env.js --from "<environment>" --to "<environment>" (--verbose 1|2) (--dry-run) (--only-insert) (--exclude-ct "category, page") (--ignore-counter) (--save-db-in="./path/file.db") (--include-assets) (--only-published)
```

## Sync Environments across Spaces

```shell
$ node scripts/sync-space.js --from "<environment>" --to-config ".env.local-XX" --to "<environment>" --tags "country-xx"
```

### Additional options
* `--from` / The source environment. The source 'space' is taken from `.env.local`
* `--to-config` / Additional `.env.local-XX` to retrieve the destination Space ID and CMA Token
* `--to` / The destination environment.
* `--tags` / The country tag with which the destination entries should be tagged.
* `--verbose` / It will display more logging information. It can be added a verbosity level like `--verbose 2` for more detailed logging.
* `--ignore-counter` / Ignore the migration counter of the two environments (WARNING: this can break the sync)
* `--dry-run` / Only shows the main summary, but do not perform the actual sync
* `--only-published` / Only sync the published valid entries from the FROM environment

```shell
node scripts/sync-space.js --from "dev" --to-config ".env.local-DE" --to "dev" --verbose 2 --ignore-counter --tags "country-de" --only-published
```

### Notes
* 'promotion' Content-type is excluded
* Native Contentful Assets will be excluded

## Show environments differences
Shows the Content-type differences between two environments. If `--ct` param is present, it will check only that content-type.

```shell
$ node diff-between-envs.js --from "<environment1>" --to "<environment2>" --ct "<categoryId>"
```

The `--from` parameter references the environment with the new changes. The `--to` environment represents the environment in which we want to apply the changes.

Ex: a new contentType is created for a new feature in the `PLUS-XXXX` env and we want to show the changes (or migration) needed for `dev` to look like `PLUS-XXXX` then we would:

```shell
$ node diff-between-envs.js --from "PLUS-XXXX" --to "dev" --ct "<newContentType>"
```

The difference is shown in prompt and also exported to a `results.txt` document by default. It is possible to assign a different name with `--filename` parameter.

### Additional options
* `--migration"` / It creates a migration .cjs file reflecting the changes
* `--migrationFile` / Name of the migration file, `migration` is used by default. It is adviced to follow the naming conventions for migrations `XXXX-PLUS-XXXX-Add-new-content-type-for-awesome-feature` (`.cjs` extension will be appended automatically)

## Release Scripts
Helps to manage environments during release process

### Duplicate master
This command takes the latest `master` environment and duplicates it with the environment name passed as parameter.
```shell
$ node scripts/release.js --duplicate-master --to "release-X.Y.Z"
```

### Link release to master
This command creates the alias from `master` to the `release-X.Y.Z` environment, unlinking `master` from the previous release.
```shell
$ node scripts/release.js --link-master --to "release-X.Y.Z" (--delete-old-releases) (--force-yes)
```

#### Additional options
* `--delete-old-releases` / Deletes the old releases. For example if you create a new `release-1.3.0`, but `release-1.2.0` and `release-1.1.0` exists, only the 1.1.0 will be deleted. It asks confirmation to delete the environments.
* `--force-yes` / Works together with the delete-old-releases. It overrides the confirmation, and delete all the old releases. This should only be used in CI.

### Sync Scheduled actions
This command sync the scheduled-actions between the previous release branch and the new master environment.
```shell
node scripts/release.js --sync-scheduling --from "release-X.Y.K"
```

### Sync Master Promos
This command sync the promotions created during deployment on the old 'release' branch. This is to ensure the newly created
release branch contains the promotions from the old one meanwhile the deployment was running (~10 minutes).

```shell
node scripts/release.js --sync-current-master --from "release-X.Y.K"
```

#### Note:
Naming convention on Contentful for release environments is:
* `release` lowercase
* `X.Y.Z` major, minor, hotfix number - same as the FE release branch/tag
* `X.Y.K` Identify the previous release, if `X.Y.Z` is **2.10.5**, then `X.Y.K` is **2.10.4**

## Add Country Tags
It allows tagging Entries of specific content-types in Contentful.

```shell
$ node scripts/add-country-tag.js --to "environment" --tag "country-es" --content-type "brand" (--linked-pages)
```

#### Additional options
* `--linked-pages` / It tags linked pages to the entries selected. This is needed for Brands or Categories, to then display the pages for ES shop.


## General CSV Importer

```shell
$ node scripts/csv-importer.js --from "path/to/file.csv" --to "<environment>" (--separator ";" --start-from "primary-id" --link-entries "page>promotion>translation")
```

### Note:

The `--link-entries` allows to follow a specific path, so that the matching entry and the data to be changed
are of different content-types. We use two characters:
* `A>B` means that the entry of content-type A has a linked-entry of content-type B
* `A<B` means that the entry of content-type A is linked by an entry of content-type B

We can combine the information, to have a specific path:
* `brand<page>seo`, means to retrieve the page that links the brand, and then the seo linked in the page
* `page>promotion>translation`, it's two levels deep in the linked entries, from page to promotion to translation
* `link<menuItem<menu`, means to select a menu entry, from its children menu item that contains a specific link


### How the CSV should be built

* The first column needs to have header as `CONTENT_TYPE.sys.id` if we want to use the Contentful Entry-id or `CONTENT_TYPE.primary.FIELD(.LOCALE)` (example: `brand.primary.id.pt-PT`) if we want to look up by Content (localised);
* The other columns need to follow the standard Contentful convention `CONTENT_TYPE.fields.FIELD(.LOCALE)`, like `promotion.fields.title.en-GB` or simply `promotion.fields.title` (`en-GB` is default);
* The script will use the first column to find the entry, and all the other columns to update the values;
* The lookup for the primary key works better with unique and mandatory fields (like brand IDs), but it's suitable also for normal text match, like titles or labels;
* If possible it's always better to use the lookup primary key on the `en-GB` locale;
* A field (like title) can be in both the primary key lookup and the fields to be updated.

[comment]: <> (## General CSV Exporter)
[comment]: <> (```shell)
[comment]: <> ($ node scripts/csv-exporter.js --from "<environment>" --to "path/to/file.csv" --content-type "brand" &#40;--fields "id,title,description"&#41; --entry-ids "xxx1,yyy2")
[comment]: <> (```)

## Set Locale
Set locale in a given environment. It can be run manually, which will require input from the user, or it can be run in CI mode.
It reads the locale files in the locales folder (`/scripts/locales`), and also checks the existing locales in the target environment. Those selected by the user (or all if run in CI mode) and existing in the target environment, will be skipped. If they don't exist in the target environment, the script will create them.

```shell
$ node scripts/set-locale --env "<environmentId>" (--ci)
```

### Additional options
When adding the `--ci` parameter, the script won't display the selection menu and it will try to create all the locales existing in the locale folder.

#### Note:
If a given local already existing in an environment needs to be updated, there are 2 possible ways to achieve this:
1. Update the locale directly in the environment and reflect the change in the code base.
2. Delete the locale in the environment, modify the locale in the codebase and then run the script against the environment.

_If we think that it could be an interesting option, we could add another argument to update existing locales._

## Calculate a page query cost

Get the complexity/cost of a GraphQL query for fetching a page from Contentful. Basically in the script, we fetch a page (you can specify a slug, if not it's going to fetch the **homepage** as default) given an environment (by default it's going to be fetch from **dev** but you can also specify another one). Also you can provide a content blocks limit (it's **20** by default).

```shell
$ node scripts/calculate-contentful-page-query (--from "<environmentId>") (--locale "<locale>") (--page "<pageSlug>") (--limit <contentBlocksLimit>)
```
