require("dotenv").config({debug: process.env.DEBUG});
import test from "ava";
import {promisify} from "util";
import {get, createServer} from "http";
import WeatherEmoji from "../lib/index";
let server;

test.before("Launch server", t => {
	server = createServer().on('request', (req, res) => {
		const testWeather = new WeatherEmoji(process.env.APIKEY);
		res.setHeader("Content-application", "test/json");

		res.end(JSON.stringify(testWeather));
	}).listen(8000);
});

test("Simulate request on localhost:8000 to test weatherEmoji", async t => {
	get[promisify.custom] = options => {
		return new Promise((resolve, reject) => {
			get(options, result => {
				result.end = new Promise(resolve => result.on("end", resolve));
				resolve(result);
			}).on("error", reject);
		})
	}

	const getPromise = promisify(get);
	const test = await getPromise("http://localhost:8000");
	test.on("data", d => t.log(d.toString()));
	await test.end;
	t.pass();
});

test.after("Stop server", async t => {
	await server.close();
})
