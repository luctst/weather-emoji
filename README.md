# Weather-emoji
[![Build Status](https://travis-ci.com/luctst/weather-emoji.svg?branch=master)](https://travis-ci.com/luctst/weather-emoji)
[![Dependencies](https://img.shields.io/david/luctst/weather-emoji.svg?style=popout-square)](https://david-dm.org/luctst/weather-emoji)
[![code style: prettier](https://img.shields.io/badge/code_style-prettier-ff69b4.svg?style=flat-square)](https://github.com/prettier/prettier)
[![Twitter](https://img.shields.io/twitter/follow/luctstt.svg?label=Follow&style=social)](https://twitter.com/luctstt)

*weather-emoji is a tiny module who return the weather of the area you enter and return an emoji who represent the temperature situation.*

## Usage
Install NodeJs and run
```bash
npm install -D weather-emoji
```

Then import the package.
```js
import WeatherEmoji from "weather-emoji"
```

> **Note** - We're using the [openweather API](https://openweathermap.org) to fetch the data, it requires that you created a key, click on the link to register and generate your key.

## API
### class WeatherEmoji
The WeatherEmoji class provide methods which returns an emoji representing the climatic situation of a city.

#### _apiKey
* Return `string` - Your API key it is recommended to hide this data to the client.

#### _apiUrl
* Return `string` - The url we're using to fetch the data.

#### getWeather(cityName, celsius)
This method fetch data about a city and return data and emoji about this city.

* `cityName` {string} - The city name to retrieve data.
* `celsius` {boolean} - If true the temperature will be in celsius format either in farenheit.
* Return a Promise which resolve if the `cityName is correct`.
	* `code` {number} Result status code.
	* `emoji` {string} The emoji.
	* `temperature` {object} Object with data about temperature.
		* `actual` {float} Actual temperature.
		* `max` {float} Maximum temperature.
		* `min` {float} Minimum temperature.

## Contributing
You've found an issue ? A new idea for the project and you want contribute ? It's nice, but before coding make sure you have read the [CONTRIBUTING.md](https://github.com/luctst/weather-emoji/blob/master/.github/CONTRIBUTING.md) file it is important.


## Licence
MIT [LucTst](https://github.com/luctst/weather-emoji/blob/master/.github/LICENSE)

<p style="font-size:8px;text-align:center;margin-top:50px;">File generated with <a href="https://github.com/luctst/get-good-readme">get-good-readme</a> module.</p>
