// read.js
const fs = require('fs');
const yaml = require('js-yaml');
const { exit } = require('process');
// Requiring the lodash library
const _ = require('lodash');

const serverlessYamlPath = './serverless.yml';

const args = process.argv.slice(2);
if (!args[0]) {
  console.log('Please provide serverless function type arg');
  exit();
}

const templateName = args[0];
const templateFilePath = `./cloudformation-templates/${templateName}/template.yml`;

const serverlessYamlData = readYmlFile(serverlessYamlPath);

try {
  if (fs.existsSync(templateFilePath)) {
    //file exists
    const templateYamlData = readYmlFile(templateFilePath);

    //loop template keys and try to merge with serverless.yml file
    const mergedYamlData = mergeYmlData(templateYamlData, serverlessYamlData);

    //Write new serverless Yaml file
    const yamlString = yaml.dump(mergedYamlData);
    fs.writeFileSync(serverlessYamlPath, yamlString, 'utf8');
  } else {
    console.error(`Service Cloudformation template missing: ${templateFilePath}`);
  }
} catch (e) {
  console.error(e);
  exit();
}

function readYmlFile(filePath) {
  try {
    let fileContents = fs.readFileSync(filePath, 'utf8');
    let data = yaml.load(fileContents);

    return data;
  } catch (e) {
    console.error(e);
    exit();
  }
}

function mergeYmlData(templateData, serverlessData) {
  return _.mergeWith(serverlessData, templateData, (objValue, srcValue) => {
    //always merge arrays not overwrite
    if (_.isArray(objValue)) {
      return objValue.concat(srcValue);
    }
  });
}
