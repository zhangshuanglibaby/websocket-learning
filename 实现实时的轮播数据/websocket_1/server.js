/*
 * @Date: 2022-12-11 14:39:02
 * @LastEditors: zhangshuangli
 * @LastEditTime: 2022-12-11 15:33:16
 * @Description: 这是****文件
 */
/* 服务器 */

// 引入
const WebSocketServer = require('websocket').server
const http = require('http')
const port = 8000
let time = 0

// 创建服务器
const server = http.createServer((request, response) => {
  console.log(`${new Date().toLocaleDateString()} Received request for ${request.url}`)
  response.writeHead(404)
  response.end()
})
server.listen(port, () => {
  console.log(`${new Date().toLocaleDateString()} Server is listening on port ${port}`)
})


// websocket 服务器
const wsServer = new WebSocketServer({
  httpServer: server
})

// 建立连接
wsServer.on('request', (request) => {
  // 当前的连接
  console.log(request.origin, '=======request.origin=======')
  const connection = request.accept(null, request.origin)
  console.log(`${new Date().toLocaleDateString()} 已经建立连接`)

  setInterval(() => {
    const obj = {
      title: '标题' + time++,
      value: '内容' + time++
    }
    connection.send(JSON.stringify(obj))
  }, 2000)

  // 监听当前连接 当断开链接(网页关闭) 触发
  connection.on('close', (reasonCdoe, description) => {
    console.log(`${new Date().toLocaleDateString()} ${connection.remoteAddress} 断开链接`)
  })
})