var searchBtn = document.getElementById('search-btn');
var searchInput = document.getElementById('search-input');
var currentInfo = document.getElementById('forecast');
var fiveDayInfo = document.getElementById('five-forecast');
var searchRow = document.getElementById('search-row');
var searchList = document.getElementById('search-list');
var curTemp = document.getElementById('temp-now')
var curWind = document.getElementById('wind-now')
var curHumid = document.getElementById('humidity-now')
var curUv = document.getElementById('uv-index')
var tempOne = document.getElementById('temp-one')
var tempTwo = document.getElementById('temp-two')
var tempThree = document.getElementById('temp-three')
var tempFour = document.getElementById('temp-four')
var tempFive = document.getElementById('temp-five')
var windOne = document.getElementById('wind-one')
var windTwo = document.getElementById('wind-two')
var windThree = document.getElementById('wind-three')
var windFour = document.getElementById('wind-four')
var windFive = document.getElementById('wind-five')
var humidOne = document.getElementById('humidity-one')
var humidTwo = document.getElementById('humidity-two')
var humidThree = document.getElementById('humidity-three')
var humidFour = document.getElementById('humidity-four')
var humidFive = document.getElementById('humidity-five')
var todayPic = document.getElementById('current-pic')
var picOne = document.getElementById('pic-one')
var picTwo = document.getElementById('pic-two')
var picThree = document.getElementById('pic-three')
var picFour = document.getElementById('pic-four')
var picFive = document.getElementById('pic-five')

var reveal = {
    visibility: 'visible'
};
var recentSearches = [];

var ApiKey = 'ccfd62c234470e9d19b15632c48dd5c2';



//Create function for saving to local storage and using location for search
var getCity = function() {
    var searchVal = searchInput.value;
    var geoApi = 'http://api.openweathermap.org/geo/1.0/direct?q=' + searchVal + '&limit=1&appid=' + ApiKey;
    
    
    localStorage.setItem('location', searchVal)
    localStorage.getItem(searchVal)
    // fetch the data from the city selected to get lon and lat
    fetch(geoApi)
    .then(function (response) {
        if (response.ok) {
            console.log(response);
            response.json().then(function(data) {
                console.log(data);
                console.log(data[0].lon);
                console.log(data[0].lat);
                // create variables for lat and lon to be used in the second API
                var lat = data[0].lat;
                var lon = data[0].lon;
                var weatherApi = 'https://api.openweathermap.org/data/2.5/onecall?lat=' + lat + '&lon=' + lon + '&units=imperial&exclude=minutely,hourly&appid=' + ApiKey;
                // fetch weather data
                return fetch(weatherApi).then(function (response1) {
                    if (response1.ok) {
                        response1.json().then(function(weatherData) {
                            console.log(weatherData)
                            // use data to fill in sections with corresponding info
                            curTemp.textContent = 'Temp: ' + weatherData.daily[0].temp.day + ' °F'
                            curWind.textContent = 'Wind: ' + weatherData.daily[0].wind_speed + ' MPH'
                            curHumid.textContent = 'Humidity: ' + weatherData.daily[0].humidity + ' %'
                            curUv.textContent = 'UV-Index: ' + weatherData.daily[0].uvi
                            tempOne.textContent = 'Temp: ' + weatherData.daily[1].temp.day + ' °F'
                            tempTwo.textContent = 'Temp: ' + weatherData.daily[2].temp.day + ' °F'
                            tempThree.textContent = 'Temp: ' + weatherData.daily[3].temp.day + ' °F'
                            tempFour.textContent = 'Temp: ' + weatherData.daily[4].temp.day + ' °F'
                            tempFive.textContent = 'Temp: ' + weatherData.daily[5].temp.day + ' °F'
                            windOne.textContent = 'Wind: ' + weatherData.daily[1].wind_speed + ' MPH'
                            windTwo.textContent = 'Wind: ' + weatherData.daily[2].wind_speed + ' MPH'
                            windThree.textContent = 'Wind: ' + weatherData.daily[3].wind_speed + ' MPH'
                            windFour.textContent = 'Wind: ' + weatherData.daily[4].wind_speed + ' MPH'
                            windFive.textContent = 'Wind: ' + weatherData.daily[5].wind_speed + ' MPH'
                            humidOne.textContent = 'Humidity: ' + weatherData.daily[1].humidity + ' %'
                            humidTwo.textContent = 'Humidity: ' + weatherData.daily[2].humidity + ' %'
                            humidThree.textContent = 'Humidity: ' + weatherData.daily[3].humidity + ' %'
                            humidFour.textContent = 'Humidity: ' + weatherData.daily[4].humidity + ' %'
                            humidFive.textContent = 'Humidity: ' + weatherData.daily[5].humidity + ' %'
                            // create variables for icon numbers
                            var curIcon = weatherData.daily[0].weather[0].icon
                            var iconOne = weatherData.daily[1].weather[0].icon
                            var iconTwo = weatherData.daily[2].weather[0].icon
                            var iconThree = weatherData.daily[3].weather[0].icon
                            var iconFour = weatherData.daily[4].weather[0].icon
                            var iconFive = weatherData.daily[5].weather[0].icon
                            console.log(curIcon)
                            // create img elements and assign them to a variable
                            var curImg = document.createElement('img');                                                        
                            var imgOne = document.createElement('img');
                            var imgTwo = document.createElement('img');
                            var imgThree = document.createElement('img');
                            var imgFour = document.createElement('img');
                            var imgFive = document.createElement('img');
                            // create a source to the images that use the icon numbers above
                            curImg.src = 'http://openweathermap.org/img/wn/' + curIcon + '@2x.png'
                            imgOne.src = 'http://openweathermap.org/img/wn/' + iconOne + '@2x.png'
                            imgTwo.src = 'http://openweathermap.org/img/wn/' + iconTwo + '@2x.png'
                            imgThree.src = 'http://openweathermap.org/img/wn/' + iconThree + '@2x.png'
                            imgFour.src = 'http://openweathermap.org/img/wn/' + iconFour + '@2x.png'
                            imgFive.src = 'http://openweathermap.org/img/wn/' + iconFive + '@2x.png'
                            // Append areas on html page to the images
                            todayPic.appendChild(curImg)
                            picOne.appendChild(imgOne);
                            picTwo.appendChild(imgTwo);
                            picThree.appendChild(imgThree);
                            picFour.appendChild(imgFour);
                            picFive.appendChild(imgFive);
                        })
                    }
                })
            })
        }
    })
    Object.assign(currentInfo.style, reveal)
    Object.assign(fiveDayInfo.style, reveal)
    
}



//Create function to store and set recently searched cities
var addSearch = function() {
    searchList.innerHTML = '';

    for (var i = 0; i < recentSearches.length; i++) {
        var search = recentSearches[i];

        var list = document.createElement('button');
        list.textContent = search;
        list.setAttribute('data-index', i);

        searchList.appendChild(list);
    }
}

var init = function () {
    var storedSearchs = JSON.parse(localStorage.getItem('Recent'));

    if (storedSearchs !== null) {
        recentSearches = storedSearchs;
    }

    addSearch();
}

var setSearch = function() {
    localStorage.setItem('Recent', JSON.stringify(recentSearches));
}

//

//Add event listener to search button and save information to local storage
searchBtn.addEventListener('click', function () {
    getCity();
    setSearch();
    addSearch();
});
