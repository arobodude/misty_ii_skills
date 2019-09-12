// Ian's Weather Eyes Skill
// Created: August 27th, 2019
// Updated: September 12th, 2019
// 
// Tapping any of Misty's bumpers displays the current weather in icon form on her eyes
//
// Replace my weather API key with your own free current weather key from http://www.openweathermap.org
// API docs at: https://openweathermap.org/current


function _SendExternalRequest(data) {
    _data = JSON.parse(data.Result.ResponseObject.Data);

    _condition = _data.weather[0].description;
    _city = _data.name;
    _icon = _data.weather[0].icon;

    misty.Debug("Just letting you know it's " + _condition.toLowerCase() + " in " + _city + "!");

    switch(_icon) {
        case "01d": // Clear Sky
            misty.DisplayImage("sunny.png", 1);
            break;
        case "01n":
            misty.DisplayImage("moon.png", 1);
            break;
        case "02d": // Few Clouds
            misty.DisplayImage("cloudy_sun.png", 1);
            break;
        case "02n": 
            misty.DisplayImage("cloudy_moon.png", 1);
            break;
        case "03d": // Scattered Clouds
            misty.DisplayImage("cloudy.png", 1);
            break;
        case "03n": 
            misty.DisplayImage("cloudy.png", 1);
            break;
        case "04d": // Broken Clouds
            misty.DisplayImage("cloudy.png", 1);
            break;
        case "04n":
            misty.DisplayImage("cloudy.png", 1);
            break;
        case "09d": // Shower Rain
            misty.DisplayImage("rainy_sun.png", 1);
            break;
        case "09n":
            misty.DisplayImage("rainy_moon.png", 1);
            break;
        case "10d": // Rain
            misty.DisplayImage("rainy.png", 1);
            break;
        case "10n":
            misty.DisplayImage("rainy.png", 1);
            break;
        case "11d": // Thunderstorm
            misty.DisplayImage("rainy_lighting.png", 1);
            break;
        case "11n":
            misty.DisplayImage("rainy_lighting.png", 1);
            break;
        case "13d": // Snow
            misty.DisplayImage("snowing.png", 1);
            break;
        case "13n":
            misty.DisplayImage("snowing.png", 1);
            break;
        case "50d": // Mist
            misty.DisplayImage("mist.png", 1);
            break;
        case "50n":
            misty.DisplayImage("mist.png", 1);
            break;   
        default:
            misty.DisplayImage("e_DefaultContent.jpg", 1);
        }
    
    misty.Pause(10000);
    misty.DisplayImage("e_DefaultContent.jpg", 1);
}


function _checkWeather(data) {
    // Use your own zip code in the URL below
    misty.SendExternalRequest("GET","http://api.openweathermap.org/data/2.5/weather?zip=80301,us&APPID=130043fb9b9b18097d439d12b5bb680f");
}


misty.AddPropertyTest("BumpSensor", "isContacted", "==", true, "boolean");
misty.AddReturnProperty("BumpSensor", "sensorName");
misty.RegisterEvent("checkWeather", "BumpSensor", 200, true);


// Format of the JSON response from open weather map
/*{
    "coord":{"lon":-105.27,
             "lat":40.02},
    "weather":[{"id":800,
                "main":"Clear",
                "description":"clear sky",
                "icon":"01n"}],
    "base":"stations",
    "main":{"temp":295.66, 
            "pressure":1019,
            "humidity":20,
            "temp_min":292.04,
            "temp_max":298.71},
    "visibility":16093,
    "wind":{"speed":2.1,"deg":260},
    "clouds":{"all":1},
    "dt":1567482397,
    "sys":{"type":1,"id":3406,"message":0.0104,"country":"US","sunrise":1567427388,"sunset":1567474335},
    "timezone":-21600,
    "id":5574991,
    "name":"Boulder",
    "cod":200
}*/