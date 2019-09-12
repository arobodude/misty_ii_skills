// Ian's Hourly Chime Skill
// Created: August 27th, 2019
// Updated: September 2nd, 2019
// 
// To set the correct time zone on your robot first use the Misty Companion app to get the IP of your robot.
// In your internet browser with you computer on the same wifi network go to http://ip_of_robot:8080
// Eg. http://192.168.100.135:8080
// Enter username: 'administrator' and the password printed on the label on the bottom of your robot.
// Go to "Device Settings" on the menu in the upper left. Then scroll down and set you "Time zone"


// Display the skill name and current time as the skill is starting in your browsers console
misty.Debug("Hourly Chime Skill Running");
var today = new Date();
misty.Debug(today.toString());

function _checkTimeLoop() {
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

    misty.RegisterTimerEvent("checkTimeLoop", 1000, false);
}

_checkTimeLoop();