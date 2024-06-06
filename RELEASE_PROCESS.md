# Release Process

Before starting this process, check [Atida Plus release branches] for any in-progress release branches. Remove the outdated ones.

## Creating the Release Branch

1. Run `make release` (or `make release-hotfix` if doing a patch release).
1. The changelog will be automatically updated. Please check you are happy with the changes.
   - If you have created a hotfix release then the changelog _does not_ get automatically updated. **Please do this manually after cherry-picking in the relevant commits**. See [Adding additional work to the release](#adding-additional-work-to-the-release) section below
   - Check the newly generated changelog for any possible duplicates with previous releases and remove them from the new release list
1. Check the to-be-released tickets on the [Atida Plus Jira Board] and co-ordinate any dependencies of tickets with the release manager(s) for other repos (Spryker, Akeneo).
   - Also check if there are tickets that aren't [Atida Plus] related due to be deployed, such as Payment Service, Notification Consumer etc.
   - If there are non Atida Plus merge requests to release, check with the developer to see what order things should be deployed
1. Open the release tickets in Jira using the generated changelog and make sure they all have
   - `[FE]` prefix in their title
   - `next-release`, `FE` and at least one `%team-name%` label on them
   - Current release Fix version number assigned to them (ask Jira admin, if no release fix version was yet created)
   - `FE` Component assigned to them
1. Commit the changelog update, and the removal of any changelog files (they should appear in the `git status` output):
   ```bash
   git add -p CHANGELOG.md
   git commit -m 'MISC Update changelog for the <releaseNumber> release'
   ```
1. Push the resulting release branch to GitLab:
   ```bash
   git push origin -u HEAD --no-verify
   ```
1. Once pushed to GitLab, there will be a pipeline waiting for us to trigger the `uat-deploy` step for the release branch. Check the [Atida Plus pipelines] view for a pipeline for the release branch.
1. Send a message to the **#atidaplus-dev** channel in Slack:
   ```
   :pika-dance: Atida Plus Front End Release <releaseNumber> created. The tickets in the release:
   — <List of the tickets from the changelog>
   If you are aware of any interdependencies with other repos, feature flags, migrations etc, please let the release management team know.
   ```
1. Open the board with `next-release` filter applied and communicate with people in charge of the tickets that have not yet reached RTD UAT column.
1. Wait for all the tickets to reach the RTD UAT column. Be ready to cherry pick any additional work using the [Adding additional work to the release](#adding-additional-work-to-the-release) section below.
1. Once ready to deploy to UAT, send a message to the **#atidaplus-dev** channel in Slack:
   ```
   :rotating_light: Atida Plus Front End Release <releaseNumber> deploy to UAT started :rotating_light:
   ```
1. If not ran automatically, run the pre-deploy action for `Contentful` - see [Deploying to UAT](contentful-scripts/RELEASE_PROCESS.md)
1. Click the Trigger button for the release branch's `uat-deploy` task in GitLab. This will trigger a release branch deployment for [Atida Plus]. You can see the progress of the `uat-deploy` job by clicking through to it.
1. Once confirmed that the deployment to [UAT] has happened and was successful, check that it is working as it should be, and check that the environment contains the changes of the tickets that have been deployed.
1. Send a message to the **#atidaplus-dev** channel in Slack:
   ```
   :rotating_light: Atida Plus Front End Release <releaseNumber> deploy to UAT complete :rotating_light:
   ```
1. Move the appropriate tickets on board [Atida Plus Jira Board] from RTD UAT to RF UAT.
1. Share all the Jira links for tickets in the release in the **#atidaplus-dev** Slack channel.
   - This should be the `CHANGELOG.md` entries plus any non Atida Plus tickets such as Payment Service, Notification Consumer etc.

## Adding additional work to the release

Sometimes, we may want to add more work to the release after it was created. We can do this by identifying the commit(s) of the work we want to bring in. The tickets in question should have both `next-release` and `to-cherry-pick` labels on them.

Go to [Develop commits] to figure out the sequence in which the associated commits were merged. Consider using [Regex Search] extension when looking for multiple ticket numbers on the page. Use `XXXX|YYYY|ZZZZ` as a ticket numbers search query. Note down each commit SHA starting with the oldest one and all the way up to the newest. This would be the sequence in which you will be applying them during the next step.

Then do the following:

```bash
git remote update
git checkout release/<releaseNumber>
git cherry-pick <commit-hash-of-work>
```

Any conflicts during cherry-picking may indicate that your current commit depends on another previously merged commit. If an investigation done with git blame/git lens confirms it, this work might need to be added to the release. Check the status of the associated ticket and if it has reached RTD UAT, include it into the release by noting down its SHA and restarting the cherry-picking process in the updated order (abort the previously started cherry-picking session with `git cherry-pick --abort`). Make sure to add any new related changelogs.

An alternative to updating the changelog is running `make changelog-updates`. If there are changes output to your terminal then add them to the `CHANGELOG.md` file and commit them.

Run `yarn verify` locally and make sure no errors are reported.

Now push the release branch which will trigger a deployment and let the Product Owner know when this is complete:

```bash
git push origin release/<releaseNumber> --no-verify
```

## Releasing To Production

1. Don't start the production release after `15:30 CET` on Monday-Thursday and after `12:00 CET` on Friday.
1. Get authorisation from the Product Owner(s) to deploy the release branch to production. If they have explicitly asked you to do it, continue.
   - NOTE: You, as a release manager, should also approve the release - if for any reason you are not happy for it to be deployed to production (e.g. risky ticket, performance issue etc.) then let the POs know and take necessary action to resolve the problem by discussing with the team lead.
1. Run `make release-prod`
1. The command will ask you for the release number, and to confirm you have authorisation from the Product Owner(s) to proceed.
1. The command will create a tag for the release version and automatically push this to the remote repository. See the [Notes](#notes) section below if you have any errors.
1. The command will prompt you to confirm it can push the changes in master to the remote. If you are not ready to push, the command will exit, and you will have to manually push the branch.
1. Merge `master` into `develop`
   ```bash
   git checkout develop
   git pull origin develop
   git merge master
   git push origin develop --no-verify
   ```
1. Once pushed to GitLab, there will be a pipeline waiting for us to trigger the prod-deploy step for the master branch. Check the [Atida Plus pipelines] view for a pipeline for the master branch. Wait for your pipeline to finish the automatic part and stop on the first manually triggered step before proceeding.
1. Check the to-be-released tickets on the board [Atida Plus Jira Board].
   - Make sure anything you depend on is already in production
   - If there are non-front-end merge requests to release, feature flags to take into account etc., check with the developer to see what order things should be deployed in
1. Send an announcement message to the **#atidaplus-dev** channel in Slack:
   ```
   :rotating_light: Atida Plus Front End & Contentful Release <releaseNumber> deploy to production started :rotating_light:
   ```
1. If not ran automatically, run the pre-deploy action for `Contentful` - see [Deploying to Production - Before Deployment](contentful-scripts/RELEASE_PROCESS.md)
1. If there are no objections raised after sending the Slack announcement message, click the Trigger button for the master branch's `prod-deploy` task in GitLab. This will trigger a `master` branch deployment for [Atida Plus]. You can see the progress of the `prod-deploy` job by clicking through to it.
1. Once confirmed that the deployment to the [PROD environment] happened and was successful, check that it contains the functionality included into the release and is working as it should be.
1. If not ran automatically, run the `post-deploy` action and optionally the sync for `Contentful` - see [Deploying to Production - After Deployment/Sync](contentful-scripts/RELEASE_PROCESS.md)
1. Send a message to the **#atidaplus-dev** channel in Slack:
   ```
   :rotating_light: Atida Plus Front End & Contentful Release <releaseNumber> deploy to production complete :rotating_light:
   ```
1. Ask a Product Owner(s) to move the appropriate tickets on the board [Atida Plus Jira Board] from RT Validate to Done and mark the release information on the ticket correctly.
1. Flag the release in SpeedCurve to keep track of the Lighthouse Scores. Follow the instructions in [Flag FE Release in SpeedCurve](https://olp.atlassian.net/wiki/spaces/ATIDA/pages/2414575617/Flag+FE+Release+in+SpeedCurve).
1. Update [Release notes] on wiki
1. Delete the old release branch by going to [Release branches] list or executing
   ```bash
   git branch -D release/<releaseNumber>
   git push origin :release/<releaseNumber> --no-verify
   ```
1. Find out who the next release manager is and let them know to create the next release.

## 'Expedite' Release
In cases in which our Production environment is down/broken, we have a special 'Expedite' release. The conditions for using the Expedite release are:
* There should not be any Contentful migration
* It is not possible to fix the problem rapidly by using the 'Hotfix' release process
* It needs to be deployed directly on Prod and optionally on UAT (no DEV)

The procedure to create an Expedite release is quite straightforward.

1. Create the expedite branch. At the moment you'll need to use a short name (like in the example 'fix-promotions') instead of a release number.
  ```bash
  git fetch --all
  git checkout master
  git pull origin master
  git checkout -b expedite/fix-promotions
  git push origin -u HEAD --no-verify
  ```
2. Once the branch is pushed, it should then contain the Expedite fix. To do that it could be done in one of three ways:
   1. Work and commit on it directly
   2. Create an MR to merge into it
   3. Cherry-pick a commit into it
3. Once the Expedite branch contains the fix, you will need to update the `CHANGELOG.md` manually (with a title like `Expedite Release 2021/12/01`). After the changelog is updated, execute:
    ```bash
    git add -p CHANGELOG.md
    git commit -m 'MISC Update changelog for Expedite release 2021/12/01'
    git push origin expedite/fix-promotions --no-verify
      ```
4. At this point the branch should have a Pipeline in Gitlab. The pipeline allows you to deploy in UAT and Production. So depending on the confidence and the time pressure, the deployment in UAT can be skipped, and it can be deployed directly in Production.
5. Due to a previous incident, it would be good to be monitoring the FE pods and verify that all of them are correctly recycled (have the same 'age'), when running:
    ```bash
    kubectx atidaplus-fe-prod
    kubens frontend
    kubectl get pods
    ```
    It is also possible to re-rollout the current pods manually using the 'frontend' namespace:
    ```bash
    kubectl rollout restart frontend
    ```
6. Once deployment is finished and validated, the expedite branch can be merged back in master and master branch can be merged back in develop
    ```bash
    git checkout expedite/fix-promotions
    git pull origin expedite/fix-promotions
    git checkout master
    git merge --ff-only expedite/fix-promotions
    git push origin master --no-verify
    git checkout develop
    git merge master
    git push origin develop --no-verify
    ```
6. You should always check any active release branches if there are merge master branch back into them.
7. **Do not run the master pipeline** of the new pushed master. The code has been deployed with the expedite release already.

## Notes

1. When merging the release into master always use the `--ff-only` flag. This should result in a fast-forward merge, and it **MUST** not create a new commit for the merge operation.
   - If a fast-forward merge is not possible (i.e. you are asked to provide a commit message for the merge operation) then the release branch is out of date with the master branch. Please merge master into the release branch, push to GitLab and ask the Product Owner to sign off on the release again.
1. You can verify that the latest commit in master is the same as the latest in release branch, for example:

   ```
   git log master
   commit a03d2643c548f8f4b5b0fa9cce822ad8e0ec3c87 (master, release/1.25.0)
   Author: John Smith <example@example.com>
   Date:   Tue Jan 29 14:54:14 2019 +0000

       MISC Update changelog for 1.25.0 release [ci skip]
   ```

## What to do if Contentful CI fails
The documentation on disaster recovery for FE release in case Contentful steps fail is logged here: [What to do if Contentful CI fails].

## What to do if you need to rebuild an already built Docker image for git ref
The build process (on develop, release, expedite and master branches) automatically skips builds and tests if the docker image already exists in the Docker repository from a previous build.

Whilst it'd be an unusual situation to need a rebuild of the image, if you require to do so then:

* [create a new pipline](https://gitlab.com/atida/frontend/atida-plus/-/pipelines/new) with:
  * Run for branch name or tag - the branch you need to rebuild the Docker image for
  * Variable:
   * Key: FORCE_BUILD
   * Value: 1

This will start the full pipeline for that branch without skipping the build.

Note: development ticket branches don't store a Docker image, so they always rebuild

[atida plus jira board]: https://olp.atlassian.net/secure/RapidBoard.jspa?rapidView=20
[prod environment]: https://www.atida.com/pt-pt
[uat]: https://www.uat.atida.com
[atida plus]: https://gitlab.com/atida/frontend/atida-plus
[atida plus pipelines]: https://gitlab.com/atida/frontend/atida-plus/-/pipelines
[release branches]: https://gitlab.com/atida/frontend/atida-plus/-/branches?state=all&search=release
[atida plus release branches]: https://gitlab.com/atida/frontend/atida-plus/-/branches/all?utf8=%E2%9C%93&search=release
[google lighthouse scores]: https://olp.atlassian.net/wiki/spaces/ATIDA/pages/1845100580/PLUS+Google+Lighthouse+Scores
[release notes]: https://olp.atlassian.net/wiki/spaces/ATIDA/pages/1839202347/Plus+Frontend+Release+Notes
[develop commits]: https://gitlab.com/atida/frontend/atida-plus/-/commits/develop
[regex search]: https://chrome.google.com/webstore/detail/chrome-regex-search/bpelaihoicobbkgmhcbikncnpacdbknn
[What to do if Contentful CI fails]: contentful-scripts/RELEASE_PROCESS.md
