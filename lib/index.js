export default class WeatherEmoji {
	constructor(apiKey) {
		this._apiKey = apiKey;
		this._apiUrl = "https://api.openweathermap.org/data/2.5/weather";
		this._emojiList = {
			"01": { emojiNight: "🌚", emojiDay: "😎" },
			"02": { emojiNight: "🌑", emojiDay: "🌤" },
			"03": { emoji: "☁️" },
			"04": { emoji: "🌫" },
			"09": { emoji: "☔️" },
			"10": { emoji: "☂️" },
			"11": { emoji: "😱" },
			"13": { emoji: "⛷" },
			"50": { emoji: "👻" }
		};
	}

	/**
	 * Get the weather for a specific city.
	 * @param {String} location The city name where you want retrieve weather.
	 * @param {Boolean} [celsius] Indicate if you want either the temperature in farenheit.
	 * @return {Promise}
	 */
	getWeather(location, celsius = true) {
		const url = new URL(this._apiUrl);
		url.searchParams.append("q", location);
		url.searchParams.append("units", celsius ? "metric" : "imperial");
		url.searchParams.append("appid", this._apiKey);

		/* eslint-disable no-undef */
		return (
			fetch(url.toString())
				/* eslint-enable no-undef */
				.then(data => data.json())
				.then(dataParsed => {
					if (dataParsed.cod !== 200) {
						return Promise.reject(new TypeError(dataParsed.message));
					}

					return {
						code: parseInt(dataParsed.cod, 10),
						details: dataParsed.weather[0].description,
						emoji: this._getEmoji(dataParsed.weather[0].icon),
						temperature: {
							actual: dataParsed.main.temp,
							max: dataParsed.main.temp_max,
							min: dataParsed.main.temp_min
						},
						location: dataParsed.name
					};
				})
		);
	}

	/**
	 * Return an emoji.
	 *
	 * ! USER !!! Do not use this method directly.
	 *
	 * ? This method will be propably in the futur remove to be use as a closure directly in the `getWeather` method to keep it private because user shouldn't use it.
	 * @param {String} iconId A string return by the openweather api which will be parsed to return an emoji.
	 * @returns {String} Emoji string.
	 */
	_getEmoji(iconId) {
		const nightOrDay = iconId.slice(2);
		const id = iconId.slice(0, 2);

		if (this._emojiList[id].emoji) {
			return this._emojiList[id].emoji;
		} else if (nightOrDay === "n") {
			return this._emojiList[id].emojiNight;
		}

		return this._emojiList[id].emojiDay;
	}
}
