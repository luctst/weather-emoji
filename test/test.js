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
	const testResolve = await weatherEmoji.getWeather("paris");
	const testReject = await weatherEmoji.getWeather("bordeaux", false);
	const isPlainObject = obj => Object.prototype.toString.call(obj) === '[object Object]';

	if (isPlainObject(testResolve) && isPlainObject(testReject)) {
		return t.pass("getWeather return an object when resolve and reject.");
	}

	return t.fail();
});

test("Test in browser, check if return an error when city is not found or incorrect", async t => {
	await page.exposeFunction("weatherEmojiTest", async apiKey => {
		const weatherEmoji = new WeatherEmoji(apiKey);
		// Use throwsAsync fn here because the test will not pass because the fn return promise.reject().
		return await t.throwsAsync(async () => {
			return await weatherEmoji.getWeather("fkgjdflgj")
		}, {
			instanceOf: TypeError
		});
	});

	await page.evaluate(apiKey => window.weatherEmojiTest(apiKey), process.env.APIKEY);
});

test.skip("Check if weatherEmoji return a good format object.", async t => {
	const expected = [
		{propsName: "code", type: "number"},
		{propsName: "details", type: "string"},
		{propsName: "emoji", type: "string"},
		{propsName: "temperature", type: "object"},
		{propsName: "actual", type: "number"},
		{propsName: "max", type: "number"},
		{propsName: "min", type: "number"},
		{propsName: "location", type: "string"}
	];

	await page.exposeFunction("getEmoji", apiKey => {
		return new WeatherEmoji(apiKey).getWeather("paris");
	})

	const response = await page.evaluate(apiKey => window.getEmoji(apiKey), process.env.APIKEY);

	expected.forEach(item => {
		if (!response[item.propsName]) {
			t.fail(`The ${item.propsName} is not defined`);
			console.log(response[item.propsName]);
		}
	});
});

test.after("Close the chronium instance", async t => {
	await browser.close();
})
