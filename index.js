const baseURL = 'https://api.weatherbit.io/v2.0/current';
const key = '9b2750ef12654f16a8c935749cf6a49f';
let url;

// SEARCH FORM
const searchTerm = document.querySelector('.search');
const searchForm = document.querySelector('form');
const submitBtn = document.querySelector('.submit');

// Add event listeners
searchForm.addEventListener('submit', getResults);

// RESULTS DIV
const results = document.querySelector('.results');
const wrapper = document.querySelector('.wrapper');

function getResults(e) {
    e.preventDefault();
    url = baseURL + '?city=' + searchTerm.value + '&key=' + key;
    console.log('URL', url);

    fetch(url)
        .then(res => res.json())
        .then(json => displayResults(json));
}

function displayResults(json) {
    console.log(json);
    // Set location
    let city = json.data[0].city_name;
    let country = json.data[0].country_code;
    let state = json.data[0].state_code;
    let location;
    
    // Set state if within USA, otherwise use country
    if (country === 'US') {
        location = city + ', ' + state;
    } else {
        location = city + ', ' + country;
    }
    console.log(location);

    // Set forecast
    let startingTemp = json.data[0].temp;
    let humidity = json.data[0].rh + '%';
    let precip = json.data[0].precip.toFixed(2) + ' mm/hr';
    let windSpeed = json.data[0].wind_spd.toFixed(2);
    let windDirection = json.data[0].wind_cdir;
    let weatherDesc = json.data[0].weather.description;
    let weatherCode = json.data[0].weather.code;

    // Create variables for converting temperature
    let currentTemp;
    let celsiusTemp;
    let fahrenheitTemp;

    console.log(startingTemp);
    console.log(humidity);
    console.log(precip);
    console.log(windSpeed); 
    console.log(windDirection);
    console.log(weatherDesc);
    console.log(weatherCode);

    // Remove children from results div before adding new search results
    while (results.firstChild) {
        results.removeChild(results.firstChild);
    }

    // Create elements
    let heading = document.createElement('h2');
    let img = document.createElement('img');
    let tempHeading = document.createElement('p');
    let tempDesc = document.createElement('p');
    let detailsContainer = document.createElement('div');
    let humidityText = document.createElement('p');
    let precipText = document.createElement('p');
    let windSpeedText = document.createElement('p');
    let fahrenheitBtn = document.createElement('button');
    let celsiusBtn = document.createElement('button');

    // Set img src and alt text
    if (weatherCode === 200 || weatherCode === 201 || weatherCode === 202 || weatherCode === 230 || weatherCode === 231 || weatherCode === 233) {
        img.src = 'assets/thunder.svg';
    } else if (weatherCode === 300 || weatherCode === 301 || weatherCode === 302 || weatherCode === 500 || weatherCode === 501 || weatherCode === 502 || weatherCode === 511 || weatherCode === 520 || weatherCode === 522) {
        img.src = 'assets/rainy.svg';
    } else if (weatherCode === 521) {
        img.src = 'assets/showerRain.svg';
    } else if (weatherCode === 600 || weatherCode === 601 || weatherCode === 602 || weatherCode === 610 || weatherCode === 611 || weatherCode === 612 || weatherCode === 621 || weatherCode === 622 || weatherCode === 623) {
        img.src = 'assets/snowy.svg';
    } else if (weatherCode === 800) {
        img.src = 'assets/sunny.svg';
    } else if (weatherCode === 801 || weatherCode === 802 || weatherCode === 803) {
        img.src = 'assets/partlyCloudy.svg'
    } else {
        img.src = 'assets/cloudy.svg';
    }
    img.alt = weatherDesc;

    // Set h2 text
    heading.textContent = location;

    // Create a class for the weather details
    detailsContainer.setAttribute('class', 'details');
    fahrenheitBtn.setAttribute('class', 'fahrenheit');
    celsiusBtn.setAttribute('class', 'celsius');

    // Set event listeners for dynamically created buttons
    celsiusBtn.addEventListener('click', () => {
        celsiusTemp = Math.round(json.data[0].temp);
        currentTemp = celsiusTemp + '\xB0C';
        tempHeading.textContent = currentTemp;
        console.log(celsiusTemp);
    });
    fahrenheitBtn.addEventListener('click', () => {
        fahrenheitTemp = Math.round(startingTemp * 9 / 5 + 32);
        currentTemp = fahrenheitTemp + '\xB0F';
        tempHeading.textContent = currentTemp;
        console.log(fahrenheitTemp);
    });

    celsiusBtn.textContent = '\xB0C';
    fahrenheitBtn.textContent = '\xB0F';
    tempHeading.textContent = Math.round(startingTemp) + '\xB0C';
    tempDesc.textContent = weatherDesc;
    humidityText.textContent = 'Humidity: ' + humidity;
    precipText.textContent = 'Precipitation: ' + precip;
    windSpeedText.textContent = 'Wind: ' + windSpeed  + ' ' + windDirection;

    // Append children to the details container
    detailsContainer.appendChild(tempDesc);
    detailsContainer.appendChild(tempHeading);
    detailsContainer.appendChild(celsiusBtn);
    detailsContainer.appendChild(fahrenheitBtn);
    detailsContainer.appendChild(humidityText);
    detailsContainer.appendChild(precipText);
    detailsContainer.appendChild(windSpeedText);
    
    // Append heading, weather icon, and weather details to the results div
    results.appendChild(heading);
    results.appendChild(img);
    results.appendChild(detailsContainer);
    
}

// function getCelsius(e) {
//     console.log(e);
// }

// function getFahrenheit(e) {
//     console.log(e);
// }