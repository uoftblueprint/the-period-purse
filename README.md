# The Period Purse

The Period Purse strives to achieve menstrual equity by providing people who menstruate with access to free menstrual products, and to reduce the stigma surrounding periods through public education and advocacy. [Website](https://www.theperiodpurse.com/)

## Setup Local Environment 

0. Prerequisites:

  Ensure you have the following prerequisites before trying to run the project locally: 
  - Node.js and npm (https://nodejs.org/en/download/). Alternatively, check if you have this by using command ```node -v```
  - Once you have Node.js and npm, run command ```npm install -g expo-cli```
  - You will need an iOS simulator. If you have a Macbook, its recommended you install XCode from the app store as it has a built in iOS simulator. If you have a Windows machine, unfortunately you will have to install a virtual machine to run the iOS simulator. This tutorial 
 
2. Clone this repository using ```git clone https://github.com/uoftblueprint/the-period-purse.git```
3. cd into folder /tpp-app
4. Run the project using ```npm run ios```
5. The simulator should open automatically and you should see something like the following image, with the Menstruation Nation app on the home screen:

<img width="378" alt="Screen Shot 2021-10-27 at 11 46 38 AM" src="https://user-images.githubusercontent.com/35851484/139100763-95605bfc-a224-401b-9f17-b3a5e0a3f3fb.png">

# Known Errors:
1. When trying to run project using ```npm run ios```, I see "Error: EMFILE: too many open files" 
 - Ensure you have ```brew``` installed and run ```brew install watchmen```
 - Source: https://stackoverflow.com/questions/58675179/error-emfile-too-many-open-files-react-native-cli
