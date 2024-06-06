# 3. Introduction of Tailwindcss CSS Framework

Date: 2021-01-13

## Status

Accepted

## Context

In setting up the initial theme structure for the project, we need to decide whether to use a CSS framework. And if so, which one.

## Decision

To use [TailwindCSS](https://tailwindcss.com/) utility-first CSS framework in the project.

## Consequences

For developers who have not used TailwindCSS before there will be a learning curve. However this could be said for any framework, public or custom-built.

TailwindCSS is well documented to should lessen the learning curve for developers new to it.

Using TailwindCSS should speed up the initial set up time of the project's theme by providing a default theme configuration that we can customise.

A framework can bring consistency of code across a code base.

TailwindCSS is a utility-first CSS framework meaning it's flexible and less constraining than other CSS frameworks.

Styles that are not used can be purged meaning the size of production CSS files is smaller than with other CSS frameworks.
