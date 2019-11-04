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

  var prepare = (window, browser) => {
    setBounds(window, browser)
    browser.setAutoResize( { width: true, height: true } )
    browser.webContents.loadURL('https://calendar.google.com/')
    browser.webContents.on("new-window", (event, url) => {
      try {
        require("electron").shell.openExternal(url);
        event.preventDefault();
      } catch (error) {
        // console.log("Ignoring " + url + " due to " + error.message);
      }
    });
  }

  var setBounds = (window, browser) => {
    browser.setBounds({ 
      x: 0, 
      y: getTitleBarOffset(), 
      width: window.getBounds().width, 
      height: window.getBounds().height - getTitleBarSize(window)
    });
  }

  function getTitleBarSize(window) {
    if (process.platform === "darwin") {
      return 20;
    } else if (process.platform === "win32") {
      return window.isMenuBarVisible() ? 60 : 40;
    } else {
      return window.isMenuBarVisible() ? 25 : 0;
    }
  }

  function getTitleBarOffset() {
    if (process.platform === "darwin") {
      return 0;
    } else if (process.platform === "win32") {
      return 0;
    } else {
      return 0;
    }
  }

  module.exports.prepare = prepare
  module.exports.setBounds = setBounds
}())
