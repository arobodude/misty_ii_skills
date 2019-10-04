/*
*    Copyright 2019 Misty Robotics, Inc.
*    Licensed under the Apache License, Version 2.0 (the "License");
*    you may not use this file except in compliance with the License.
*    You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
*
*    Unless required by applicable law or agreed to in writing, software
*    distributed under the License is distributed on an "AS IS" BASIS,
*    WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
*    See the License for the specific language governing permissions and
*    limitations under the License.
*/

registerActuatorPosition();

registerCapTouch();

misty.Set("inTouch", false);
misty.Set("roll", 0.0);
misty.Set("pitch", 0.0);
misty.Set("yaw", 0.0);

// Subscribing to Touch Sensor Information
function registerCapTouch() 
{
    // misty.AddReturnProperty("Touched", "sensorPosition");
    misty.AddReturnProperty("Touched", "IsContacted");
    misty.AddPropertyTest("Touched", "sensorPosition", "==", "Scruff", "string");
    misty.RegisterEvent("Touched", "TouchSensor", 0, true);
}

// We disengage Misty's head on when the handle on the back of the head is touched
function _Touched(data) 
{
    // var sensor = data.AdditionalResults[0];
    var isPressed = data.AdditionalResults[0];
    isPressed ? misty.Debug("Handle is Touched") : misty.Debug("Handle is Released");

    if (isPressed) 
    {
        misty.Set("inTouch", true);
        misty.RegisterTimerEvent("Disengage", 30, true);
    } 
    else
    {   
        misty.UnregisterEvent("Disengage");
        misty.Debug("Re-Engaging Head");
        
        // Next five lines are temporary and is needed today to handle a bug in our effective action runner
        var p = misty.Get("pitch") >= 0.0 ? misty.Get("pitch") - 10.0 : misty.Get("pitch") + 10.0
        var r = misty.Get("roll") >= 0.0 ? misty.Get("roll") - 10.0 : misty.Get("roll") + 10.0;
        var y = misty.Get("yaw") >= 0.0 ? misty.Get("yaw") - 10.0 : misty.Get("yaw") + 10.0;
        misty.MoveHeadDegrees(p, r, y, 10);
        misty.Pause(100);
        
        misty.MoveHeadDegrees(misty.Get("pitch"), misty.Get("roll"), misty.Get("yaw"), 40);
        misty.Set("inTouch", false);
    } 
}

function _Disengage() 
{
    misty.Halt();
    // misty.Debug("Halting");
}

// Event to track Misty's Head Position
function registerActuatorPosition() 
{
    misty.AddReturnProperty("Positions", "SensorId");
    misty.AddReturnProperty("Positions", "Value");
    misty.RegisterEvent("Positions", "ActuatorPosition", 400, true);
}

// Updates Misty's Head Position in the skill - Needed to reengage
function _Positions(data) 
{
    if (!misty.Get("inTouch")) 
    {
        if (data.AdditionalResults[0] == "ahy") misty.Set("yaw", data.AdditionalResults[1]);
        else if (data.AdditionalResults[0] == "ahp") misty.Set("pitch", data.AdditionalResults[1]);
        else if (data.AdditionalResults[0] == "ahr") misty.Set("roll", data.AdditionalResults[1]);
        else {}

    } else {}
}
