import * as dotenv from 'dotenv';
dotenv.config();
import { expect } from 'chai';
import { Builder, By, Key, until, WebDriver } from 'selenium-webdriver';

import { writeFileSync } from 'fs';

describe('Example test suite', function () {
  let driver: WebDriver;
  const clientURL = process.env.NODE_APP_CLIENT_APP_URL;
  const memberAccount: { email: string; password: string } = {
    email: process.env.NODE_APP_CLIENT_ACCOUNT_EMAIL as string,
    password: process.env.NODE_APP_CLIENT_ACCOUNT_PASSWORD as string,
  };

  before(async function () {
    driver = await new Builder().forBrowser('chrome').build();
  });

  after(async function () {
    await driver.quit();
  });

  it('should navigate to HELPO Client app', async function () {
    const resultDir = __dirname + '/test-result/images';
    // driver.set_window_size(1080,800)
    this.timeout(10000); // increase the timeout to 5000ms
    await driver.get(`${clientURL}/login`);
    // driver.manage().window().setSize(844, 390);
    const title = await driver.getTitle();
    expect(title).to.equal('HELPO-Telemedicine');

    // wait for a specific element to be visible on the page
    // wait for an element with the ID 'email' to be visible on the page
    const elementLoginEmail = await driver.wait(until.elementLocated(By.id('email')));
    await driver.wait(until.elementIsVisible(elementLoginEmail));
    const screenshotLoginPage = await driver.takeScreenshot();
    writeFileSync(`${resultDir}/001-login.png`, screenshotLoginPage, 'base64');

    // Enter text "webdriver" and perform keyboard action "Enter"
    await driver.findElement(By.name('email')).sendKeys(memberAccount.email);
    await driver.findElement(By.name('password')).sendKeys(memberAccount.password);
    await driver.findElement(By.className('rounded-full max-w-[50%] mx-auto bg-slate-900')).click();

    await driver.wait(until.urlContains('medicals'), 10000);
    const url = await driver.getCurrentUrl();
    expect(url).to.include('/medical');

    const elementHomeBtn = await driver.wait(
      until.elementLocated(By.className('mb-4 text-xl font-bold text-gray333')),
    );
    await driver.wait(until.elementIsVisible(elementHomeBtn));

    // const elementHomeBtn = await driver.wait(until.elementLocated(By.id('email')));
    // await driver.wait(until.elementIsVisible(loginEmailElement));
    // await driver.wait(
    //   until.elementTextContains(
    //     await driver.findElement(
    //       By.className(
    //         'w-full px-2 py-3 text-center text-white rounded-3xl  undefined bg-gradient-secondary',
    //       ),
    //     ),
    //     '過去の診療履歴',
    //   ),
    //   10000,
    // );
    // const elementText = await driver
    //   .findElement(By.className('mb-4 text-xl font-bold text-gray333 '))
    //   .getText();
    // expect(elementText).to.include('過去の診療履歴');

    // await driver.wait(until.elementTextContains);
    // await driver.wait(until.elementTextIs);
    // await driver.wait(until.elementTextMatches);

    const screenshotHome = await driver.takeScreenshot();
    writeFileSync(`${resultDir}/002-home.png`, screenshotHome, 'base64');

    // todo: selenium set localstorage javascript
  });
});
