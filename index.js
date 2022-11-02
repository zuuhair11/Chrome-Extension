// Getting the background image from the API
fetch("https://apis.scrimba.com/unsplash/photos/random?orientation=landscape&query=nature")
    .then(res => res.json())
    .then(data => {
        document.body.style.backgroundImage = `url(${data.urls.regular})`;
		document.getElementById("author").textContent = `By: ${data.user.name}`;
    })
    .catch(err => {
        document.body.style.backgroundImage = `url(https://images.unsplash.com/photo-1470813740244-df37b8c1edcb?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MnwxNDI0NzB8MHwxfHJhbmRvbXx8fHx8fHx8fDE2NjczMTU0NDk&ixlib=rb-4.0.3&q=80&w=1080)`
    })




// Getting the info from the Cryptocurrency API
fetch("https://api.coingecko.com/api/v3/coins/bitcoin")
    .then(res => {
        // If something went wrong I want to throw an error in catch
        if(!res.ok) {
            console.log(res.ok);
            console.log(res.status);
            throw Error('There was an error');
        }

        // If everything went well just keep up
        return res.json();
    })

    .then(data => {
        document.getElementById('crypto-top').innerHTML = `
            <img src="${data.image.small}">
            <span>${data.name}<span>
        `;
        document.getElementById('crypto').innerHTML += `
            <p>📌: $${data.market_data.current_price.usd}</p>
            <p>👆: $${data.market_data.high_24h.usd}</p>
            <p>👇: $${data.market_data.low_24h.usd}</p>
        `;
    })
    .catch(err => console.error(err))
    

// Getting the current time
function getCurrentTime() {
    const date = new Date()
    document.getElementById("time").textContent = date.toLocaleTimeString("en-us", {timeStyle: "short"})
}

setInterval(getCurrentTime, 1000);

/*
    * BaseURL: https://apis.scrimba.com/openweathermap/data/2.5/weather
    * Queries to include: 
    *     - lat (latitude)
    *     - lon (longitude)
    *     - units (imperial or metric)
*/

navigator.geolocation.getCurrentPosition(position => {
   const lat = position.coords.latitude;
   const lon = position.coords.longitude;
   
   fetch(`https://apis.scrimba.com/openweathermap/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric`)
        .then(res => {
            if(!res.ok) {
                throw Error('Weather data not available');
            }
            return res.json();
        })
        .then(data => {
            const iconUrl = `http://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`
            document.getElementById("weather").innerHTML = `
                <img src=${iconUrl} />
                <p class="weather-temp">${Math.round(data.main.temp)}º</p>
                <p class="weather-city">${data.name}</p>
            `;
        })
        .catch(err => console.log(err))
});