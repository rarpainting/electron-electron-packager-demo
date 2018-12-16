const { app, BrowserWindow } = require('electron')
const url = require('url')
const path = require('path')
const { exec } = require('child_process')

let mainWindow = null
let workProcess = exec() // 后台 go 进程

app.on('ready',() => {
	workProcess = exec("./backstage/gocmd")
	mainWindow = new BrowserWindow({
		width:1200,
		height:800
	})
	// 有问题 不应该是 file: 而是 https:
	mainWindow.loadURL(url.format({
		// pathname:path.join(__dirname,'/app/index.html'),
		// protocol:'file:',
		slashes:true
	}))
})

app.on('close', () => {
	mainWindow = null
})

app.on('window-all-closed', () => {
	if (process.platform != 'darwin') {
		workProcess.kill()
		app.quit()
	}
})
