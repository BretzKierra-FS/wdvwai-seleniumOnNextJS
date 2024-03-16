require('chromedriver');
const { Builder, By, Key, until } = require('selenium-webdriver');

const driver = new Builder().forBrowser('chrome').build();

driver
  .get('http://localhost:3000/')
  .then(() => driver.getTitle())
  .then((titleText) => {
    console.log(`The title text is ${titleText}`);
    if (titleText.trim() === 'Home') {
      console.log("Title is 'Home'");
    } else {
      console.log("Title is not 'Home'");
    }
  })
  .then(() => driver.findElement(By.id('contactLink')).getText())
  .then((contactLinkText) => {
    console.log(`The text inside 'contactLink' is: ${contactLinkText}`);
  })
  .then(() => driver.findElement(By.id('contactLink')).click())
  .then(() => driver.wait(until.titleIs('Contact Us'), 1000))
  .then(() =>
    driver.findElement(By.id('formInput')).sendKeys('email@email.com')
  )
  .then(() => driver.findElement(By.id('formSubmit')).getAttribute('value'))
  .then((value) => {
    console.log(`The value attribute of the input element is: ${value}`);
  })
  .then(() => {
    driver.findElement(By.id('formSubmit')).click();
  })
  .then(() => driver.wait(until.elementLocated(By.id('formMessage')), 5000))
  .then(() => driver.findElement(By.id('formMessage')).getText())
  .then((text) => {
    console.log(text);
  })
  .then(() => driver.quit())
  .catch((error) => {
    console.error('An error occurred:', error);
    driver.quit();
  });
