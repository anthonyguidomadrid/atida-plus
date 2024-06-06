# 5. Use Cypress.io for End-to-end Testing

Date: 2021-01-21

## Status

Accepted

## Context

We need a simple, proven solution for automated E2E testing that both testers and engineers can contribute to and get value from. It should enable testers to write UI tests against the Atida Plus site, and in doing so will aid regression testing and build confidence in the stability of the site.

We also need to decide on _which_ tests we should be writing, and at what point writing new tests would result in diminishing returns.

## Decision

To use [Cypress.io](https://www.cypress.io/) for frontend automation. Cypress is free, easy to use, easy to set up, and comes with excellent documentation.

We will initially focus on writing tests that cover essential user journeys, to maximise the impact and value of this test suite.

## Consequences

At the time of writing, all members of the QA team on Atida Plus (and Pure) have some level of experience with Cypress – but should new QA members be onboarded in future, they should be able to get to grips with Cypress relatively quickly, especially if they have other test automation experience.
