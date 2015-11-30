/**
 * This is a proof of concept spec that uses browser sync to synchronize all browsers, platforms, and devices
 * to follow the same flow.
 *
 * In order for this test to work you will need the following
 * Requirements: run 'grunt serve --sync' to activate browser sync
 * Once that is done, set any browser to localhost:9001 or 127.0.0.1:9000 for mobile devices
 */

'use strict';
//Config params
var config = browser.params;
var util = require(protractor.basePath + '/specs/util.js');
var width = config.width;

var EC = protractor.ExpectedConditions;

//Mocha configuration
var chai = require('chai');
var chaiAsPromised = require('chai-as-promised');
chai.use(chaiAsPromised);
var expect = chai.expect;

// Demo Param
var demo = false;
if (config.demo) {
  console.log('Demo mode initiated');
  demo = true;
  util.setControlFlow(50); //set scroll speed
}


/*
 ******************************************
 *********** Local HOST TEST CASES ********
 ******************************************
 */

describe('Should demo Fahsl Path!', function () {

  it('Get to shop page', function () {
    browser.get('https://lemond.cc/#!/').then(function () {
      var storeButton = element(by.xpath('//a[@data-target="nav-store"]'));
      browser.wait(EC.elementToBeClickable(storeButton), 5000);
      storeButton.click().then(function () {
        browser.sleep(5000);
        var bottles = element(by.xpath('//img[@src="assets/StoreHomePage_bottle-1.jpg"]'));
        browser.ignoreSynchronization = true;
        browser.actions().mouseMove(bottles).perform().then(function () {
          browser.ignoreSynchronization = false;
          util.scrollToElement(bottles);

          var washoe = element(by.xpath('//img[@src="assets/StoreHomePage_Washoe.jpg"]'));
          util.scrollToElement(washoe);
          browser.sleep(4000);
        });

      });
    })
  });

  it('Scroll through products', function () {
    var washoe = element(by.xpath('//img[@src="assets/StoreHomePage_Washoe.jpg"]'));
    util.scrollToElement(washoe);
    var trainers = element(by.xpath('//img[@src="assets/StoreHomePage_Trainer.jpg"]'));
    util.scrollToElement(trainers);
    var bottles = element(by.xpath('//img[@src="assets/StoreHomePage_bottle-1.jpg"]'));
    util.scrollToElement(bottles);
    var gear = element(by.xpath('//img[@src="assets/StoreHomePage-04.jpg"]'));
    util.scrollToElement(gear);
  });

  it('Purchase a bike', function () {
    var washoe = element(by.xpath('//img[@src="assets/StoreHomePage_Washoe.jpg"]'));
    util.scrollToElement(washoe);
    washoe.click().then(function () {
      var buildInfo = element(by.xpath('//div[@class="buildInfo"]'));
      util.scrollToElement(buildInfo);
      browser.sleep(1000);
      element(by.xpath('//a[@ng-show="washoe.modelSelection != \'Framekit\'"]')).click();
      util.scrollToElement(buildInfo);
      browser.sleep(1000);
      element(by.xpath('//a[@ng-show="washoe.modelSelection != \'105\'"]')).click();
      util.scrollToElement(buildInfo);
      browser.sleep(1000);
      element(by.xpath('//a[@ng-show="washoe.modelSelection != \'Ultegra\'""]')).click();
      util.scrollToElement(buildInfo);
      browser.sleep(1000);
      element(by.xpath('//a[@ng-show="washoe.modelSelection != \'Ultegra Di2\'"]')).click();
      util.scrollToElement(buildInfo);
      browser.sleep(1000);
      element(by.xpath('//a[@ng-show="washoe.modelSelection != \'Dura Ace Di2\'"]')).click();
      util.scrollToElement(buildInfo);
      browser.sleep(1000);
    });
  });

});
