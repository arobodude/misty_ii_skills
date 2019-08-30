// Sends a message to debug listeners
misty.Debug("The HelloWorld skill is starting!");

// Returns a random integer between min and max
function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

// The look_around timer event invokes this callback function. Change
// the value of repeat to false if Misty should only move her head once.
function _look_around(repeat = true) {

    // Moves Misty's head to a random position. Adjust the min/max
    // values passed into getRandomInt() to change Misty's range of
    // motion when she calls this method.
    misty.MoveHeadPosition(
        getRandomInt(-3, 3), // Random pitch position between -3 and 3
        getRandomInt(-3, 3), // Random roll position between -3 and 3
        getRandomInt(-3, 3), // Random yaw position between -3 and 3
        100); // Head movement velocity. Decrease for slower movement.

        // If repeat is set to true, re-registers for the look_around
        // timer event, and Misty moves her head until the skill ends.
        if (repeat) misty.RegisterTimerEvent(
        "look_around",
        getRandomInt(1, 5) * 1000,
        false);
}

// The breathingLED timer event invokes this callback function.
function _breathingLED() {
    // Values used to modify the RGB intensity of Misty's chest LED.
    // Change these to use a different starting color for the LED.
    var red = 140 / 20.0;
    var green = 0 / 20.0;
    var blue = 220 / 20.0;

    // Incrementally DECREASES the intensity of each color in the LED
    for (var i = 20; i >= 0; i = i - 1) {
        misty.ChangeLED(
            Math.floor(i * red), // red intensity
            Math.floor(i * green), // green intensity
            Math.floor(i * blue)); // red intensity
        // Pause before next iteration. Increase value for slower
        // breathing; decrease for faster breathing.
        misty.Pause(75);
    }

    // Incrementally INCREASES the intensity of each color in the LED
    for (var i = 0; i <= 20; i = i + 1) {
        misty.ChangeLED(
            Math.floor(i * red), // red intensity
            Math.floor(i * green), // green intensity
            Math.floor(i * blue)); // blue intensity
        // Pause before next iteration. Increase value for slower
        // breathing; decrease for faster breathing.
        misty.Pause(75);
    }
    // Re-registers for the breathingLED timer event, so Misty's LED
    // continues breathing until the skill ends.
    misty.RegisterTimerEvent("breathingLED", 1, false);
}

// Waves Misty's right arm!
function waveRightArm() {
    misty.MoveArmDegrees("left", 90, 5); // Left arm fully down
    misty.MoveArmDegrees("right", 90, 5); // Right arm fully down
    misty.Pause(3000); // Pause for 3 seconds
    misty.MoveArmDegrees("right", -30, 5); // Right arm up
    misty.Pause(5000); // Pause with arm up for 5 seconds (wave!)
    misty.MoveArmDegrees("right", 90, 10); // Right arm fully down
}


// Invoke this function to start Misty recognizing faces.
function _registerFaceRec() {
    // Cancels any face recognition that's currently underway
    misty.StopFaceRecognition();
    // Starts face recognition
    misty.StartFaceRecognition();
    // If a FaceRecognition event includes a "PersonName" property,
    // then Misty invokes the _FaceRec callback function.
    misty.AddPropertyTest("FaceRec", "PersonName", "exists", "", "string");
    // Registers for FaceRecognition events. Sets eventName to FaceRec,
    // debounceMs to 1000, and keepAlive to false.
    misty.RegisterEvent("FaceRec", "FaceRecognition", 1000, false);
}

// FaceRec events invoke this callback function.
function _FaceRec(data) {
    // Stores the value of the detected face
    var faceDetected = data.PropertyTestResults[0].PropertyValue;
    // Logs a debug message with the label of the detected face
    misty.Debug("Misty sees " + faceDetected);

    // Use the Command Center to train Misty to recognize your face.
    // Then, replace <Your-Name> below with your own name! If Misty
    // sees and recognizes you, she waves and looks happy.
    if (faceDetected == "ian") {
        misty.DisplayImage("e_Joy2.jpg");
        misty.PlayAudio("s_Joy4.wav", 10);
        waveRightArm();
    }
    // If misty sees someone she doesn't know, she raises her eyebrow
    // and plays a different sound.
    else if (faceDetected == "unknown person") {
        misty.DisplayImage("e_Disgust.jpg");
        misty.PlayAudio("s_Joy.wav", 10);
    };

    // Register for a timer event to invoke the _registerFaceRec
    // callback function loop through the _registerFaceRec() again
    // after 7000 milliseconds pass.
    misty.RegisterTimerEvent("registerFaceRec", 7000, false);
}


// Registers for a timer event called breathingLED, and invokes the
// _breathingLED() callback after 1 millisecond.
misty.RegisterTimerEvent("breathingLED", 1, false);


// Registers for a timer event with called look_around, and invokes the
// _look_around() callback after 5000 - 10000 milliseconds.
misty.RegisterTimerEvent("look_around", getRandomInt(5, 10) * 1000, false);


// Plays an audio file at max volume.
misty.PlayAudio("s_PhraseHello.wav", 30);
// Pauses for 3000 milliseconds before executing the next command.
misty.Pause(3000);


// Starts Misty recognizing faces!
_registerFaceRec();