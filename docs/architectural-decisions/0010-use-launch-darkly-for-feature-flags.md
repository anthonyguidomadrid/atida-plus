# 10. Use Launch Darkly for Feature Flags

Date: 2021-10-22

## Status

Accepted

## Context

Having multiple teams working on a single codebase can lead to synchronization issues and delays the ability of teams to release tickets when ready. To improve this, the idea of decoupling code deployments from code releasing is being investigated. Feature flags are a fundamental part of this paradigm shift, and having a centralized and mature tool to manage the feature flags is considered a key component.

Initially, the main focus of a feature flag tool is to enable boolean “release” feature flags.

These tools also allow for features such as A/B testing, targeted releases based on tags etc. These features are of secondary concern right now, though very useful to have for future exploration.

## Decision

After our initial investigation we selected two tools to compare and evaluate side by side, [Unleash](https://www.getunleash.io) and [Launch Darkly](https://launchdarkly.com), see <https://olp.atlassian.net/wiki/spaces/ATIDA/pages/2006974534/33+feature+flag+tools>. The result of this comparison was to use Launch Darkly, mainly for it's maturity as a product and more feature heavy UI amongst other reasons.

The approach, initially, will be to focus on using feature flags in this front end repo, on the server side only using a Node SDK and providing the evaluated feature flags to the front end as well for client side hydration. In practice this means a page refresh will be needed for a user to experience a change after a feature flag has been toggled, this feels like the appropriate use as it will be less surprising to users. It also comes with a potential cost benefit with LaunchDarkly which has limits on the number of Monthly Active Users (MAUs) that can be used with a client side SDK.

Launch Darkly has SDK's for many other platforms, which we will look to implement if required in our other repos.

## Consequences

This one the first steps towards CI/CD and in our initiative to make our release process and working flows more efficient, by allowing us to deploy code to environments behind feature flags.

Issues have been raised such as:

- Risk of rising costs of the service at scale
- Removal of feature flags
- Naming conventions
- The risk of more merge conflicts
- Hierarchy of feature flags
