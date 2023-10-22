var weatherAPIKey = "979d905b525cc1f3fdd4bdc9fb42db6a"
var cityName = "kiev"
var coordinateURL = "http://api.openweathermap.org/geo/1.0/direct?q=" + cityName + "&limit=5&appid=" + weatherAPIKey

function getCoordinates() {
    fetch(coordinateURL)
        .then(function (response) {
            return response.json()
        })
        .then(function (data) {
            console.log(data)
            latitude = data[0].lat
            longitude = data[0].lon
            var coords = "lat=" + latitude + "&lon=" + longitude
            localStorage.setItem("coords", coords)
            console.log(coords)

        })
}
getCoordinates()

var cityCoordinates = localStorage.getItem("coords")

var currentWeatherURL = "http://api.openweathermap.org/data/2.5/weather?" + cityCoordinates + "&appid=" + weatherAPIKey
var forecastURL = "http://api.openweathermap.org/data/2.5/forecast?" + cityCoordinates + "&appid=" + weatherAPIKey

function getWeather() {
    fetch(currentWeatherURL)
        .then(function (response) {
            return response.json()
        })
        .then(function (data) {
            console.log("current weather \n ---------------")
            console.log(data.wind.speed)
            console.log(data.main.temp)
            console.log(data.weather[0].description)
            console.log(data.main.humidity + "\n =======" )
        })
}
getWeather()

function getForecast() {
    fetch(forecastURL)
        .then(function (response) {
            return response.json()
        })
        .then(function (data) {
            console.log( data)
        })
}
getForecast()