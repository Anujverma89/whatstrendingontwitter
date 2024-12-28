const {By, Browser, Builder,until} = require("selenium-webdriver")
const Chrome = require("selenium-webdriver/chrome")
const options = new Chrome.Options();
const { v4: uuidv4 } = require("uuid");
const os = require("os");


const scrapper = async function () {
    const password = "AlvidaDosto";
    const email = "sirgigoanuj7295@gmail.com";
    const username = "JollyBaba";
    let driver;
    try {
        driver = await new Builder()
            .forBrowser(Browser.CHROME)
            .setChromeOptions(options.addArguments('--start-maximized','--headless=new'))
            .build();
    } catch (e) {
        console.log(e);
    }
  
    try {
        await driver.get('https://httpbin.org/ip');
    
        // Wait for the page to load and get the IP address displayed on the page
       
        await driver.get("https://www.x.com/login");
        await driver.manage().setTimeouts({ implicit: 3000 });
  
        let userNameInput = await driver.findElement(By.css('input[type="text"]'));
        await userNameInput.sendKeys(email);
  
        let nextButton = await driver.findElement(By.xpath('//button[normalize-space()="Next"]'));
        await nextButton.click();
  
        await driver.manage().setTimeouts({ implicit: 3000 });
        let usernameDiv = await driver.findElement(By.css('input[name="text"]'));
        if (usernameDiv) {
            await usernameDiv.sendKeys(username);
        }
  
        let usernamenextButton = await driver.findElement(By.xpath('//button[normalize-space()="Next"]'));
        await usernamenextButton.click();
  
        await driver.manage().setTimeouts({ implicit: 2000 });
  
        let passwordDiv = await driver.findElement(By.css('input[type="password"]'));
        await passwordDiv.sendKeys(password);
  
        let loginButton = await driver.findElement(By.css('[data-testid = "LoginForm_Login_Button"]'));
        await loginButton.click();
  
        await driver.wait(until.elementsLocated(By.css('[aria-label="Timeline: Trending now"]')), 20000);
        await driver.navigate().to("https://x.com/explore/tabs/for-you");
  
        let trendingdiv = await driver.findElement(By.css('[aria-label="Timeline: Explore"]'));
        let firstChild = await trendingdiv.findElement(By.tagName("div"));
        let innerDivs = await firstChild.findElements(By.css('[data-testid="cellInnerDiv"]'));
  
        let trendingDict = {};
  
        for (let i = 0; i < 5; i++) {
            try {
                let firstdiv = await innerDivs[i].findElement(By.tagName("div"));
                let spandiv = await firstdiv.findElements(By.css('[dir="ltr"]'));
                let htmlContent = await spandiv[1].getText();
                trendingDict[i] = htmlContent;
            } catch (err) {
                console.log(`Error processing div ${i}: ${err}`);
            }
        }
        const endTime = new Date().toLocaleString("en-IN");
        let ipAddress = os.networkInterfaces().wlp4s0 ? os.networkInterfaces().wlp4s0[0].address : "N/A";
        let uniqueID = uuidv4();
        trendingDict["date"] = endTime;
        trendingDict["uid"] = uniqueID;
        trendingDict["ip"] = ipAddress;
        
        return trendingDict;
    } finally {
        if (driver) {
            await driver.quit();
        }
      
    }
 
}

module.exports = scrapper;