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
4. Install packages from ```package.json``` using ```npm install```
5. Run the project using ```npm run ios```
6. The simulator should open automatically and you should see something like the following image, with the Menstruation Nation app on the home screen:

<img width="378" alt="Screen Shot 2021-10-27 at 11 46 38 AM" src="https://user-images.githubusercontent.com/35851484/139100763-95605bfc-a224-401b-9f17-b3a5e0a3f3fb.png">


## Setup Local Environment (Windows/Linux)

TODO

### Linux Setup
1. Follow this [tutorial](https://www.youtube.com/watch?v=c30RLycIpVY)

# Known Errors:
1. When trying to run project using ```npm run ios```, I see "Error: EMFILE: too many open files"
 - Ensure you have ```brew``` installed and run ```brew install watchmen```
 - Source: https://stackoverflow.com/questions/58675179/error-emfile-too-many-open-files-react-native-cli
2. Trying to run project using ```npm run ios```, I see 'error: unable to find utility "simctl", not a developer tool or in PATH'
- Go into ```Xcode > Preferences > Locations``` and assign the Command Line Tools (See below)

 ![image](https://user-images.githubusercontent.com/22108651/140590837-566276e4-9e8a-442b-ab8d-667911f6dad9.png)

- Source: https://stackoverflow.com/questions/29108172/how-do-i-fix-the-xcrun-unable-to-find-simctl-error
3. Trying to run project using ```npm run ios```, I see 'error: Failed to build iOS project. We ran "xcodebuild" command but it exited with error code 65'
-  Verify you have ```cocoapods``` installed. If you don't, run ```sudo gem install cocoapods```.
- Then:
  - run ```cd ios```
  - run ```pod install```
  - run ```cd .. ```
  - delete _build_ folder if it exists
  - run ```npm run ios```

- Source: https://stackoverflow.com/questions/55235825/error-failed-to-build-ios-project-we-ran-xcodebuild-command-but-it-exited-wit

## VM Errors
1. Trying to run project using ```npm run ios```, Simulator doesn't boot with error "Unable to boot device due to insufficient system memory. Simulated devices are not supported on systems with less than 4GB of physical memory"

![image](https://user-images.githubusercontent.com/22108651/140590847-3b75326c-29f7-48b9-9738-34ede501ae03.png)

- Increase RAM provided to your VM so that it's at least 4GB. You can also downgrade the phone model for the simulator to decrease RAM requirements.



2. [KVM Only / Linux Specific] The VM pauses after a short period of running, without any error in console.
- You're running out of space on your actual computer
- Source: https://www.howtoforge.com/community/threads/solved-kvm-qemu-ubuntu-16-04-vm-going-to-pause-state.76179/
