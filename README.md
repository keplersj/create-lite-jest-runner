# create-lite-jest-runner

[![npm](https://img.shields.io/npm/v/create-lite-jest-runner)](https://www.npmjs.com/package/create-lite-jest-runner)
[![npm](https://img.shields.io/npm/dw/create-lite-jest-runner)](https://www.npmjs.com/package/create-lite-jest-runner)
[![Codecov](https://img.shields.io/codecov/c/github/keplersj/create-lite-jest-runner)](https://app.codecov.io/gh/keplersj/create-lite-jest-runner)
[![Bundle Size](https://img.shields.io/bundlephobia/min/create-lite-jest-runner)](https://bundlephobia.com/package/create-lite-jest-runner)
[![Conventional Commits](https://img.shields.io/badge/Conventional%20Commits-1.0.0-yellow.svg)](https://www.conventionalcommits.org/)

A lightweight Jest runner creator.

## Why use this instead of [`create-jest-runner`](https://www.npmjs.com/package/create-jest-runner)?

Honestly, you shouldn't. `create-jest-runner` is an incredible package and provided the base for all of the Jest runners I've created for years. I created this package to centralize an abstraction I created for my runners after updating some of their dependencies to their new ESM versions.

`create-jest-runner` properly handles the lower level worker abstraction for the runners it creates. This package does not. Instead, this package creates runners that run tests inline, regardless if that is requested or not. This is a sacrifice being made because `jest-worker` does not yet support ESM files without some heavy quirks (as of March 10, 2022).

***DO NOT***  create a runner with this package unless you are **absolutely** certain that this is a trade off you are willing to make.

## License

Copyright 2022 [Kepler Sticka-Jones](https://keplersj.com/). Licensed ISC.