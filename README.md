# Google Calendar - Desktop

![preview](artwork/preview.png)

Having my calendar in the dock helps remind me to check it. This is just a simple web wrapper for Google Calendar.

## Build Instructions

1. Install Electron and project dependencies:

```
$ npm install -g electron
$ yarn install
```

2. Run the app:

```
$ yarn start
```

The app will only run if you have shut down any other instances. If you use `npm start` while another instance is running, it will simply display the window of that old instance, instead of starting the app.

## Packaging Information

To package the apps for each platform:

```
$ yarn
$ yarn run build-mac
$ yarn run build-linux
$ yarn run build-windows
```

## License

    Copyright 2018 Luke Klinker

    Licensed under the Apache License, Version 2.0 (the "License");
    you may not use this file except in compliance with the License.
    You may obtain a copy of the License at

       http://www.apache.org/licenses/LICENSE-2.0

    Unless required by applicable law or agreed to in writing, software
    distributed under the License is distributed on an "AS IS" BASIS,
    WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
    See the License for the specific language governing permissions and
    limitations under the License.
