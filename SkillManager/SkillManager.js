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

misty.Debug("Skill Manager Starting...");

// Wake On Power On
misty.RunSkill("491186e3-2171-4822-97b8-b561ab0864aa");

// Handle Compliance
misty.RunSkill("2205303c-b520-40fd-886e-734f819fd9e6");

// Weather Eyes
misty.RunSkill("43587102-18f2-4be7-bf67-90a1a155de1b");



// More...
// misty.RunSkill("");