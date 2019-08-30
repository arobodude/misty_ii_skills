// Ians Hourly Chime Skill
// August 27, 2019

misty.Debug("Hourly Chime Skill Running");

var today = new Date();
var time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
misty.Debug(time);


while(1) {
    var today = new Date();
    var timeseconds = today.getSeconds();
    var timeminutes = today.getMinutes();
    var timehours = today.getHours();
    
    misty.Debug(timeminutes);

    if(timeminutes == 0) {
        misty.Debug(timehours);
        for (i = 0; i < (timehours + 3); i++) {
            misty.PlayAudio("bells.wav", 100);
            misty.Pause(6000);
        }
        misty.Pause(60000);
    }
    misty.Pause(1000);
}