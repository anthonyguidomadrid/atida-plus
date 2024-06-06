# Release Process for Contentful


Before starting this process, check the [Readme](README.md) for installing the right node packages and set up the environment variables.

## Deploying to UAT

The scripts that need to run for UAT (or even DEV) related deployment are very simple:
1. Backup before deployment

```shell
cd contentful-scripts/
node scripts/export-env.js --from "uat"
```

2. Migrations after deployment

```shell
cd contentful-scripts/
node scripts/apply-migrations.js --to "uat" --force-yes
```

The `--force-yes` flag can be omitted, in that case you will be asked to confirm running each migration.

## Deploying to Production

Deploying to production is a little more complex, since it involves more steps.

1. Before Deployment

We are going to do a backup and duplicate the current master as the **new release environment**. Then we apply the migrations on top of it.

```shell
cd contentful-scripts/
node scripts/export-env.js --from "master"
node scripts/release.js --duplicate-master --to "release-X.Y.Z"
node scripts/apply-migrations.js --to "release-X.Y.Z" --force-yes
```
Where `release-X.Y.Z` follows the `<releaseNumber>` naming convention.

2. After Deployment

After the Production deployment, we need to link the newest release environment back to master.

```shell
cd contentful-scripts/
node scripts/release.js --link-master --to "release-X.Y.Z" --delete-old-releases --force-yes
node scripts/export-env.js --from "master"
```

3. Sync master <-> uat (optional)

Optionally we could sync back the data from the Contentful 'master' environment to 'uat' environment. It's better to do a dry-run first and inspect that the syncing will perform as expected.

```shell
cd contentful-scripts/
node scripts/export-env.js --from "uat"
node scripts/sync-env.js --from "master" --to "uat" --verbose --dry-run
node scripts/sync-env.js --from "master" --to "uat" --verbose 2
```

The `--verbose` flag supports multiple levels of verbosity:
- 1 (default)
- 2 for more details on entries
- 3 for individual entry actions (update, publish, etc.)
