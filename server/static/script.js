


function displaymain(temp,feel_temp,isday,locations) {
    document.getElementById('location-name').innerText = locations;
    document.getElementById('temperature').innerText = `${temp}°C`; 
    document.getElementById('feels-like').innerText = `feels like ${feel_temp}°C`; 

    const back = document.getElementById('weather-main');

    if (isday) {
        back.classList.add('day');
        back.classList.remove('night');
    } else {
        back.classList.add('night');
        back.classList.remove('day');
    }
}



function displayweather(temperature,humidity,rain,windspeed,winddirection) {
    const weatherGrid = document.getElementById('weather-fetch');

    // clear old weather 
    weatherGrid.innerHTML = '';

    // ad weather headers
    
    weatherGrid.innerHTML = `
        <div class="weather-item"><strong>Parameter</strong></div>
        <div class="weather-item"><strong>Value</strong></div>
    `;

    const weatherData = [
    
        { parameter: 'Temperature', value: `${temperature || 'N/A'}°C`,iconSrc: '../static/icons/reshot-icon-thermometer-W3PSGH2JNK.svg' },
        { parameter: 'Humidity', value: `${humidity || 'N/A'}%`,iconSrc: '../static/icons/reshot-icon-drops-liquid-LKG2B9TQMR.svg' },
        { parameter: 'Rain', value: `${rain || '0'}%`,iconSrc: '../static/icons/reshot-icon-cloud-rain-4SZ8AQ23JC.svg' },
        { parameter: 'Wind Speed', value: `${windspeed || 'N/A'}km\h`,iconSrc: '../static/icons/reshot-icon-windy-L3G8T9XEW5.svg' },
        { parameter: 'Wind Directions', value: `${winddirection || 'N/A'}°`,iconSrc: '../static/icons/compass-with-earth-cardinal-points-directions-svgrepo-com.svg' },
    
    ];

    weatherData.forEach(data => {
        weatherGrid.innerHTML += `
            <div class="weather-item">
                <img src="${data.iconSrc}" alt="${data.parameter} icon" class="weather-icon">
                ${data.parameter}
            </div>
            <div class="weather-item">${data.value}</div>
        `;
    });

}

    


// Handle form submission
document.getElementById('testform').addEventListener('submit', async function(event) {
    event.preventDefault();  // Prevent the default form submission

    const location = this.location.value;  // Get the location from the input field

    console.log(location)
    try {
        const response = await fetch('/location', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ location }) 
        });

        if (!response.ok) {
            throw new Error(weather.error || "Error retrieving data.");
        }

        const weather = await response.json();

        console.log(weather)
        displaymain(weather.temperature,weather.feel_temperature,weather.is_day,weather.locationname)
        displayweather(weather.temperature,weather.humidity,weather.rain,weather.wind_speed,weather.wind_direction,)

    } catch (error) {
        document.getElementById('weather-fetch').innerText = error.message;  // Display error
    }
});

