export default class WeatherEmoji {
	constructor(apiKey) {
		this._apiKey = apiKey;
		this._apiUrl = "https://api.openweathermap.org/data/2.5/weather";
	}

	/**
	 * Get the weather for a specific city.
	 * @param {String} location The city name where you want retrieve weather.
	 * @param {Boolean} celsius Indicate if you want either the temperatur in celsius or farenheit.
	 * @returns {Promise}
	 */
	getWeather(location, celsius) {
		return new Promise(resolve => {
			fetch(`${this._apiUrl}?q=${location}&units=${celsius ? "metric" : "imperial"}&appid=${this._apiKey}`)
			.then(data => data.json())
			.then(dataParsed => {
				if (dataParsed.cod !== 200) {
					resolve({
						code: parseInt(dataParsed.cod),
						message: dataParsed.message
					});
				} else {
					resolve({
						code: parseInt(dataParsed.cod),
						details: dataParsed.weather[0].description,
						emoji: "",
						temperature: {
							actual: dataParsed.main.temp,
							max: dataParsed.main.temp_max,
							min: dataParsed.main.temp_min
						},
						location: dataParsed.name
					});
				}
			})
			.catch(err => new Error(err))
		})
	}
};
