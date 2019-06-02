const {Builder, By, until} = require('selenium-webdriver');


let webdriver = require('selenium-webdriver');
let chrome = require('selenium-webdriver/chrome');
let chromedriver = require('chromedriver');

let o = new chrome.Options();

chrome.setDefaultService(new chrome.ServiceBuilder(chromedriver.path).build());
o.addArguments('--disable-web-security');
o.addArguments('--safebrowsing-disable-download-protection');
o.addArguments('--remote-debugging-port=9222');
o.addArguments('--user-data-dir=/Users/eprokop/spring2019/cs244/cs244-webrtc-client/user-data-dir');
o.addArguments('--reduce-security-for-testing');
o.addArguments('--allow-http-screen-capture');
o.addArguments('--unsafely-treat-insecure-origin-as-secure=http://35.211.152.60');

(async function example() {
    let driver = await new Builder()
        .setChromeOptions(o)
        .forBrowser('chrome')
        .build();

    async function quit() {
        await driver.quit();
    }

    try {
        await driver.get('http://35.211.152.60:8080');
        // await driver.findElement(By.name('q'));.sendKeys('webdriver', Key.RETURN);
        // await driver.wait(until.titleIs('webdriver - Google Search'), 1000);
    } finally {
        setTimeout(quit, 3000);
        //await driver.quit();
    }
})();


//
// let Page = function() {
//     this.driver = new Builder()
//         .setChromeOptions(o)
//         .forBrowser('chrome')
//         .build();
//
//     // visit a webpage
//     this.visit = async function(theUrl) {
//         return await this.driver.get(theUrl);
//     };
//
//     // quit current session
//     this.quit = async function() {
//         return await this.driver.quit();
//     };
//
//     // wait and find a specific element with it's id
//     this.findById = async function(id) {
//         await this.driver.wait(until.elementLocated(By.id(id)), 15000, 'Looking for element');
//         return await this.driver.findElement(By.id(id));
//     };
//
//     // wait and find a specific element with it's name
//     this.findByName = async function(name) {
//         await this.driver.wait(until.elementLocated(By.name(name)), 15000, 'Looking for element');
//         return await this.driver.findElement(By.name(name));
//     };
//
//     // fill input web elements
//     this.write = async function (el, txt) {
//         return await el.sendKeys(txt);
//     };
// };
