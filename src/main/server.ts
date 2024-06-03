//引入net模块
import net from 'net';
import { BrowserWindow, ipcMain } from 'electron';
import { SocketChannel } from '../constants/api';

const createSocket = async (mainWindow: BrowserWindow | null, msg: any) =>
  new Promise((resolve, reject) => {
    //创建TCP客户端
    const client = new net.Socket();
    //设置连接的服务器
    client.connect(8010, '127.0.0.1', function () {
      console.log('client connect success');
    });

    //监听data事件
    client.on('data', function (data) {
      // 将 tcp 数据发送给渲染器
      mainWindow?.webContents.send(SocketChannel, data);
      resolve(data);
    });

    client.on('close', function (data) {
      console.log('客户端：连接断开');
    });

    client.on('error', function (e) {
      console.log('客户端：连接断开');
      reject(e);
    });

    client.end(msg);
  });

const startServer = (mainWindow: BrowserWindow | null) => {
  ipcMain.handle(SocketChannel, (e, msg) => createSocket(mainWindow, msg));
};

export default startServer;
