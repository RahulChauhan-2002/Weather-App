const apiKey = "ef02b77dbd7b47ed8ae163301250202";
const apiUrl = "http://api.weatherapi.com/v1/current.json?key=";
const defaultCity = "Ghaziabad";

// Function to fetch and display weather data
async function checkWeather(city) {
    try {
        const response = await fetch(`${apiUrl}${apiKey}&q=${city}`);
        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }
        const data = await response.json();
        console.log(data);

        document.querySelector(".city").innerHTML = data.location.name;
        document.querySelector(".temp").innerHTML = `${data.current.temp_c}°C`;
        document.querySelector(".humidity").innerHTML = `${data.current.humidity}%`;
        document.querySelector(".wind").innerHTML = `${data.current.wind_kph} Km/h`;



        // Update weather icon dynamically
        document.querySelector(".weather-icon").src = data.current.condition.icon;

    } catch (error) {
        console.error("Error fetching weather data:", error);
    }
}

// Event listener for search button
document.querySelector(".search button").addEventListener("click", () => {
    const city = document.querySelector(".search input").value.trim();
    if (city) {
        checkWeather(city);
    }
});

// Event listener to detect input clearing and reset weather
document.querySelector(".search input").addEventListener("input", () => {
    if (document.querySelector(".search input").value.trim() === "") {
        checkWeather(defaultCity);
    }
});

// Call default weather on page load
checkWeather(defaultCity);
