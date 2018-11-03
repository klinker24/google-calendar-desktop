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

(function() {
  const { BrowserWindow, BrowserView, app } = require('electron')

  const windowStateKeeper = require('electron-window-state')
  const configurator = require('./browserview-configurator.js')
  const path = require('path')
  const url = require('url')

  let mainWindow = null
  let browserView = null

  var createMainWindow = () => {
    let windowState = windowStateKeeper( { defaultWidth: 1400, defaultHeight: 1000 } )
    let browser = new BrowserView( { webPreferences: { nodeIntegration: false } } )
    let window = new BrowserWindow( {
      title: "Google Calendar", icon: path.join(__dirname, '../../build/icon.png'),
      x: windowState.x, y: windowState.y, width: windowState.width, height: windowState.height,
    } )

    window.setBrowserView(browser)
    configurator.prepare(window, browser)

    window.on('close', (event) => {
      event.preventDefault()
      window.hide()
    })

    window.on('closed', (event) => {
      event.preventDefault()
    })

    setWindow(window)
    setBrowserView(browser)

    windowState.manage(window)

    return window
  }

  var setWindow = (w) => {
    mainWindow = w
  }

  var getWindow = () => {
    return mainWindow
  }

  var setBrowserView = (b) => {
    browserView = b
  }

  var getBrowserView = () => {
    return browserView
  }

  module.exports.createMainWindow = createMainWindow
  module.exports.getWindow = getWindow
  module.exports.getBrowserView = getBrowserView
}())
