const http = require('http');
const SERVER = require('../conf').SERVER;
const app = require("../app");

async function run() {
    http.createServer(app.callback()).listen(SERVER.port, () => {
        console.log(`服务器启动成功：端口${SERVER.port}`)
    })
}
run();
process.on('uncaughtException', function (err) {
    console.error(err.stack);
    console.log("Node NOT Exiting...");
});