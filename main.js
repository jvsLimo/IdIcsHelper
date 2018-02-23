const {app, BrowserWindow} = require('electron')
const path = require('path')
const url = require('url')

/*Référence globale vers l'objet window.
 Si on en a pas, la fenêtre se ferme automatiquement quand l'objet
window est garbage collecté. Donc y a un GC en JS ! */

let win

function createWindow () {
    win = new BrowserWindow({width : 800, height: 600})

    win.loadURL(url.format({
        pathname: path.join(__dirname, 'index.html'),
        protocol : 'file:',
        slashes: true       
    }))

    win.webContents.openDevTools()

    win.on('closed', () => {
        //Il faut faire ce listener de fermeture pour déréférencer les fenêtre que l'on ferme.
        win = null;
    })
}


app.on('ready', createWindow)

app.on('window-all-closed', () {
    if(process.platform !== 'darwin') {
        app.quit()
    }
})

app.on('activate', () => {
    if(win === null)
        createWindow()
})