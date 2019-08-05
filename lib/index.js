module.exports = class WeatherEmoji {
	constructor(apiKey) {
		this._apiKey = apiKey;
		this._apiUrl = "https://api.openweathermap.org/data/2.5/weather";
	}

	getWeather(location) {
		fetch(`${this._apiUrl}?q=${location}&appid=${this._apiKey}`)
			.then(data => {
				const weatherData = data.json();
				return weatherData;
			})
			.catch(err => new Error(err));
	}
};
