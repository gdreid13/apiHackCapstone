function renderHomePage(city,country,airport) {
    return(`
    <h1> Welcome to ${city}, ${country} </h1>
    <div>
      <div class='container one'>
    
      </div>
  
      <div class='container two'>
        <div class='sub js-image'>

        </div>

        <div class='sub js-weather'>
          <h3>${airport}&nbsp;&nbsp; <i class="fa fa-thermometer"></i> </h3>
          <div class='weatherInfo'>
          </div>  
        </div>
  
        <div class='sub js-video'>
          <h3>Top 5 trending videos in ${country} </h3>
          <div id='videoList'></div>
        </div>
          
      </div> 
  
      <div class='container search'>
        <h2> Travel tools </h2>
        <p> Enter the date to explore your travel options </p>
        <form id='flight'>
          <input type='date' id='fromDate' required>
          <input type='date' id='toDate'>
          <br>
          <br>
          <input type='submit' value='Check Flight'>
          
        </form>
      </div>    
    

      <div class='container results'>
        <div class='flights'>

        </div>
        <div class='hotels'>
          
        </div>
      </div>
  
    </div>
   
    `)
  }

function displayVideo(response) {
  let array=response.items;
  let html= array.map(obj => `
  <div class='video'>    
    <iframe
    src="https://www.youtube.com/embed/${obj.id}"></iframe> 
    <div class='videoTitle'>${obj.snippet.title}</div>
  </div>`)
  html.join('');
  $('#videoList').html(html);
}

function displayWeather(response) {
  let cityName = response.name.toUpperCase();
  let description= response.weather[0].description.toUpperCase();
  let html= `
    <p class='date'> ${d} </p>
    <div class='currentTemp'> 
      <img src='http://openweathermap.org/img/wn/${response.weather[0].icon}@2x.png' alt='wxIcon'> 
      <p>${response.main.temp}<span>&#8451;</span></p>
    </div>
    <p> ${response.main['temp_min']}<span>&#8451;</span>/ ${response.main['temp_max']}<span>&#8451;</span> &nbsp;&nbsp; Feels like ${response.main['feels_like']}<span>&#8451;</span> </p>
    <p> ${description} &nbsp;&nbsp;Humidity ${response.main.humidity}% </p> `
  $('.weatherInfo').html(html);
}

function displayFlights(response) {
  let results=response.data;
  
  let html= results.map(obj=> 
    /*
    let desCityCode=obj.flyTo;
    let desCountry=obj.country.name;
    */
    `<div class='flight'>
      <input type='submit' value='$${obj.price}'>
      <div class='summary'>
        <p>${obj.cityFrom} &rarr; </p>
        <h2>${obj.cityTo}</h2>
        <p>${obj.countryTo.name}</p>
        <p>Duration: ${obj['fly_duration']}</p>
        <hr>
        <p>From: $${obj.price} on ${obj.airlines[0]}</p>
      </div>
    </div>` 
  )
  html.join('');
  $('.flights').html(`
    <h1> Top flight deals for you </h1>
    ${html}`);
}

/*
function renderHotelPage() {
  
}
*/
