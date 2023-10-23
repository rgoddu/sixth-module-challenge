var weatherAPIKey = "979d905b525cc1f3fdd4bdc9fb42db6a"
var cityName = "charlotte"
var coordinateURL = "http://api.openweathermap.org/geo/1.0/direct?q=" + cityName + "&limit=5&appid=" + weatherAPIKey
var temperatureTimeTaken = 12

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
            // localStorage.setItem("coords", coords)
            console.log(coords)



            // var cityCoordinates = localStorage.getItem("coords")

            var currentWeatherURL = "http://api.openweathermap.org/data/2.5/weather?" + coords + "&units=imperial&appid=" + weatherAPIKey
            var forecastURL = "http://api.openweathermap.org/data/2.5/forecast?" + coords + "&cnt&units=imperial&appid=" + weatherAPIKey
            
            function getWeather() {
                fetch(currentWeatherURL)
                    .then(function (response) {
                        return response.json()
                    })
                    .then(function (data) {
                        // var temperature = ((data.main.temp - 273.15) * 1.8) + 32
                        var temperature = data.main.temp
                        console.log("current weather \n ---------------")
                        console.log("wind speed " + data.wind.speed)
                        console.log("temp " + temperature)
                        console.log(data.weather[0].description)
                        console.log("humidity " + data.main.humidity + "\n =======")
                    })
            }
            getWeather()

            function getForecast() {
                fetch(forecastURL)
                    .then(function (response) {
                        return response.json()
                    })
                    .then(function (data) {
                        console.log(data)
                        console.log("city: " + data.city.name)
                        

                        for(var i = 0; i<data.list.length;i++){
                            var tempTimeDate = data.list[i].dt_txt
                            // console.log(tempTimeDate)
                            var forecastTime = dayjs(tempTimeDate).format("H")
                            // console.log(forecastTime)
                            if(forecastTime==temperatureTimeTaken){
                                console.log(data.list[i].main.temp)
                            }
    
                        }

                    })
            }
            getForecast()
        })
}
getCoordinates()