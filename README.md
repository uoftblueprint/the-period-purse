# The Period Purse

The Period Purse strives to achieve menstrual equity by providing people who menstruate with access to free menstrual products, and to reduce the stigma surrounding periods through public education and advocacy. [website](https://www.theperiodpurse.com/)

## For Developers

The [wiki](https://github.com/uoftblueprint/the-period-purse/wiki) has a lot of relevant information related to branching, PRs, etc that you should review!

## Setup Local Environment (Mac) 

0. Prerequisites:

  Ensure you have the following prerequisites before trying to run the project locally: 
  - Node.js and npm (https://nodejs.org/en/download/). Alternatively, check if you have this by using command ```node -v```
  - Once you have Node.js and npm, run command ```npm install -g expo-cli```
  - You will need an iOS simulator. If you have a Macbook, its recommended you install XCode from the app store as it has a built in iOS simulator. If you have a Windows machine, unfortunately you will have to install a virtual machine to run the iOS simulator. This tutorial 
 
2. Clone this repository using ```git clone https://github.com/uoftblueprint/the-period-purse.git```
3. cd into folder /tpp-app
4. run ```npm install```
5. Run the project using ```npm run ios```
6. The simulator should open automatically and you should see something like the following image, with the Menstruation Nation app on the home screen:

<img width="378" alt="Screen Shot 2021-10-27 at 11 46 38 AM" src="https://user-images.githubusercontent.com/35851484/139100763-95605bfc-a224-401b-9f17-b3a5e0a3f3fb.png">


## Setup Local Environment (Windows/Linux)

### Linux
Follow this [tutorial](https://www.youtube.com/watch?v=c30RLycIpVY)
# Known Errors:
1. When trying to run project using ```npm run ios```, I see "Error: EMFILE: too many open files" 
 - Ensure you have ```brew``` installed and run ```brew install watchmen```
 - Source: https://stackoverflow.com/questions/58675179/error-emfile-too-many-open-files-react-native-cli

2. When trying to run project using ```npm run ios```, I see "error: unable to find utility 'simctl', not a developer tool or in PATH"
 - Go to ```Xcode > Preferences > Locations``` and assign the Command Line tools.
 - Source: https://stackoverflow.com/questions/29108172/how-do-i-fix-the-xcrun-unable-to-find-simctl-error

3. Ran ```npm run ios```, and you get 'error Failed to build iOS project. We ran "xcodebuild" command but it exited with error code 65'.
- If you don't have ```cocoapods``` installed, install it with ```sudo gem install cocoapods```. Then follow these steps:
  1. run ```cd ios```
  2. run ```pod install```
  3. run ```cd ..```
  4. delete _build_ folder
  5. run ```npm run ios``` 
- Source: https://stackoverflow.com/questions/55235825/error-failed-to-build-ios-project-we-ran-xcodebuild-command-but-it-exited-wit
## VM Specific
1. You run ```npm run ios```, and the simulator doesn't launch. See error below


![image](https://user-images.githubusercontent.com/22108651/140632364-a3bdaf36-33d2-4d5c-9dce-4d2fd1ec1656.png)
- Increase RAM allocated to the VM, or change which model you are simulating to on that requires less RAM

