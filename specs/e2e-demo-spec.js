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
var util = require(protractor.basePath + '/e2e/util.js');
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

describe('Should click around a ton', function () {

  before(function () {
    if (width > 992) {
      /**
       * This spec only supports mobile view
       * if the width is not specified to be less than 992 pixels (min desktop view)
       * Then we manually set to mobile
       */
      browser.driver.manage().window().setSize(550, 650);
    }
  });

  it('Stumble To Phone Page', function () {
    browser.get('http://127.0.0.1:9001/').then(function () {
      var mobileMenuButton = element(by.xpath('//a[@e2eid="mobileMenuButton"]'));
      browser.wait(EC.elementToBeClickable(mobileMenuButton), 5000);
      mobileMenuButton.click().then(function () {
        var myTmobileButton = element(by.xpath('//a[@e2eid="myTmobileButton"]'));
        browser.wait(EC.elementToBeClickable(myTmobileButton), 5000);
        myTmobileButton.click().then(function () {
          browser.wait(EC.elementToBeClickable(myTmobileButton), 5000);
          util.scrollToElement(myTmobileButton);
          myTmobileButton.click();
        });
      });

      var shopButton = element.all(by.xpath('//a[@e2eid="leftLinkButton"]')).get(0);
      browser.wait(EC.elementToBeClickable(shopButton), 5000);
      util.scrollToElement(shopButton);
      shopButton.click().then(function () {
        var options = element.all(by.repeater('secondary in primary.secondaryLinks'));
        var i, option;
        for (i = 0; i < options.count(); i++) {
          option = options.get(i);
          browser.wait(EC.elementToBeClickable(option), 5000);
          browser.actions().mouseMove(option).perform();
        }
        var phones = element.all(by.repeater('secondary in primary.secondaryLinks')).get(0);
        browser.wait(EC.elementToBeClickable(phones), 5000);
        phones.click();
      });

    });
  });

  /* Don't Remove, this has some useful logic however unable to work with browser sync
  it('Browse Through Phones', function () {
    browser.pause();
    var sortBtn = element(by.xpath('//a[@e2eid="sort"]'));
    browser.wait(EC.elementToBeClickable(sortBtn), 10000);
    sortBtn.click();
    var i, option;
    //var options = element.all(by.repeater('sortOption in browseDevicesCtrl.sortOptions'));
    //browser.wait(EC.visibilityOf(options), 25000);
    for (i = 0; i < 9; i++) {
      element.all(by.xpath('//input[@id="sortOptions"]')).get(i).click();
    }
    element.all(by.xpath('//input[@id="sortOptions"]')).get(4).click();
    element.all(by.xpath('//input[@id="sortOptions"]')).get(7).click();
    element.all(by.xpath('//input[@id="sortOptions"]')).get(2).click();
    element.all(by.xpath('//input[@id="sortOptions"]')).get(5).click();
    element.all(by.xpath('//input[@id="sortOptions"]')).get(1).click();
    element.all(by.xpath('//input[@id="sortOptions"]')).get(3).click();
  });


  it('Browse through filters', function () {
    var sortBtn = element(by.xpath('//a[@e2eid="sort"]'));
    browser.wait(EC.elementToBeClickable(sortBtn), 10000);
    sortBtn.click();
    var filter = element(by.xpath('//a[@e2eid="filter"]'));
    browser.wait(EC.elementToBeClickable(filter), 5000);
    fitler.click();
  });


  it('Scroll through devices', function () {
    var device, i;
    var devices = element.all(by.repeater('browsedevice in browseDevicesCtrl.devices'));
    browser.wait(EC.visibilityOf(devices), 5000);
    for (i = 0; i < devices.count(); i++) {
      device = devices.get(i);
      util.scrollToElement(device);
    }
  });
  */

  it('Scroll through tablets', function () {
    var mobileMenuButton = element(by.xpath('//a[@e2eid="mobileMenuButton"]')), tablet, i;
    browser.wait(EC.elementToBeClickable(mobileMenuButton), 5000);
    util.scrollToElement(mobileMenuButton);
    mobileMenuButton.click().then(function () {
      var shopButton = element.all(by.xpath('//a[@e2eid="leftLinkButton"]')).get(0);
      browser.wait(EC.elementToBeClickable(shopButton), 5000);
      shopButton.click().then(function () {
        var tablets = element.all(by.repeater('secondary in primary.secondaryLinks')).get(1);
        tablets.click();
        /*
         tablets.click().then(function () {
         var tablets = element.all(by.repeater('device in browseDevicesCtrl.devices'));
         browser.wait(EC.visibilityOf(tablets), 5000);
         for (i = 0; i < tablets.count(); i++) {
         tablet = tablets.get(i);
         util.scrollToElement(tablet);
         }
         });*/
      });
    });
  });

  it('Scroll through accessories', function () {
    var mobileMenuButton = element(by.xpath('//a[@e2eid="mobileMenuButton"]')), acc, i;
    browser.wait(EC.elementToBeClickable(mobileMenuButton), 5000);
    util.scrollToElement(mobileMenuButton);
    mobileMenuButton.click().then(function () {
      var shopButton = element.all(by.xpath('//a[@e2eid="leftLinkButton"]')).get(0);
      browser.wait(EC.elementToBeClickable(shopButton), 5000);
      shopButton.click().then(function () {
        var accLink = element.all(by.repeater('secondary in primary.secondaryLinks')).get(2);
        accLink.click();
        /*
         accLink.click().then(function () {
         var accs = element.all(by.repeater('accessory in browseAccessoriesCtrl.accessories'));
         browser.wait(EC.visibilityOf(tablets), 5000);
         for (i = 0; i < accs.count(); i++) {
         acc = accs.get(i);
         util.scrollToElement(acc);
         }
         });
         */
      });
    });
  });

  it('Bring your own device', function () {
    var mobileMenuButton = element(by.xpath('//a[@e2eid="mobileMenuButton"]')), i;
    browser.wait(EC.elementToBeClickable(mobileMenuButton), 5000);
    util.scrollToElement(mobileMenuButton);
    mobileMenuButton.click().then(function () {
      var shopButton = element.all(by.xpath('//a[@e2eid="leftLinkButton"]')).get(0);
      browser.wait(EC.elementToBeClickable(shopButton), 5000);
      shopButton.click().then(function () {
        var BYODLink = element.all(by.repeater('secondary in primary.secondaryLinks')).get(3);
        BYODLink.click().then(function () {
          var imeiField = element(by.xpath('//input[@id="imei"]'));
          browser.wait(EC.elementToBeClickable(imeiField), 5000);
          util.scrollToElement(imeiField);
          imeiField.sendKeys('1234567890123456');
          browser.sleep(1000);

          var checkCarrier = element(by.xpath('//a[@href="/byod/checkCarrier"]'));
          browser.wait(EC.elementToBeClickable(checkCarrier), 5000);
          util.scrollToElement(checkCarrier);
          checkCarrier.click();
          browser.sleep(1000);

          var questions = element(by.xpath('//a[@href="/byod/questions"]'));
          browser.wait(EC.elementToBeClickable(questions), 5000);
          util.scrollToElement(questions);
          questions.click();
          browser.sleep(1000);
        });
      });
    });
  });

  it('Data plan only', function () {
    var mobileMenuButton = element(by.xpath('//a[@e2eid="mobileMenuButton"]'));
    browser.wait(EC.elementToBeClickable(mobileMenuButton), 5000);
    util.scrollToElement(mobileMenuButton);
    mobileMenuButton.click().then(function () {
      var plansButton = element.all(by.xpath('//a[@e2eid="leftLinkButton"]')).get(1);
      browser.wait(EC.elementToBeClickable(plansButton), 5000);
      plansButton.click().then(function () {
        var dataOnly = element.all(by.repeater('secondary in primary.secondaryLinks')).get(8);
        browser.wait(EC.elementToBeClickable(dataOnly), 5000);
        dataOnly.click().then(function () {
          var rowx = element(by.css('.rowx'));
          browser.wait(EC.elementToBeClickable(rowx), 5000);
          util.scrollToElement(rowx);
        });
      });
    });
  });

  it('Scroll through prepaid cards', function () {
    var mobileMenuButton = element(by.xpath('//a[@e2eid="mobileMenuButton"]')), card, i;
    browser.wait(EC.elementToBeClickable(mobileMenuButton), 5000);
    util.scrollToElement(mobileMenuButton);
    mobileMenuButton.click().then(function () {
      var shopButton = element.all(by.xpath('//a[@e2eid="leftLinkButton"]')).get(0);
      browser.wait(EC.elementToBeClickable(shopButton), 5000);
      shopButton.click().then(function () {
        var prepaidLink = element.all(by.repeater('secondary in primary.secondaryLinks')).get(4);
        prepaidLink.click().then(function () {
          var cards = element.all(by.repeater('refillCard in refillCardCtrl.refillCards'));
          //browser.wait(EC.visibilityOf(cards), 5000);
          for (i = 0; i < cards.count(); i++) {
            card = cards.get(i);
            //browser.wait(EC.visibilityOf(card), 5000);
            util.scrollToElement(card);
          }
        });
      });
    });
  });


  it('Pick a plan', function () {
    var mobileMenuButton = element(by.xpath('//a[@e2eid="mobileMenuButton"]')), device, acc, i;
    browser.wait(EC.elementToBeClickable(mobileMenuButton), 5000);
    util.scrollToElement(mobileMenuButton);
    mobileMenuButton.click().then(function () {
      var plansButton = element.all(by.xpath('//a[@e2eid="leftLinkButton"]')).get(1);
      browser.wait(EC.elementToBeClickable(plansButton), 5000);
      plansButton.click().then(function () {
        var indivLink = element.all(by.repeater('secondary in primary.secondaryLinks')).get(6);
        browser.wait(EC.elementToBeClickable(indivLink), 5000);
        indivLink.click().then(function () {
          var submit = element(by.xpath('//button[@ng-click="plansCtrl.onSelectButtonClicked()"]'));
          browser.wait(EC.elementToBeClickable(submit), 5000);
          util.scrollToElement(submit);
          submit.click().then(function () {
            element(by.xpath('//input[@name="nickName"]')).sendKeys('Catherine Zeta-Jones');
            var devices = element.all(by.repeater('data in carouselDevices'));
            browser.wait(EC.visibilityOf(devices), 5000);
            for (i = 0; i < devices.count(); i++) {
              device = devices.get(i);
              browser.wait(EC.visibilityOf(device), 5000);
              util.scrollToElement(device);
            }
            var accs = element.all(by.repeater('accessory in accessories'));
            for (i = 0; i < accs.count(); i++) {
              acc = accs.get(i);
              browser.wait(EC.visibilityOf(acc), 5000);
              util.scrollToElement(acc);
            }
            element(by.xpath('//button[@ng-click="addToCart()"]')).click().then(function () {
              var array = element.all(by.repeater('lineData in reviewCartCtrl.cartData.apiData.lines track by $index')), data;
              for (i = 0; i < array.count(); i++) {
                data = array.get(i);
                browser.wait(EC.visibilityOf(data), 5000);
                util.scrollToElement(data);
              }
              var checkout = element(by.xpath('//button[@ng-click="reviewCartCtrl.checkoutOnClick()"]'));
              browser.wait(EC.elementToBeClickable(checkout), 5000);
              util.scrollToElement(checkout);
            });
          });
        });
      });
    });
  });

  it('Pick a plan for family', function () {
    var mobileMenuButton = element(by.xpath('//a[@e2eid="mobileMenuButton"]'));
    browser.wait(EC.elementToBeClickable(mobileMenuButton), 5000);
    util.scrollToElement(mobileMenuButton);
    mobileMenuButton.click().then(function () {
      var plansButton = element.all(by.xpath('//a[@e2eid="leftLinkButton"]')).get(1);
      browser.wait(EC.elementToBeClickable(plansButton), 5000);
      plansButton.click().then(function () {
        var familyLink = element.all(by.repeater('secondary in primary.secondaryLinks')).get(7);
        browser.wait(EC.elementToBeClickable(familyLink), 5000);
        familyLink.click().then(function () {
          var addLine = element(by.xpath('//a[@ng-click="disableAdd || addTile();"]'));
          browser.wait(EC.elementToBeClickable(addLine), 5000);
          util.scrollToElement(addLine).then(function () {
            var carousel = element(by.css('.mycarousel'));
            util.scrollToElement(carousel);
          });
        });
      });
    });
  });

  it('Pick a plan', function () {
    var mobileMenuButton = element(by.xpath('//a[@e2eid="mobileMenuButton"]')), device, acc, i;
    browser.wait(EC.elementToBeClickable(mobileMenuButton), 5000);
    util.scrollToElement(mobileMenuButton);
    mobileMenuButton.click().then(function () {
      var plansButton = element.all(by.xpath('//a[@e2eid="leftLinkButton"]')).get(1);
      browser.wait(EC.elementToBeClickable(plansButton), 5000);
      plansButton.click().then(function () {
        var indivLink = element.all(by.repeater('secondary in primary.secondaryLinks')).get(6);
        browser.wait(EC.elementToBeClickable(indivLink), 5000);
        indivLink.click().then(function () {
          var submit = element(by.xpath('//button[@ng-click="plansCtrl.onSelectButtonClicked()"]'));
          browser.wait(EC.elementToBeClickable(submit), 5000);
          util.scrollToElement(submit);
          submit.click().then(function () {
            element(by.xpath('//input[@name="nickName"]')).sendKeys('Catherine Zeta-Jones');
            var devices = element.all(by.repeater('data in carouselDevices'));
            browser.wait(EC.visibilityOf(devices), 5000);
            for (i = 0; i < devices.count(); i++) {
              device = devices.get(i);
              browser.wait(EC.visibilityOf(device), 5000);
              util.scrollToElement(device);
            }
            var accs = element.all(by.repeater('accessory in accessories'));
            for (i = 0; i < accs.count(); i++) {
              acc = accs.get(i);
              browser.wait(EC.visibilityOf(acc), 5000);
              util.scrollToElement(acc);
            }
            element(by.xpath('//button[@ng-click="addToCart()"]')).click().then(function () {
              var array = element.all(by.repeater('lineData in reviewCartCtrl.cartData.apiData.lines track by $index')), data;
              for (i = 0; i < array.count(); i++) {
                data = array.get(i);
                browser.wait(EC.visibilityOf(data), 5000);
                util.scrollToElement(data);
              }
              var checkout = element(by.xpath('//button[@ng-click="reviewCartCtrl.checkoutOnClick()"]'));
              browser.wait(EC.elementToBeClickable(checkout), 5000);
              util.scrollToElement(checkout);
            });
          });
        });
      });
    });
  });


});


