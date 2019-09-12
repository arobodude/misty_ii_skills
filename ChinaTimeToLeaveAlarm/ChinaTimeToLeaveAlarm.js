// China Time to Leave Alarm Skill
// Developer: Ian Bernstein
// Created: August 28th, 2019
// Updated: September 2nd, 2019
// 
// To set the correct time zone on your robot first use the Misty Companion app to get the IP of your robot.
// In your internet browser with you computer on the same wifi network go to http://ip_of_robot:8080
// Eg. http://192.168.100.135:8080
// Enter username: 'administrator' and the password printed on the label on the bottom of your robot.
// Go to "Device Settings" on the menu in the upper left. Then scroll down and set you "Time zone"


// Display the skill name and current time as the skill is starting in your browsers console
misty.Debug("China Time to Leave Alarm Skill Running");
var today = new Date();
misty.Debug(today.toString());

function _checkTimeLoop() {
    // Get the current date/time
    var today = new Date();

    var timeminutes = today.getMinutes();
    var timehours = today.getHours();

    // Show a debug message with the current time in hour:minute format
    misty.Debug(timehours + ":" + timeminutes);

    // Plays the alarm at 17:55 (5:55pm) daily
    if((timehours == 17) && (timeminutes == 55)) {
        misty.PlayAudio("its_almost_time.wav", 100);
        misty.Pause(2000);
        misty.PlayAudio("car_horn.wav", 100);
        misty.Pause(1400);
        misty.PlayAudio("car_horn.wav", 100);
        misty.Pause(1400);
        misty.PlayAudio("car_horn.wav", 100);
        misty.Pause(1400);
        misty.PlayAudio("car_horn.wav", 100);
        misty.Pause(60000);
    }
    
    misty.RegisterTimerEvent("checkTimeLoop", 1000, false);
}

_checkTimeLoop();