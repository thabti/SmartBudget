# SmartBudget
Smart application to create and manage budgets

## Purpose
Create a budget app as introduction to ReactNative. Showing how to share components across web and native app. If you clone this repo, you will be able to use some elements from 'react-native' module.
Which can be found at: /${repo}/web/tools/native
Those components are replacing the original ReactNative components when the app is compiled to web environment. Check the /${repo}/web/tools/webpack/webpack.config.(dev|prod).js and look for alias.

## Pre requirements
* ReactNative: https://facebook.github.io/react-native/docs/getting-started.html
* ReactNative for web: https://www.npmjs.com/package/react-native-web
* CSS loader for ReactNative: https://www.npmjs.com/package/react-native-css-loader
* Enzyme + ReactNative: https://github.com/airbnb/enzyme/blob/master/docs/guides/react-native.md

### Tips for getting it up and running

#### Important
* First, follow the instruction on ReactNative page: https://facebook.github.io/react-native/docs/getting-started.html

#### Complement
* You need to go into Android Studio -> Preferences|Configure -> SDK Manager -> SDK Platform (tab)
 * Click on the "Show Package Details", then, you need to install some System Image related to the Android SDK version installed
* You need to go into Android Studio -> Preferences|Configure -> SDK Manager -> SDK Tools (tab)
 * Install Android SDK Build-Tools
 * Install CMake
 * Install LLDB
 * Install Android SDK Platform-Tools
 * Install Android SDK Tools
 * Install GPU Debugging tools
 * Install Intel x86 Emulator Accelerator (HAXM installer)
 * Install NDK

NOTE: All complement section is important to create your Android Virtual Device (Emulator).

#### Running your android + web environment

For WEB, you will need to run "npm run web:bundle:dev".
For Android:
* You will need 3 terminal sessions
1. Run (leave the terminal there): npm start
2. Run (leave the terminal there): android avd
 1. You will need to start one of the emulators, if you do not have it, create one. (The complement session helps with it)
3. Run: npm run android:bundle:dev

NOTE:
1. Every time when you change something, you need to click on the Emulator (making the window active) and press twice "R" on your keyboard. This will refresh the content with new changes.
2. If you have any trouble creating the index(ios|android).bundle, create the file: android/app/src/main/assets/index.android.bundle


## Contributions are welcome
Star it, Fork it, share it and help with new ideas. Any sort of contribution is more than welcome.