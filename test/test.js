/**
 * We use puppeteer to simulate a chronium instance because our module will be runnning in the browser. With that we can now easily test our module with ava in a nodejs process.
 *
 * Because our module will run in the browser we need to use the ecmascript module with `export`, but NodeJs doesn't support for now this syntax so we use the `esm` package to transpile our `import WeatherEmoji ..` which import our module. into CommonJs syntax for nodejs to understand.
 *
 * So we indicate to ava which is our test runners to run some module before executing tests (see `ava.require` array in package.json file) so the `esm` package is runnning and read and parse our `package.main` file but return an error because we're using the `window.fetch` method, which is normal because `esm` is running in nodejs so the `fetch` method is undefined.
 * One solution is to use the `node-fetch` module who copies the features of window.fetch, so once downloaded we're using the `_require` file to import and attribute the value of `global.fetch` to the `node-fetch` package.
 */

require("dotenv").config({debug: process.env.DEBUG});
import test from "ava";
import puppeteer from "puppeteer";
import WeatherEmoji from "../lib/index";
let browser;
let page;

test.before("Launch the chronium instance", async t => {
	browser = await puppeteer.launch();
	page = await browser.newPage();

	page.on("console", async msg => {
		if (msg.text() === "JSHandle@object") {
			t.log(await msg.args()[0].jsonValue());
		} else {
			t.log(msg);
		}
	});
});

test("Check if getWeather() always return an object", async t => {
	const weatherEmoji = new WeatherEmoji(process.env.APIKEY);
	const testResolve = weatherEmoji.getWeather("paris", true).then(data => data);
	const testReject = weatherEmoji.getWeather("bordeaux", false).then(data => data);

	return Promise.all([testResolve, testReject.catch(err => err)]).then(values => {
		values.map(el => {
			if (typeof el !== "object") {
				t.log(el);
				return t.fail(`${el} is not an object`);
			}
		});

		return t.pass("getWeather return an object when resolve and reject.");
	})
});

test("Test in browser, when error check if return a TypeError object", async t => {
	await page.exposeFunction("weatherEmojiTest", async apiKey => {
		const weatherEmoji = new WeatherEmoji(apiKey);
		return await t.throwsAsync(weatherEmoji.getWeather("", true));
	});

	const result = await page.evaluate(apiKey => window.weatherEmojiTest(apiKey), process.env.APIKEY);

	result.code === 200 ? t.fail("Shouldn't return a valid object") : t.pass();
});

test("getEmoji return emoji", async t => {
	await page.exposeFunction("getEmoji", apiKey => {
		const weatherEmoji = new WeatherEmoji(apiKey);
		return weatherEmoji._getEmoji("01n");
	})

	const emoji = await page.evaluate(apiKey => window.getEmoji(apiKey), process.env.APIKEY);
	typeof emoji === "string" ? t.pass("getEmoji method return an emoji string") : t.fail();
});

test.after("Close the chronium instance", async t => {
	await browser.close();
})
