import * as dotenv from 'dotenv'
dotenv.config()

import { expect } from "chai";
import { Builder, By, Key, until, WebDriver } from "selenium-webdriver";

describe("Example test suite", function () {
  console.log(process.env)
  let driver: WebDriver;

  before(async function () {
    driver = await new Builder().forBrowser("chrome").build();
  });

  after(async function () {
    await driver.quit();
  });

  it("should navigate to Google.com", async function () {
    await driver.get("https://www.google.com/");
    const title = await driver.getTitle();
    expect(title).to.equal("Google");
  });
});
