require("dotenv").config({debug: process.env.DEBUG});
import test from "ava";
import {get, createServer} from "http";
import WeatherEmoji from "../lib/index";
let server;

test.before("Launch server", async t => {
	server = createServer((req, res) => {
		res.end();
	}).listen(8000);
});

test("Simulate request on localhost:8000 to test weatherEmoji", t => {
	t.log(server);
	// let dataToTest;
	// get(`${server.url}/test`, res => {
	// 	res.on("data", d => {
	// 		dataToTest = d.toString();
	// 	}).on("end", () => {
	// 		t.log(dataToTest);
	// 		t.pass();
	// 	})
	// });
	t.pass();
});

test.after("Stop server", async t => {
	await server.close();
})
