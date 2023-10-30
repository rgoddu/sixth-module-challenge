var weatherAPIKey = "979d905b525cc1f3fdd4bdc9fb42db6a"
var temperatureTimeTaken = 12
var searchButton = $("#search-button")
searchButton.click(function(){
    var cityInput = $("input")
    var cityName = cityInput.val()
    getCoordinates(cityName)
    })
        function getCoordinates(cityName) {
        var coordinateURL = "http://api.openweathermap.org/geo/1.0/direct?q=" + cityName + "&limit=5&appid=" + weatherAPIKey
        
    fetch(coordinateURL)
        .then(function (response) {
            return response.json()
        })
        .then(function (data) {
            console.log( data)
            var latitude = data[0].lat
            var longitude = data[0].lon
            var coords = "lat=" + latitude + "&lon=" + longitude

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
                        console.log("temperature: " + temperature)
                        console.log(data.weather[0].description)
                        console.log("humidity " + data.main.humidity + "\n =======")
                        var currentTemp = $("#current-temp")
                        currentTemp.text("Temperature: " + temperature)
                        var currentHumidity = $("#current-humidity")
                        currentHumidity.text("Humidity: " + data.main.humidity)
                        var currentWind = $("#current-wind")
                        currentWind.text("Wind speed: " + data.wind.speed)
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

                            //checks to see if weather reporting is at the inputted time
                            var tempTimeDate = data.list[i].dt_txt
                            // console.log(tempTimeDate)
                            var forecastTime = dayjs(tempTimeDate).format("H")
                            // console.log(forecastTime)
                            if(forecastTime==temperatureTimeTaken){
                                var weekday = dayjs(tempTimeDate).format("dddd")
                                var dayInfo = Math.floor(i/8)
                                // console.log("number:" + dayInfo)
                                var weekdayContainer = $("#forecast-"+dayInfo)
                                weekdayContainer.text(weekday)
                                console.log(weekday)
                                console.log(data.list[i].main.temp)
                            }
    
                        }

                    })
            }
            getForecast()
        })
}
// getCoordinates()