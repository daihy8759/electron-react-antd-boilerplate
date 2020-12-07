import { app, BrowserWindow, ipcMain, session } from 'electron';
import path from 'path';
import url from 'url';
import installExtension, { REACT_DEVELOPER_TOOLS } from 'electron-devtools-installer';
import store from '../share/store';

process.env.ELECTRON_DISABLE_SECURITY_WARNINGS = true;

let win;

if (process.env.NODE_ENV !== 'production') {
    app.whenReady().then(() => {
        installExtension(REACT_DEVELOPER_TOOLS)
            .then((name) => console.log(`Added Extension:  ${name}`))
            .catch((err) => console.log('An error occurred: ', err));
    });
}

const createWindow = async () => {
    win = new BrowserWindow({
        fullscreen: false,
        width: 800,
        height: 500,
        webPreferences: {
            nodeIntegration: true,
            enableRemoteModule: true,
            plugins: true,
        },
    });

    ipcMain.on('set-cookie', async (event, arg) => {
        const { cookie } = arg;
        await session.defaultSession.cookies.set(cookie);
        event.returnValue = 'pong';
    });
    const filter = {
        urls: ['https://*/*'],
    };
    session.defaultSession.webRequest.onBeforeSendHeaders(filter, (details, callback) => {
        details.requestHeaders['Referer'] = store.get('url');
        callback({ requestHeaders: details.requestHeaders });
    });

    if (process.env.NODE_ENV !== 'production') {
        win.loadURL('http://localhost:2003');
    } else {
        win.loadURL(
            url.format({
                pathname: path.join(__dirname, 'index.html'),
                protocol: 'file:',
                slashes: true,
            })
        );
    }

    if (process.env.NODE_ENV !== 'production') {
        // Open DevTools
        win.webContents.openDevTools();
    }

    win.on('closed', () => {
        win = null;
    });
};

app.on('ready', createWindow);

app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') {
        app.quit();
    }
});

app.on('activate', () => {
    if (win === null) {
        createWindow();
    }
});

process.on('SIGINT', function () {
    process.exit(0);
});
