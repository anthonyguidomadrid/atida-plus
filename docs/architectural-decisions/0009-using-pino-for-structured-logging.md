# 9. Using Pino for structured logging

Date: 2021-04-28

## Status

Accepted

## Context

In order to navigate front-end logs more effectively in Kibana, we need to use a structured log format (e.g. JSON). We also need to decide upon a library to use to enable this.

## Decision

We have decided to use [pino](https://github.com/pinojs/pino) because it is feature-rich and can be safely included into client-side bundles.

Also considered was [winston](https://github.com/winstonjs/winston) but at 100kb+ it's much to large to be a viable option for client-side logging.

## Consequences

The team will need to be aware to use this logging utility as opposed to `console` in all logging scenarios.
