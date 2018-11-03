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
  const { Menu, app } = require('electron')

  const path = require('path')
  const browserviewPreparer = require('./browserview-configurator.js')

  var buildMenu = (windowProvider) => {
    const template = [{
      label: 'Edit',
      submenu: [
        { role: 'undo' },
        { role: 'redo' },
        { type: 'separator' },
        { role: 'cut' },
        { role: 'copy' },
        { role: 'paste' },
        { role: 'pasteandmatchstyle' },
        { role: 'delete' },
        { role: 'selectall' }
      ]
    }, {
      label: 'View',
      submenu: [{
        label: 'Reload',
        accelerator: 'CmdOrCtrl+R',
        click(item, focusedWindow) {
          windowProvider.getBrowserView().webContents.loadURL('https://todoist.com/app')
        }
      }, {
        label: 'Toggle Developer Tools',
        accelerator: 'CmdOrCtrl+I',
        click(item, focusedWindow) {
          windowProvider.getBrowserView().webContents.toggleDevTools()
        }
      },
      { type: 'separator' },
      { role: 'resetzoom' },
      { role: 'zoomin' },
      { role: 'zoomout' },
      { type: 'separator' },
      { role: 'togglefullscreen' }
    ]
    }, {
      role: 'window',
      submenu: [
        { role: 'minimize' },
        { role: 'close' }
      ]
    }, {
      role: 'help',
      submenu: [
        { label: require('electron').app.getVersion(), click() { require('electron').shell.openExternal('https://github.com/klinker-apps/messenger-desktop/releases') } },
      ]
    }]

    if (process.platform === 'darwin') {
      const name = require('electron').app.getName()
      template.unshift({
        label: name,
        submenu: [
          { type: 'separator' },
          { label: 'Hide Calendar', role: 'hide' },
          { role: 'hideothers' },
          { role: 'unhide' },
          { type: 'separator' },
          { label: 'Quit Calendar', role: 'quit' }
        ]
      })

      // Edit menu
      template[2].submenu.push(
        { type: 'separator' },
        { label: 'Speech', submenu: [
          { role: 'startspeaking' },
          { role: 'stopspeaking' }
        ]}
      )

      // Windows menu
      template[4].submenu = [
        { label: 'Close', accelerator: 'CmdOrCtrl+W', role: 'close' },
        { label: 'Minimize', accelerator: 'CmdOrCtrl+M', role: 'minimize' },
        { label: 'Zoom', role: 'zoom' },
        { type: 'separator' },
        { label: 'Bring All to Front', role: 'front' }
      ]
    }

    const menu = Menu.buildFromTemplate(template)
    Menu.setApplicationMenu(menu)

    // if they turn on auto hide, then this should be hidden.
    // if they turn off auto hide, we will show this menu bar immediately.
    windowProvider.getWindow().setMenuBarVisibility(false)
    windowProvider.getWindow().setAutoHideMenuBar(true)
  }

  module.exports.buildMenu = buildMenu
}())
