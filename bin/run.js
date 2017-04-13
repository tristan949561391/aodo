const http = require('http');
const SERVER = require('../conf').SERVER;
const Server = require("../app");


async function run() {
    let callback = await Server.appCallback();
    http.createServer(callback).listen(SERVER.port, () => {
        console.log(`服务器启动成功：端口${SERVER.port}`)
    })
}
run()


