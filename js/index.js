var searchForm = document.querySelector('#searchForm')
var searchBar = document.querySelector('#searchbar')
var weather = document.querySelector('#weather')


//Todays Variables
var currentCity = document.querySelector('#currentCity');
var currentDay = document.querySelector('#currentDay');
var currentTemp = document.querySelector('#currentTemp');
var currentWind = document.querySelector('#currentWind');
var currentHumid = document.querySelector('#currentHumidity');
var currentUV = document.querySelector('#currentUV');

//day 1 Variables
var date1 = document.querySelector('#date1');
var temp1 = document.querySelector('#temp1');
var wind1 = document.querySelector('#wind1');
var humid1 = document.querySelector('#humid1');


//day 2 variables
var date2 = document.querySelector('#date2');
var temp2 = document.querySelector('#temp2');
var wind2 = document.querySelector('#wind2');
var humid2 = document.querySelector('#humid2');


//day 3 variables
var date3 = document.querySelector('#date3');
var temp3 = document.querySelector('#temp3');
var wind3 = document.querySelector('#wind3');
var humid3 = document.querySelector('#humid3');


//day 4 variables
var date4 = document.querySelector('#date4');
var temp4 = document.querySelector('#temp4');
var wind4 = document.querySelector('#wind4');
var humid4 = document.querySelector('#humid4');


//day 5 variables
var date5 = document.querySelector('#date5');
var temp5 = document.querySelector('#temp5');
var wind5 = document.querySelector('#wind5');
var humid5 = document.querySelector('#humid5');

//city input
var city;  
weather.setAttribute("style", "display: none")

var citySearch = function (event) {
    event.preventDefault();
    
    city = searchBar.value.trim();
    console.log(city)
    if (city) {
        getCityInfo(city);
        weather.setAttribute("style", "display: ")
    } else {
        alert('Please enter a city');
    }
};
searchForm.addEventListener('submit', citySearch);

var APIkey = "0f7b2671d84d4263d0426b6761720557";


//  get city info

function getCityInfo() {
    var getWeatherInfo = "https://api.openweathermap.org/data/2.5/weather?q=" + city + "&appid=" + APIkey;
    fetch(getWeatherInfo)
    .then(function (response) {
        return response.json();
    })
    .then(function (data) {
        var lon = data.coord.lon;
        var lat = data.coord.lat;
        
        var getWeatherInfo2 = "https://api.openweathermap.org/data/2.5/onecall?lat=" + lat + "&lon=" + lon + "&units=imperial&exclude=minutely,hourly,alerts&appid=" + APIkey;
            fetch(getWeatherInfo2)  //use lat and lon to get 5 day weather info and place into els
                .then(function (response) {
                    return response.json();
                }) 
                .then(function (data) {
                console.log(data)
                //add to current day
                    currentDay.textContent = city.charAt(0).toUpperCase() + city.slice(1);
                    currentDay.textContent = moment.unix(data.current.dt).format("MM-DD-YY");
                    currentTemp.textContent = "Temperature: " + data.current.temp + " Deg F";
                    currentWind.textContent = "Wind-Speed: " + data.current.wind_speed + "mph";
                    currentHumid.textContent = "Humidity: " + data.current.humidity + "%";
                    currentUV.textContent = "UV Index: " + data.current.uvi;
                //add first day
                    date1.textContent = moment.unix(data.daily[1].dt).format("MM-DD-YY");
                    temp1.textContent = "Temp: " + data.daily[1].temp.day + "F";
                    wind1.textContent = "Wind: " + data.daily[1].wind_speed + "mph";
                    humid1.textContent = "Humidity: " + data.daily[1].humidity + "%";
                //add second day
                    date2.textContent = moment.unix(data.daily[2].dt).format("MM-DD-YY");
                    temp2.textContent = "Temp: " + data.daily[2].temp.day + "F";
                    wind2.textContent = "Wind: " + data.daily[2].wind_speed + "mph";
                    humid2.textContent = "Humidity: " + data.daily[2].humidity + "%";
                //add third day
                    date3.textContent = moment.unix(data.daily[3].dt).format("MM-DD-YY");
                    temp3.textContent = "Temp: " + data.daily[3].temp.day + "F";
                    wind3.textContent = "Wind: " + data.daily[3].wind_speed + "mph";
                    humid3.textContent = "Humidity: " + data.daily[3].humidity + "%";
                //add fourth day
                    date4.textContent = moment.unix(data.daily[4].dt).format("MM-DD-YY");           
                    temp4.textContent = "Temp: " + data.daily[4].temp.day + "F";
                    wind4.textContent = "Wind: " + data.daily[4].wind_speed + "mph";
                    humid4.textContent = "Humidity: " + data.daily[4].humidity + "%";
                //add fifth day
                    date5.textContent = moment.unix(data.daily[5].dt).format("MM-DD-YY");
                    temp5.textContent = "Temp: " + data.daily[5].temp.day + "F";
                    wind5.textContent = "Wind: " + data.daily[5].wind_speed + "mph";
                    humid5.textContent = "Humidity: " + data.daily[5].humidity + "%";
                })

        })
    }

