weatherFetch=()=>{
    cityName=loc.value
    fetch(`https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=b41ec3be35c7dac8aabbc21ba253137a`).then(data=>data.json())
    .then(outputData=>displayData(outputData))
}
displayData=(data)=>{
    outTemp=data.main.temp
    outCity=cityName
    outHumidity=data.main.humidity
    outWindSpeed=data.wind.speed
    outMinTemp=data.main.temp_min
    outMaxTemp=data.main.temp_max
temp.innerHTML=Math.round(outTemp-273)+"°C"
city.innerHTML=`${outCity}`
humidity.innerHTML=` <img src="./images/pngwing.com.png" alt="">
<p>${outHumidity}%</p>
<p>Humidity</p>`
windspeed.innerHTML=`<img src="./images/wind-icon-png-1.jpg" class="img1" alt="">
<p>${outWindSpeed}m/s</p>
<h9>Wind Speed</h9>`
maxtemp.innerHTML=`
<h2>MaxTemp</h2>
 <p>${Math.round(outMinTemp-273)}°C</p>`
mintemp.innerHTML=`
<h2>MinTemp</h2>
<p>${Math.round(outMaxTemp-273)}°C</p>`

let weatherImage = document.getElementById("weatherImg")
if (data.weather[0].main=="Rain") {
    weatherImage.src = "./images/rain.png"
} else if (data.weather[0].main=="Clear") {
    weatherImage.src = "./images/4102326_cloud_sun_sunny_weather_icon (1).png"
} else if (data.weather[0].main=="Clouds") {
    weatherImage.src = "./images/4102326_cloud_sun_sunny_weather_icon (1).png"
} else if (data.weather[0].main=="Snow") {
    weatherImage.src = "./images/snow.png"
}

}



function findLoc(){
    const success=(position)=>{
    const latitude=position.coords.latitude;
    const longitude=position.coords.longitude;
    fetch(`https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${latitude}&longitude=${longitude}&localityLanguage=en`).then(result=>result.json())
    .then(data=>currentLocFetch(data))
    function currentLocFetch(fethedData){
        cityName=fethedData.locality
        fetch(`https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=b41ec3be35c7dac8aabbc21ba253137a`).then(data=>data.json())
        .then(outputData=>displayData(outputData))
    }
   }
   const error=()=>{
alert("unable to retrieve location")
   }
   navigator.geolocation.getCurrentPosition(success,error);
   
}
let currLoc=document.querySelector(".currentLoc")
currLoc.addEventListener("click",findLoc())

