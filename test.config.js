// To run this e2e test: protractor test/protractor-e2e-config.js
// This config file is used just to run one single test, to make sure that all javascripts are loaded - will be put into Jenkins workflow
var argv = require('yargs').argv;
var config = require('./config.json');
var multiCapabilities = [], i, obj;

for (i = 0; i < config.browsers.length; i++) {
  if (config.browsers[i].active) {
    obj = {'browserName': config.browsers[i].name};
    if (obj.browserName === 'chrome') obj.chromeOptions = config.browsers[i].chromeOptions;
    multiCapabilities.push(obj);
  }
}
delete config.browsers;

if (argv.width && argv.height) {
  config.params.width = argv.width;
  config.params.height = argv.height;
} else {
  config.params.width = 1024;
  config.params.height = 768;
}

if (argv.demo) {
  config.params.demo = true;
}

exports.config = {
  specs: ['specs/e2e-demo-spec.js'],
  seleniumAddress: config.seleniumAddress,
  directConnect: config.directConnect,
  chromeDriver: config.chromeDriver,
  params: config.params,
  framework: 'mocha',
  mochaOpts: config.mochaOpts,
  allScriptsTimeout: 30000,
  multiCapabilities: multiCapabilities,
  onPrepare: function () {
    protractor.basePath = __dirname; //needed for require node modules

    browser.driver.manage().window().setSize(config.params.width, config.params.height);

    // implicit and page load timeouts
    browser.manage().timeouts().pageLoadTimeout(15000);
    browser.manage().timeouts().implicitlyWait(15000);
  }
};


