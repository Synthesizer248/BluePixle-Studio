'use strict';
const { app, BrowserWindow, Menu, session, dialog } = require('electron');
const path = require('node:path');
const { pathToFileURL } = require('node:url');
const appPage = path.join(__dirname, 'app', 'index.html');
const appPageUrl = pathToFileURL(appPage).href;
if (!app.requestSingleInstanceLock()) app.quit();
else {
  app.on('second-instance', () => {
    const win = BrowserWindow.getAllWindows()[0];
    if (win) { if (win.isMinimized()) win.restore(); win.focus(); }
  });
  app.whenReady().then(() => {
    app.setName('BluePixel Studio');
    installOfflinePolicy();
    installMenu();
    createWindow();
    app.on('activate', () => { if (!BrowserWindow.getAllWindows().length) createWindow(); });
  });
  app.on('window-all-closed', () => { if (process.platform !== 'darwin') app.quit(); });
}
function installOfflinePolicy() {
  const ses = session.defaultSession;
  ses.webRequest.onBeforeRequest((details, callback) => {
    let protocol = '';
    try { protocol = new URL(details.url).protocol; } catch {}
    callback({ cancel: !['file:', 'data:', 'blob:', 'devtools:'].includes(protocol) });
  });
  ses.on('will-download', (_event, item) => {
    item.setSaveDialogOptions({
      title: 'Save BluePixel export',
      defaultPath: path.join(app.getPath('documents'), item.getFilename()),
      buttonLabel: 'Save'
    });
  });
}
function installMenu() {
  Menu.setApplicationMenu(Menu.buildFromTemplate([
    { label: 'File', submenu: [
      { label: 'New project', accelerator: 'CmdOrCtrl+N', click: (_item, win) => win?.webContents.executeJavaScript("document.getElementById('newBtn').click()") },
      { type: 'separator' }, { role: 'quit', label: 'Exit' }
    ]},
    { label: 'Edit', submenu: [
      { label: 'Undo', accelerator: 'CmdOrCtrl+Z', click: (_item, win) => win?.webContents.executeJavaScript("document.dispatchEvent(new KeyboardEvent('keydown',{key:'z',ctrlKey:true,bubbles:true}))") },
      { label: 'Redo', accelerator: 'CmdOrCtrl+Shift+Z', click: (_item, win) => win?.webContents.executeJavaScript("document.dispatchEvent(new KeyboardEvent('keydown',{key:'z',ctrlKey:true,shiftKey:true,bubbles:true}))") },
      { type: 'separator' }, { role: 'copy' }, { role: 'paste' }, { role: 'selectAll' }
    ]},
    { label: 'View', submenu: [
      { role: 'reload' }, { role: 'toggleDevTools' }, { type: 'separator' },
      { role: 'resetZoom' }, { role: 'zoomIn' }, { role: 'zoomOut' }, { type: 'separator' }, { role: 'togglefullscreen' }
    ]},
    { label: 'Help', submenu: [
      { label: 'About BluePixel Studio', click: () => dialog.showMessageBox({ type:'info', title:'About BluePixel Studio', message:'BluePixel Studio', detail:'Offline embedded-display designer. Projects stay on this PC.' }) }
    ]}
  ]));
}
function createWindow() {
  const win = new BrowserWindow({
    width: 1500, height: 960, minWidth: 1040, minHeight: 720,
    backgroundColor: '#071326', title: 'BluePixel Studio', autoHideMenuBar: false,
    webPreferences: { nodeIntegration:false, contextIsolation:true, sandbox:true, webSecurity:true }
  });
  win.webContents.setWindowOpenHandler(() => ({ action:'deny' }));
  win.webContents.on('will-navigate', (event, url) => { if (url !== appPageUrl) event.preventDefault(); });
  win.loadFile(appPage);
}
