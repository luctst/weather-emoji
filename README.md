<div align="center">
  <a href="#">
  	<img src="https://media.giphy.com/media/JIX9t2j0ZTN9S/giphy-downsized.gif" alt="Logo project" height="160" />
  </a>
  <br>
  <br>
  <p>
    <b>weather-emoji</b>
  </p>
  <p>
     <i>weather-emoji is a tiny module who return the weather of the area you enter and return an emoji who represent the temperature situation.</i>
  </p>
  <p>

[![Build Status](https://travis-ci.com/luctst/weather-emoji.svg?branch=master)](https://travis-ci.com/luctst/weather-emoji)
[![NPM version](https://img.shields.io/npm/v/weather-emoji?style=flat-square)](https://img.shields.io/npm/v/weather-emoji?style=flat-square)
[![Package size](https://img.shields.io/bundlephobia/min/weather-emoji)](https://img.shields.io/bundlephobia/min/weather-emoji)
[![Dependencies](https://img.shields.io/david/luctst/weather-emoji.svg?style=popout-square)](https://david-dm.org/luctst/weather-emoji)
[![devDependencies Status](https://david-dm.org/luctst/weather-emoji/dev-status.svg?style=flat-square)](https://david-dm.org/luctst/weather-emoji?type=dev)
[![code style: prettier](https://img.shields.io/badge/code_style-prettier-ff69b4.svg?style=flat-square)](https://github.com/prettier/prettier)
[![Twitter](https://img.shields.io/twitter/follow/luctstt.svg?label=Follow&style=social)](https://twitter.com/luctstt)

  </p>
</div>

---

**Content**

* [Install](##install)
* [Exemples](##exemples)
* [API](##Api)
* [Contributing](##contributing)
* [Maintainers](##maintainers)

## Install 🐙
Install NodeJs and run
```bash
npm install -D weather-emoji
```

Then import the package.
```js
import WeatherEmoji from "weather-emoji"
```

> **Note** - We're using the [openweather API](https://openweathermap.org) to fetch the data, it requires that you create a key, click on the link to register and generate your key.

## Exemples 🖍
```js
import WeatherEmoji from "weather-emoji";
const weatherEmoji = new WeatherEmoji(secretApiKey);

const emojiParis = weatherEmoji.getWeather("paris", true).then(data => data);

console.log(emojiParis.emoji); // return emoji
```

Example with `async/await`.
```js
import WeatherEmoji from "weather-emoji";

(async () => {
	const weatherEmoji = new WeatherEmoji(secretApiKey);

	const emojiNewYork = await weatherEmoji.getWeather("new york", true);
	console.log(emojiNewYork.emoji);
})()
```

## API 👩‍💻
### new WeatherEmoji(apiKey)
The WeatherEmoji class provide methods and properties who return emoji and data representing the climatic situation of a city.

* `apiKey` {string} - Your api key generate by openweather api.

Return an object with methods and properties below:
#### _apiKey
* Return `string` - Your API key it is recommended to hide this data to the client.

#### _apiUrl
* Return `string` - The url we're using to fetch the data.

#### getWeather(cityName, celsius)
This method fetch data about a city and return data and emoji about this city.

* `cityName` {string} - The city name to retrieve data.
* `celsius` {boolean} default *true* - If false the temperature will be in farenheit.

Return a Promise which resolve if the `cityName` argument is correct.
* `code` {number} Result status code.
* `emoji` {string} The emoji.
* `temperature` {object} Object with data about temperature.
	* `actual` {float} Actual temperature.
	* `max` {float} Maximum temperature.
	* `min` {float} Minimum temperature.

## Contributing 🍰
Please make sure to read the [Contributing Guide](https://github.com/luctst/weather-emoji/blob/master/.github/CONTRIBUTING.md) before making a pull request.

Thank you to all the people who already contributed to this project!

## Maintainers 👷
List of maintainers, replace all `href`, `src` attributes by your maintainers datas.
<table>
  <tr>
    <td align="center"><a href="https://lucastostee.now.sh/"><img src="https://avatars3.githubusercontent.com/u/22588842?s=460&v=4" width="100px;" alt="Tostee Lucas"/><br /><sub><b>Tostee Lucas</b></sub></a><br /><a href="#" title="Code">💻</a></td>
  </tr>
</table>

## License ⚖️
MIT

---
<div align="center">
	<b>
		<a href="https://www.npmjs.com/package/get-good-readme">File generated with get-good-readme module</a>
	</b>
</div>
