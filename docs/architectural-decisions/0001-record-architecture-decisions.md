# 1. Use of ADRs to track architectural Decisions

Date: 2021-01-12

## Status

Accepted

## Context

At the moment architectural decisions are being made when required and they are not recorded.

## Decision

Adopt [ADRs](https://github.com/joelparkerhenderson/architecture_decision_record) into the project. This file is an ADR. It describes the problem we are facing, and the decision which was made in order to solve it.

ADR files are to be stored in `/docs/architectural-decisions`. Each file is in markdown format, contains a title and has four sections:

- **Context**: Describe the nature of the problem.
- **Decision**: Describe the decision that was made to solve this problem.
- **Consequences**: Describe any possible consequences to this decision.
- **Alternatives**: Other solutions which were considered, why they were rejected etc. (optional)

The ADR should be submitted as a PR either with the pull request where the decision was (first) implemented or on its own.

Each ADR should have an index superior to the last ADR. Previous ADRs can be contradicted by a later ADR. (e.g `0000-introduce-adr.md`, `0001-something-interesting`, etc).

Any ADR that supersedes previous ADRs should have a reference to them in the following format: `0003-product-import-supersedes-0001-0002`.

An ADR may be created retroactively, although in general they should be ordered chronologically.

### Examples of what would warrant an ADR:

- pulling out non-project specific code / API integrations into separate projects
- defining a testing strategy
- introducing a methodology, for example BEM for CSS
- adding support for feature flags
- changes to the deployment process / post-deploy scripts

### Examples of what would NOT warrant an ADR:

- giving a service / class a specific name instead of another
- changes to the project Kanban process
- introducing new configuration / parameters

## Consequences

Having an ADR policy will enable future developers (and ourselves) to better understand why decisions were made and therefore provide a better context for making further decisions.

Creating an ADR also forces us to explain to _ourselves_ and the team why we are making decisions, this can be especially useful when the ADR is part of a pull request implementing a decision.

Finally, it provides a useful historical record of the project.
