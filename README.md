# Setup Local Environment 

0. Prerequisites:

  Ensure you have the following prerequisites before trying to run the project locally: 
  - Node.js and npm (https://nodejs.org/en/download/). Alternatively, check if you have this by using command ```node -v```
  - Once you have Node.js and npm, run command ```npm install -g expo-cli```
 
2. Clone this repository using ```git clone https://github.com/uoftblueprint/the-period-purse.git```
3. cd into folder /tpp-app
4. Run the project using ```npm run ios```

Known Errors:
1. When trying to run project using ```npm run ios```, I see "Error: EMFILE: too many open files" 
 - Ensure you have ```brew``` installed and run ```brew install watchmen```
 - Source: https://stackoverflow.com/questions/58675179/error-emfile-too-many-open-files-react-native-cli
