const net = require('net');

//创建TCP服务器
const server = net.createServer(function (socket) {
  //设置消息内容
  const message = 'Hello Client......';

  //发送数据
  // socket.write(message, function () {
  //   const writeSize = socket.bytesWritten
  //   console.log('数据发送成功，数据长度为：' + writeSize)
  // })

  //监听data事件
  socket.on('data', function (data) {
    const readSize = socket.bytesRead;
    //打印数据
    console.log(
      '接收到数据为：' + data.toString(),
      '；接收的数据长度为：' + readSize,
    );

    // const nextMsg = message + ++i

    if (data.toString() === 'xxx') {
      socket.write(message + '-xxx', function () {
        const writeSize = socket.bytesWritten;
        console.log('数据发送成功，数据长度为：' + writeSize);
      });
    } else {
      socket.write(message + '-yyy', function () {
        const writeSize = socket.bytesWritten;
        console.log('数据发送成功，数据长度为：' + writeSize);
      });
    }
  });

  // 服务器收到客户端发出的关闭请求时，会触发end事件
  socket.on('end', () => {
    console.log('client disconnected');
  });

  socket.on('close', () => {
    console.log('client closed');
  });

  //监听 error 事件
  socket.on('error', function (data) {
    console.log('error:');
  });
});

server.listen(8010, () => {
  console.log('服务正在监听中。。。');
});

server.on('error', (err) => {
  console.log(err);
});

server.on('close', () => {
  console.log('服务器关闭');
});
