const baseURL = 'https://api.weatherstack.com/forecast';
const key = '89c6f7e1459d3d440ba41d9192a90373';
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
    url = baseURL + '?access_key=' + key + '&query=' + searchTerm.value;
    console.log('Search Term', searchTerm.value);
    console.log('URL', url);

    fetch(url)
        .then(res => res.json())
        .then(json => displayResults(json));
}

function displayResults(json) {
    console.log(json);
    // Set location
    let city = json.location.name;
    let country = json.location.country;
    let region = json.location.region;
    let location;
    
    // Set state if within USA, otherwise use country
    if (country === 'United States of America') {
        location = city + ', ' + region;
    } else {
        location = city + ', ' + country;
    }
    console.log(location);

    // Set forecast
    let temp = json.current.temperature;
    let humidity = json.current.humidity;
    let precip = json.current.precip;
    let windSpeed = json.current.wind_speed;
    let windDirection = json.current.wind_dir;
    let weatherDesc = json.current.weather_descriptions[0];

    console.log(temp);
    console.log(humidity);
    console.log(windSpeed); 
    console.log(windDirection);
    console.log(weatherDesc);

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
    if (weatherDesc.includes('partly sunny') || weatherDesc.includes('Partly sunny')) {
        img.src = 'assets/partlyCloudy.svg';
    } else if (weatherDesc.includes('sunny') || weatherDesc.includes('Sunny')) {
        img.src = 'assets/sunny.svg';
        console.log('sunny baby');
    } else if (weatherDesc.includes('partly cloudy') || weatherDesc.includes('Partly cloudy')) {
        img.src = 'assets/partlyCloudy.svg';
    } else if (weatherDesc.includes('cloud') || weatherDesc.includes('Cloud')) {
        img.src = 'assets/cloudy.svg';
    } else if (weatherDesc.includes('rain') || weatherDesc.includes('Rain')) {
        img.src = 'assets/rainy.svg';
    } else if (weatherDesc.includes('Thunder')) {
        img.src = 'assets/thunder.svg'
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
    celsiusBtn.addEventListener('click', getCelsius);
    fahrenheitBtn.addEventListener('click', getFahrenheit);

    celsiusBtn.textContent = 'C';
    fahrenheitBtn.textContent = 'F';
    tempHeading.textContent = temp + '\xB0';
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

function getCelsius(e) {
    console.log(e);
}

// function getFahrenheit(e) {
//     console.log(e);
// }