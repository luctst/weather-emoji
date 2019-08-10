export default class WeatherEmoji {
	constructor(apiKey) {
		this._apiKey = apiKey;
		this._apiUrl = "https://api.openweathermap.org/data/2.5/weather";
		this.emojiList = {
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
	 * @param {Boolean} celsius Indicate if you want either the temperatur in celsius or farenheit.
	 * @returns {Promise}
	 */
	getWeather(location, celsius) {
		return new Promise((resolve, reject) => {
			/* eslint-disable no-undef */
			fetch(
				/* eslint-enable no-undef */
				`${this._apiUrl}?q=${location}&units=${celsius ? "metric" : "imperial"}&appid=${
					this._apiKey
				}`
			)
				.then(data => data.json())
				.then(dataParsed => {
					if (dataParsed.cod !== 200) {
						reject(new TypeError(dataParsed.message));
					} else {
						resolve({
							code: parseInt(dataParsed.cod),
							details: dataParsed.weather[0].description,
							emoji: this.getEmoji(dataParsed.weather[0].icon),
							temperature: {
								actual: dataParsed.main.temp,
								max: dataParsed.main.temp_max,
								min: dataParsed.main.temp_min
							},
							location: dataParsed.name
						});
					}
				})
				.catch(err => new Error(err));
		});
	}

	getEmoji(iconId) {
		// Si l'emojilist de iconid contient la proprieté emoji pas besoin de substr return l'emoji.
		// Sinon parse la string pour savoir si on doit retourner l'emoji de nuit ou de jour.
	}
}
