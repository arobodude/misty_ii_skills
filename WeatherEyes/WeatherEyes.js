// Ian's Weather Eyes Skill
// Created: August 27th, 2019
// Updated: September 2nd, 2019
// 
// Tapping Misty's front bumpers displays the current weather on her eyes

//http://api.openweathermap.org/data/2.5/weather?q=Boulder&APPID=130043fb9b9b18097d439d12b5bb680f



function _SendExternalRequest(data) {
    _data = JSON.parse(data.Result.ResponseObject.Data);
    _condition = _data.weather[0].main;
    misty.Debug("Misty here! Just letting you know it's sunny in " + _condition);

    if(_condition == "Clear") {
        misty.DisplayImage("sunny.png", 1);
        misty.Pause(15000);
        misty.DisplayImage("e_DefaultContent.jpg", 1);
    }
}

function _checkWeather() {
    misty.SendExternalRequest("GET","http://api.openweathermap.org/data/2.5/weather?q=Boulder&APPID=130043fb9b9b18097d439d12b5bb680f");

    misty.RegisterTimerEvent("checkWeather", 10 * 60 * 1000, false);
}

_checkWeather();

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


// Display the skill name and current time as the skill is starting in your browsers console
/*misty.Debug("Hourly Chime Skill Running");
var today = new Date();
misty.Debug(today.toString());

while(1) {
    // Get the current date/time
    var today = new Date();

    var timeseconds = today.getSeconds();
    var timeminutes = today.getMinutes();
    var timehours = today.getHours();

    // Switch from 24 hour time to 12 hour
    if(timehours > 12) {
        timehours = timehours - 12;
    }

    // Show a debug message with the current time in hour:minute format
    misty.Debug(timehours + ":" + timeminutes);

    // Every hour play bells.wav the number of times of the hour. Eg. 2pm plays twice. 12pm plays 12 times. 3am plays 3 times.
    if(timeminutes == 0) {
        misty.Debug(timehours);
        for (i = 0; i < timehours; i++) {
            misty.PlayAudio("bells.wav", 100);
            misty.Pause(6000);
        }
        misty.Pause(60000);
    }
    misty.Pause(1000);
}*/