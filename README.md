# The Period Purse

![React Native](https://img.shields.io/badge/react_native-%2320232a.svg?style=for-the-badge&logo=react&logoColor=%2361DAFB)

The Period Purse strives to achieve menstrual equity by providing people who menstruate with access to free menstrual products, and to reduce the stigma surrounding periods through public education and advocacy. This is their [website](https://www.theperiodpurse.com/).

## For Developers

The [wiki](https://github.com/uoftblueprint/the-period-purse/wiki) has a lot of relevant information related to branching, PRs, etc that you should review!

# Table of Contents
- [The Period Purse](#the-period-purse)
  - [For Developers](#for-developers)
- [Table of Contents](#table-of-contents)
- [Setup Local Environment (Mac)](#setup-local-environment-mac)
- [Installing Debugger](#installing-debugger)
  - [Running Debugger Notes](#running-debugger-notes)
- [SVG Color Change](#svg-color-change)
    - [Usage Example](#usage-example)
- [Setup Local Environment (Windows/Linux)](#setup-local-environment-windowslinux)
  - [Windows](#windows)
  - [Linux](#linux)
- [Common Setup Errors](#common-setup-errors)
- [VM Specific Errors](#vm-specific-errors)

<a name="setup-mac"></a>
# Setup Local Environment (Mac)

0. Prerequisites:

  Ensure you have the following prerequisites before trying to run the project locally:
  - Node.js and npm (https://nodejs.org/en/download/). Alternatively, check if you have this by using command ```node -v```
  - Once you have Node.js and npm, run command ```npm install -g expo-cli```
  - You will need an iOS simulator. If you have a Macbook, its recommended you install XCode from the app store as it has a built in iOS simulator. If you have a Windows machine, unfortunately you will have to install a virtual machine to run the iOS simulator.

2. Clone this repository using ```git clone https://github.com/uoftblueprint/the-period-purse.git```
3. cd into folder tpp-app ```cd ./tpp-app```
4. run ```npm install```
5. cd into folder ios ```cd ./ios```
6. Install pods ```pod install```
7. cd back out to tpp-app folder ```cd ..```
8. Run the project using ```npm run ios```
9. The simulator should open automatically and you should see something like the following image, with the Menstruation Nation app on the home screen:

<img width="378" alt="Screen Shot 2021-10-27 at 11 46 38 AM" src="https://user-images.githubusercontent.com/35851484/139100763-95605bfc-a224-401b-9f17-b3a5e0a3f3fb.png">

<a name="debugger"></a>
# Installing Debugger
1. Install Homebrew
2. run ```brew install --cask react-native-debugger```
3. Run project using ```npm run ios```
4. After simulator launches, go to "Device" > "Shake" to launch debugger
![image](https://user-images.githubusercontent.com/22108651/150660743-7a188d88-300d-4a12-8cfb-ef2712d0e506.png)
5. Launch the react-native debugger (It's a separate application that's not the browser) ![image](https://user-images.githubusercontent.com/63024415/152467946-b8ec8bef-a747-4039-b6f5-92b276ea8003.png)
6. Call ```showAsyncStorageContentInDev()``` in the react-native debugger console to see async storage

## Running Debugger Notes
* You need to close the debugger in your browser so you can use RND (React Native Debugger)
* After switching debuggers and/or turning on/off debug mode, you may need to reload the app (try via metro & via the app) for the debugger to work.
* If you're seeing the error message below, try restarting metro. If that doesn't fix it, then try rebuilding. ![image](https://user-images.githubusercontent.com/63024415/152467585-ce12bd5b-2c37-42a4-8363-1c9e78bbedb3.png)

<a name="setup-windows-linux"></a>
# Setup Local Environment (Windows/Linux)

## Windows
Menstruation Nation does not support development on Windows. You may choose to create a virtual machine with a tutorial like this: [video](https://www.youtube.com/watch?v=Q55e2Tz-818)

## Linux
Follow this [tutorial](https://www.youtube.com/watch?v=c30RLycIpVY)
