# @atxm/package-generator

[![npm](https://flat.badgen.net/npm/license/@atxm/package-generator)](https://www.npmjs.org/package/@atxm/package-generator)
[![npm](https://flat.badgen.net/npm/v/@atxm/package-generator)](https://www.npmjs.org/package/@atxm/package-generator)
[![CircleCI](https://flat.badgen.net/circleci/github/a-t-x-m/package-generator)](https://circleci.com/gh/a-t-x-m/package-generator)
[![David](https://flat.badgen.net/david/dep/a-t-x-m/package-generator)](https://david-dm.org/a-t-x-m/package-generator)

## Description

A [Yeoman](http://yeoman.io/authoring/user-interactions.html) generator for Atom packages written in any version of TypeScript.

**Features**

- adds any [SPDX](https://spdx.org/licenses/) license
- adds [CircleCI](https://circleci.com) configuration
- adds [Travis CI](https://travis-ci.org/) configuration
- adds [ESLint](https://github.com/typescript-eslint/typescript-eslint) configuration
- adds [stylelint](https://stylelint.io/) configuration
- adds [Atom package dependencies](https://www.npmjs.com/package/atom-package-deps)

## Prerequisites

You need [Node.js](https://nodejs.org/en/) installed and available in your `PATH` [environment variable](http://superuser.com/a/284351/195953). Use your preferred Node package manager to install the Yeoman CLI tool.

```sh
npm install -g yo
```

## Installation

Use your preferred [Node](https://nodejs.org/) package manager to install the CLI tool

```sh
npm i @atxm/package-generator -g
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
yo atom-package-typescript
```

*“That's all Folks!”*

## License

This work is dual-licensed under [The MIT License](https://opensource.org/licenses/MIT) and the [GNU General Public License, version 2.0](https://opensource.org/licenses/GPL-2.0)

