/**
 * End to End utilities file
 * Stores helper functions
 **/

var util = module.exports = {};
var fs = require('fs-extra');
var config = browser.params;

//Mocha Configuration
var chai = require('chai');
var chaiAsPromised = require('chai-as-promised');
chai.use(chaiAsPromised);
var expect = chai.expect;

/**
 * Set browser control flow for demoing purposes
 * @name setControlFlow
 * @type public function
 * @return {Promise} selenium controlFlow call
 */
util.setControlFlow = function (delay) {
  var origFn = browser.driver.controlFlow().execute;

  browser.driver.controlFlow().execute = function () {
    var args = arguments;

    origFn.call(browser.driver.controlFlow(), function () {
      return protractor.promise.delayed(delay);
    });

    return origFn.apply(browser.driver.controlFlow(), args);
  };
};

/**
 * Scrolls browser window to element
 * @name scrollToElement
 * @type public function
 * @param {Object} element to focus on
 */
util.scrollToElement = function (element) {
  moveViewTo(element);
  moveCursorTo(element);
};

function moveViewTo(element) {
  element.getLocation().then(function (loc) {
    browser.executeScript('window.scrollTo(' + loc.x + ',' + loc.y + ');');
  });
  return protractor.promise.delayed(1000);
}

function moveCursorTo(element) {
  return browser.actions().mouseMove(element).perform();
}


/**
 * Take a screenshot of the page and store data on that screenshot
 * @name takeScreenShot
 * @type public function
 * @param {Object} data storing the screenshots information, requires name and id values
 */
util.takeScreenShot = function (data) {
  if (!data.name || !data.id) {
    console.log('Error: name and id not passed for screenshot');
  }
  browser.getCapabilities().then(function (capabilities) {
    data.browser = capabilities.caps_.browserName;
    data.platform = capabilities.caps_.platform;
    data.version = capabilities.caps_.version;

    if (data.platform === 'Darwin') {
      data.platform.replace('Darwin', 'Mac');
    } else if (data.platform === 'Mac OS X') {
      data.platform.replace('Mac OS X', 'Mac');
    }

    data.imagepath = './' + config.outputPath + '/' + data.platform + '/' + data.browserName + '/' + data.name + '.' + config.imageType;
    data.jsonpath = './' + config.outputPath + '/' + data.platform + '/' + data.browserName + '/' + data.name + '.json';
    generateData(data);
  });
};

/**
 * Set browser window size
 * @name setWindowSize
 * @type public function
 * @param {int} width of screen
 * @param {int} height of screen
 */
util.setWindowSize = function (width, height) {
  browser.driver.manage().window().setSize(width, height);
};

/**
 * rotate window
 * @name rotate
 * @type public function
 */
util.rotate = function () {
  util.setWindowSize(config.height, config.width);
};

/**
 * Private function, take screenshot
 * @name writeScreenShot
 * @type private function
 * @param data
 * @param filename
 */
function writeScreenShot(data, filename) {
  var stream = fs.createOutputStream(filename);
  stream.write(new Buffer(data, 'base64'));
  stream.end();
}

/**
 * Generate data
 * @name generateDate
 * @type private function
 * @param data obj containing paths and information
 */
function generateData(data) {
  // Create image
  browser.takeScreenshot().then(function (png) {
    writeScreenShot(png, data.imagepath);
  });

  fs.writeJson(data.jsonpath, data, function (err) {
    if (err) {
      return err;
    }
  });
  return true;
}
