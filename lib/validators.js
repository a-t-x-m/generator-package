const fetch = require('cross-fetch');

function name(str, options) {
  if (str.length === 0) {
    return 'Please enter a name for your package';
  } else if (/^[a-z0-9_-]+$/.test(str) !== true) {
    return 'The package name can only contain lowercase letters, numbers, underscores and dashes';
  } else if (str.startsWith('atom-') && !options.allowAtomPrefix) {
    return 'The package name shouldn\'t be prefixed with "atom-"';
  } else if (str.startsWith('@') && !options.ignoreScopeWarning) {
    return 'Scoped package names are not supported by apm (yet?)';
  } else if (str.length > 214) {
    return 'The name must be shorter than 215 characters';
  }

  return true;
}

function description(str, options) {
  return (str.length === 0 && options['allow-empty-description'] !== true)
    ? 'Please provide a short description for your package'
    : true;
}

function user(str) {
  return str.length > 0
    ? true
    : 'You have to provide a username';
}

function rootScope(str) {
  return str.trim().length
    ? true
    : 'You need to specify a valid root scope';
}

function grammar(str) {
  return str.startsWith('language-')
    ? true
    : 'You need to specify a valid language package';
}

function workspaceOpener(str) {
  if (str.trim().length === 0) {
    return 'You need to specify at least one URI';
  }

  const workspaceOpeners = str.split(',') || [str];
  const invalidOpeners = workspaceOpeners.filter(workspaceOpener => !workspaceOpener.startsWith('atom://' || workspaceOpener.length <= 'atom://'.length));

  if (invalidOpeners.length) {
    return 'You need to specify a valid workspace URI, prefixed with atom://';
  }

  return true;
}

async function atomDependencies(str) {
  if (str.trim().length === 0) {
    return 'You need to specify at least one package';
  }

  const packages = str.split(',');
  const promises = [];

  for (var pkg of packages) {
    promises.push(await fetch(`https://atom.io/api/packages/${pkg}`));
  }

  try {
    await Promise.all(promises);
  } catch (err) {
    // TODO fix message
    return `The package '${pkg}' could not be found`;
  }

  return true;
}

module.exports = {
  name,
  description,
  user,
  rootScope,
  grammar,
  workspaceOpener,
  atomDependencies
};
