# 6. Use the Page Object Model architecture with Cypress

Date: 2021-02-02

## Status

Accepted

## Context

We need to adopt a scalable abstraction pattern for structuring our Cypress tests, ensuring a clear separation between element locators plus other page-specific code, and actual test steps/assertions. Doing so will ensure that our Cypress test suite is more maintainable and adopts a [DRY](https://en.wikipedia.org/wiki/Don%27t_repeat_yourself) approach.

The [Page Object Model](https://www.selenium.dev/documentation/en/guidelines_and_recommendations/page_object_models/) (POM) is a widely adopted abstraction pattern in automated testing. It was popularised by users of the Selenium ecosystem, but it [can also be used with Cypress](https://testautomationu.applitools.com/cypress-tutorial/chapter7.html). 

## Decision

To adopt the Page Object Model and use it to structure our Cypress test suite.

Page object classes will be stored in the `cypress/support/page-objects/` directory, organised into subdirectories and files that broadly mirror the structure of the `cypress/integration` directory. For example, a file named `cypress/integration/pages/homepage.spec.js` would likely have a corresponding `cypress/support/page-objects/pages/homepage.js` file.

Any spec file will import classes from any page object file, as required. The exact structure of the page object files and the classes contained within them will evolve over time.

## Consequences

Cypress users who are unfamiliar with POM would be required to learn and understand it before contributing new tests to this project.

There will be a minor additional overhead in the creation of new Cypress tests, as selectors and other page-specific code would be stored separately to the test steps and assertions.

Contributors to the Cypress test suite will need to ensure that the page objects remain well-organised and easy to understand as the test suite grows and evolves.
