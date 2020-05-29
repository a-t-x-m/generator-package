# @atxm/generator-package

[![npm](https://flat.badgen.net/npm/license/@atxm/generator-package)](https://www.npmjs.org/package/@atxm/generator-package)
[![npm](https://flat.badgen.net/npm/v/@atxm/generator-package)](https://www.npmjs.org/package/@atxm/generator-package)
[![CircleCI](https://flat.badgen.net/circleci/github/a-t-x-m/generator-package)](https://circleci.com/gh/a-t-x-m/generator-package)
[![David](https://flat.badgen.net/david/dep/a-t-x-m/generator-package)](https://david-dm.org/a-t-x-m/generator-package)

## Description

A [Yeoman](http://yeoman.io/authoring/user-interactions.html) generator for Atom packages written in JavaScript, TypeScript or CoffeeScript.

**Features**

- scaffolds Atom packages written in JavaScript, TypeScript or CoffeeScript 2
- bundles package with Webpack
- adds linter configurations
  - [CoffeeLint](https://github.com/clutchski/coffeelint)
  - [ESLint](https://github.com/typescript-eslint/typescript-eslint)
  - [stylelint](https://stylelint.io/)
- adds CI configurations
  - [CircleCI](https://circleci.com)
  - [GitHub Actions](https://github.com/features/actions)
  - [Travis CI](https://travis-ci.org/)
  - [Bitbucket Pipelines](https://bitbucket.org/product/features/pipelines) (private packages only)
- adds [Atom package dependencies](https://www.npmjs.com/package/atom-package-deps)
- adds [SPDX](https://spdx.org/licenses/) license
- adds `activationHooks` / `activationCommands`
- supports loaders for CSS/SCSS
- supports Babel presets
- adds development scripts
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

ℹ️ If you prefer graphical user interfaces, [`atom-yeoman`](https://atom.io/packages/atom-yeoman) lets you use this generator within Atom!

## License

This work is dual-licensed under [The MIT License](https://opensource.org/licenses/MIT) and the [GNU General Public License, version 2.0](https://opensource.org/licenses/GPL-2.0)

