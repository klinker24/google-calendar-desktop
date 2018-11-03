/*
 *  Copyright 2018 Luke Klinker
 *
 *  Licensed under the Apache License, Version 2.0 (the "License");
 *  you may not use this file except in compliance with the License.
 *  You may obtain a copy of the License at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *
 *  Unless required by applicable law or agreed to in writing, software
 *  distributed under the License is distributed on an "AS IS" BASIS,
 *  WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 *  See the License for the specific language governing permissions and
 *  limitations under the License.
 */

const { app } = require('electron')

let windowProvider = null
let menu = null

const gotLock = app.requestSingleInstanceLock()

if (!gotLock) {
  app.exit(0)
  return;
}

app.on('second-instance', () => {
  windowProvider.getWindow().show()
})

app.setAppUserModelId("xyz.klinker.calendar")
app.on('ready', createWindow)
app.on('activate', createWindow)

app.on('window-all-closed', () => {
  // used to close the app and the web socket here for non-macOS devices
  // We don't want to do that anymore, since we are able to save and restore
  // the app state.
})

app.on('before-quit', () => {
  app.exit(0)
})

function createWindow() {
  initialize()

  if (windowProvider.getWindow() == null) {
    windowProvider.createMainWindow()
    menu.buildMenu(windowProvider)
  } else {
    if (process.platform === 'darwin') {
      app.dock.show()
    }

    windowProvider.getWindow().show()
    menu.buildMenu(windowProvider)
  }
}

function initialize() {
  if (menu == null) {
    menu = require('./resources/js/menu.js')
  }

  if (windowProvider == null) {
    windowProvider = require('./resources/js/window-provider.js')
  }
}
