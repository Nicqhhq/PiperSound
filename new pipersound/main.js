const { app, BrowserWindow } = require('electron');
const { NodeAudioVolumeMixer } = require("node-audio-volume-mixer");

let mainWindow;

function createWindow() {
    mainWindow = new BrowserWindow({
        width: 800,
        height: 600,
        webPreferences: {
            nodeIntegration: true,
        },
    });

    mainWindow.loadFile('index.html');

    // Chama a função e envia os dados para a janela renderizada
    const sessions = NodeAudioVolumeMixer.getAudioSessionProcesses();
    mainWindow.webContents.send('update-audio-sessions', sessions);
}

app.whenReady().then(createWindow);
