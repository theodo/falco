const fs = require('fs');
const path = require('path');

const fullComponentsPath = path.join(__dirname, '../../../src/components');
const pageComponentsPath = path.join(__dirname, '../../../src/pages');

function componentsFolderExists() {
  return fs.existsSync(fullComponentsPath);
}

function pagesFolderExists() {
  return fs.existsSync(pageComponentsPath);
}

function componentAlreadyExists(component) {
  const fullComponents = componentsFolderExists() ? fs.readdirSync(fullComponentsPath) : [];
  const pageComponents = pagesFolderExists() ? fs.readdirSync(pageComponentsPath) : [];
  const components = pageComponents.concat(fullComponents);

  return components.indexOf(component) >= 0;
}

module.exports = {
  componentAlreadyExists,
  componentsFolderExists,
  pagesFolderExists,
};
