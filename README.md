# The Period Purse

The Period Purse strives to achieve menstrual equity by providing people who menstruate with access to free menstrual products, and to reduce the stigma surrounding periods through public education and advocacy. [website](https://www.theperiodpurse.com/)

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
5. Launch the react-native debugger (It's a separate application)
6. Call ```showAsyncStorageContentInDev()``` in the react-native debugger console to see async storage

## Running Debugger Notes
* You need to close the debugger in your browser so you can use RND (React Native Debugger)
* After switching debuggers and/or turning on/off debug mode, you may need to reload the app (try via metro & via the app) for the debugger to work.

<a name="svg-color-change"></a>
# SVG Color Change
The `.svgrrc` file, found at the root of the project. The version of it at the time of writing is
```
{
  "replaceAttrValues": {
    "black": "{props.fill}"
  }
}
```
Essentially, we are telling `svg-react-native-transformer` to replace the color "black" in a .svg file we import with the `fill` property of the React Component that corresponds to the .svg file. As far as I can tell, this only allows you to alter the highest level of `fill` (i.e. the one defined in the `<svg>` tag).

This means you must set `fill` to `"black"` for any .svg file for which you want to change colours programatically.

**NOTE** that if you do this, you must have a `fill` property for your corresponding React Component, or else `fill` defaults to `none` and the svg won't show up.


See [this](https://github.com/kristerkari/react-native-svg-transformer#changing-svg-fill-color-in-js-code) for further explanation.

### Usage Example
Assume the .svg file below is saved as "logo.svg"
```html
  <svg fill="black"> </svg>
```

Import your .svg file inside a React component:

```javascript
import Logo from "./logo.svg";
```

You can then use your image as a component:

```javascript
<Logo fill={"#ff0000"} />
```

and the `fill` property in the svg file is functionally replaced by `#ff0000` when rendered. You can also set other properties like `width`, `height`, etc. You can also style it, as normal.


<a name="setup-windows-linux"></a>
# Setup Local Environment (Windows/Linux)

## Windows
Coming soon

## Linux
Follow this [tutorial](https://www.youtube.com/watch?v=c30RLycIpVY)

<a name="errors"></a>
# Common Setup Errors
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

4. When I try to open the app on the simulator I see "Invariant Violation: requireNativeComponent: "RNCSafeAreaProvider" was not found in the UIManager"
- Stop running the app. Close the simulator, terminate the running instance.
- Run command ```npx pod-install ios```
- Restart app with ```npm run ios```
- Source: https://stackoverflow.com/questions/61967017/invariant-violation-requirenativecomponent-rncsafeareaprovider-was-not-found

  <details>
  <summary>Manually link <code>RNCSafeAreaProvider</code></summary>
  <ul>
  <li>If it&#39;s still not working, double check the output from <code>npx pod-install ios</code>. Specifically look for this line: &quot;Auto-linking React Native modules for target `tppapp`: RNGestureHandler, RNReanimated, and RNScreens&quot;.</li>
  <li>If RNCSafeAreaProvider is not included in that list, it means that we will have to manually link it. In your Podfile in <code>/ios</code>, add the following line to Line 12, under <code>use_react_native!</code>:<pre><code class="lang-ruby">pod <span class="hljs-string">'react-native-safe-area-context'</span>, :<span class="hljs-function"><span class="hljs-params">path</span> =&gt;</span> <span class="hljs-string">'../node_modules/react-native-safe-area-context'</span>
  </code></pre>
  </li>
  <li>Reinstall your pods with <code>npx pod-install ios</code> from the <code>tpp-app</code> directory.</li>
  <li>Restart the app with <code>npm run ios</code>. The error should be gone.</li>
  <li>Source: <a href="https://github.com/th3rdwave/react-native-safe-area-context#linking-in-react-native--060-1">https://github.com/th3rdwave/react-native-safe-area-context#linking-in-react-native--060-1</a></li>
  </ul>
  </details>

<br>

5. When I try to open the app on the simulator I see: “Invariant Violation: “main” has not been registered”
- Delete "react-native-gesture-handler" from package.json
- Go into node_modules folder and delete the react-native-gesture-handler folder manually
- Run command ```npm install react-native gesture-handler``` and then ```expo install react-native-safe-area-context```
- Rebuild node_modules folder using ```yarn install```
- Finally, re-install pods with command ```npx pod-install ios```
- Source: https://stackoverflow.com/questions/62649381/invariant-violation-main-has-not-been-registered

6. I see error "CocoaPodsError: Command `pod install` failed. Cause: pod exited with non-zero code: 1"
- reinstall package managers in Rosetta 2
- Run command ```npm audit fix```
- replace contents of index.json with
```
import 'react-native-gesture-handler';
import { registerRootComponent } from 'expo';
import { AppRegistry } from 'react-native';

import App from './App';

AppRegistry.registerComponent('main', () => App);
```

7. When I try to run the app, I see "error Failed to launch the app on simulator, An error was encountered processing the command (domain=com.apple.CoreSimulator.SimError, code=405): Unable to lookup in current state: Shutdown."
- Make sure the simulator is closed, then run ```npm run ios``` again
- If that doesn't work, run ```npx react-native run-ios --simulator="iPhone 8"```, or any other model besides the one you just tried to simulate
- Source: https://stackoverflow.com/questions/69312343/build-error-domain-com-apple-coresimulator-simerror-code-405

<a name="vm-errors"></a>
# VM Specific Errors
1. You run ```npm run ios```, and the simulator doesn't launch. See error below

![image](https://user-images.githubusercontent.com/22108651/140632364-a3bdaf36-33d2-4d5c-9dce-4d2fd1ec1656.png)
- Increase RAM allocated to the VM, or change which model you are simulating to on that requires less RAM
