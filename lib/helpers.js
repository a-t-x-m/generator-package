const { access, constants } = require('fs');
const { basename, dirname, extname, join, resolve } = require('path');
const { promisify } = require('util');
const pkgDir = require('pkg-dir');
const spdxLicenseList = require('spdx-license-list/full');
const terminalLink = require('terminal-link');

const accessAsync = promisify(access);

// Create array of license choices
function getLicenses() {
  const spdxCodes = Object.getOwnPropertyNames(spdxLicenseList).sort();

  return spdxCodes.map(obj => {
    const licenses = {};

    licenses['name'] = terminalLink(obj, `https://spdx.org/licenses/${obj}.html`, {
      fallback() {
        return obj;
      }
    });

    licenses['value'] = obj;

    return licenses;
  }) || [];
}

async function fileExists(filePath) {
  try {
    await accessAsync(filePath, constants.F_OK)
    return true;
  } catch (error) {
    return false;
  }
}

async function getTemplatePath(filePath, selectedLanguage) {
  const rootDir = await pkgDir(__dirname);
  const languagePath = resolve(rootDir, 'generators/app/templates', selectedLanguage, filePath);
  const sharedPath = resolve(rootDir, 'generators/app/templates', 'shared', filePath);

  if (await fileExists(languagePath)) {
    return join(selectedLanguage, filePath);
  } else if (await fileExists(sharedPath)) {
    return join(sharedPath, filePath);
  } else {
    throw Error(`No template file found for ${filePath}`);
  }
}

function getDestinationPath(filePath, selectedLanguage) {
  const dirName = dirname(filePath);
  const extName = extname(filePath);
  const baseName = basename(filePath, extName);

  switch (selectedLanguage.toLowerCase()) {
    case 'typescript':
      return `${dirName}/${baseName}.ts`;

    case 'javascript':
      return `${dirName}/${baseName}.js`;

    case 'coffeescript':
      return `${dirName}/${baseName}.coffee`;

    default:
      throw Error('Unsupported language selected');
  }
}

function getDependencies(props) {
  const dependencies = [];
  const devDependencies = [
    'concurrently',
    'css-loader',
    'husky',
    'sass-loader',
    'style-loader',
    'stylelint',
    'webpack-cli',
    'webpack'
  ];

  if (props.additionalDependencies && props.additionalDependencies.length) {
    props.additionalDependencies.forEach(additionalDependency => dependencies.push(additionalDependency));
  }

  switch (props.language) {
    case 'coffeescript':
      devDependencies.push(
        'coffee-loader',
        'coffeelint@2',
        'coffeescript@2'
      );

      break;

    case 'javascript':
      devDependencies.push(
        '@babel/core',
        '@babel/preset-env',
        'babel-eslint',
        'babel-loader',
        'eslint-plugin-node',
        'eslint',
        `eslint-config-${props.eslintConfig}`,
      );

      if (props.babelPresets.length) {
        props.babelPresets.forEach( preset => {
          devDependencies.push(preset);
        });
      }

      break;

    case 'typescript':
      devDependencies.push(
        '@types/atom',
        '@types/node',
        '@typescript-eslint/eslint-plugin-tslint',
        '@typescript-eslint/eslint-plugin',
        '@typescript-eslint/parser',
        'eslint',
        'ts-loader',
        'tslint',
        'typescript',
      );

      break;
  }

  if (props.features.includes('styles')) {
    devDependencies.push(
      'stylelint',
      `stylelint-config-${props.stylelintConfig}`
    );
  }

  return [
    dependencies.sort(),
    devDependencies.sort()
  ];
}

function getLanguageExtension(selectedLanguage) {
  switch (selectedLanguage.toLowerCase()) {
    case 'typescript':
      return 'ts';

    case 'javascript':
      return 'js';

    case 'coffeescript':
      return 'coffee';

    default:
      throw Error('Unsupported language selected');
  }
}

function getActivationHooks(props) {
  return props.activationHooks.map(hook => {
    switch (hook) {
      case 'core:loaded-shell-environment':
        return hook;

      case 'root-scope-used':
        return props.rootScopeUsed.endsWith(':root-scope-used')
          ? props.rootScopeUsed
          : `${props.rootScopeUsed}:root-scope-used`;

      case 'grammar-used':
        return props.grammarUsed.endsWith(':root-scope-used')
          ? props.grammarUsed
          : `${props.grammarUsed}:grammar-used`;
    }
  });
}

function composeManifest(props) {
  const fileExtension = getLanguageExtension(props.language);
  const linterName = props.language === 'coffeescript' ? 'coffeelint' : 'eslint';

  return {
    'name': props.name,
    'version': '0.0.0',
    'description': props.description,
    'private': props.private,
    'main': `./lib/${props.name}`,
    'scripts': {
        'build': 'webpack --mode production',
        'dev': 'webpack --watch --mode none',
        [`lint:code`]: props.language === 'coffeescript'
          ? `coffeelint ./src`
          : `eslint --no-error-on-unmatched-pattern ./src/**/*.${fileExtension}`,
        'lint:styles': 'stylelint --allow-empty-input styles/*.{css,less}',
        'lint': `concurrently --names "${linterName},stylelint" --prefix-colors "green,blue" --succeed "npm run lint:code" "npm run lint:styles"`,
        'postinstall': 'npm run build',
        'prepublishOnly': 'npm run build',
        'test': 'echo \'Error: no test specified\' && exit 1'
    },
    'keywords': [
    ],
    'repository': {
        'type': 'git',
        'url': `https://github.com/${props.author}/${props.repositoryName}`
    },
    'homepage': `https://atom.io/packages/${props.name}`,
    'bugs': {
        'url': `https://github.com/${props.author}/${props.repositoryName}/issues`
    },
    'license': props.license,
    'engines': {
      'atom': '>=1.0.0 <2.0.0'
    },
    'activationCommands': {
      'atom-workspace': [
        `${props.name}:hello-world`
      ]
    },
    'activationHooks': getActivationHooks(props),
    'workspaceOpeners': props.workspaceOpenerURIs,
    'package-deps': props.atomDependencies,
    'dependencies': {},
    'devDependencies': {},
    'husky': {
      'hooks': {
        [props.linterHook]: 'npm run lint'
      }
    }
  };
}

function composeBabel(props) {
  return {
    'presets': [
        [
            '@babel/preset-env', {
                'targets': {
                    'electron': '2.0.0',
                },
                'useBuiltIns': 'entry',
            }
        ],
        ...props.babelPresets
    ]
  }
}

module.exports = {
  composeBabel,
  composeManifest,
  getDependencies,
  getDestinationPath,
  getLicenses,
  getTemplatePath
};
