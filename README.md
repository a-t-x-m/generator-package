# @atxm/generator-package

[![npm](https://flat.badgen.net/npm/license/@atxm/generator-package)](https://www.npmjs.org/package/@atxm/generator-package)
[![npm](https://flat.badgen.net/npm/v/@atxm/generator-package)](https://www.npmjs.org/package/@atxm/generator-package)
[![CircleCI](https://flat.badgen.net/circleci/github/a-t-x-m/generator-package)](https://circleci.com/gh/a-t-x-m/generator-package)
[![David](https://flat.badgen.net/david/dep/a-t-x-m/generator-package)](https://david-dm.org/a-t-x-m/generator-package)

## Description

A [Yeoman](http://yeoman.io/authoring/user-interactions.html) generator for Atom packages written in JavaScript, TypeScript or CoffeeScript.

**Features**

- scaffolds Atom packages written in JavaScript, TypeScript or CoffeeScript
- bundles package with Webpack
- adds linter configurations
  - [CoffeeLint](https://github.com/clutchski/coffeelint)
  - [ESLint](https://github.com/typescript-eslint/typescript-eslint)
  - [stylelint](https://stylelint.io/)
- adds CI configurations
  - [Bitbucket Pipelines](https://bitbucket.org/product/features/pipelines) (private packages only)
  - [CircleCI](https://circleci.com)
  - [GitHub Actions](https://github.com/features/actions) (private packages only)
  - [Travis CI](https://travis-ci.org/)
- adds [Atom package dependencies](https://www.npmjs.com/package/atom-package-deps)
- adds any [SPDX](https://spdx.org/licenses/) license
- adds development scripts
- adds `activationHooks` / `activationCommands`
- supports Babel presets
- links development packages

## Prerequisites

You need [Node.js](https://nodejs.org/en/) installed and available in your `PATH` [environment variable](http://superuser.com/a/284351/195953). Use your preferred Node package manager to install the Yeoman CLI tool.

```sh
npm install -g yo
```

## Installation

Use your preferred [Node](https://nodejs.org/) package manager to install the CLI tool

```sh
npm i @atxm/generator-package -g
```

## Usage

Create a new directory for your package and change into it:

```sh
cd ~/.atom/packages
mkdir my-package
cd my-package
```

Next, run the generator and follow its instructions. Use `--help`to list available flags.

```sh
yo @atxm/package
```

*“That's all Folks!”*

## License

This work is dual-licensed under [The MIT License](https://opensource.org/licenses/MIT) and the [GNU General Public License, version 2.0](https://opensource.org/licenses/GPL-2.0)

