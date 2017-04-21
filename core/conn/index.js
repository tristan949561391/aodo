const CONF = require('../../conf/index');
const redis = require("redis");
const mongoose=require('mongoose');



const client = redis.createClient(CONF.REDIS.port, CONF.REDIS.host, CONF.REDIS.options);
client.on('connect', () => {
    console.log(`redis 数据库:${CONF.REDIS.host}:${CONF.REDIS.port}连接成功`);
});
client.on("error", function (err) {
    console.error(`redis 数据库:${CONF.REDIS.host}:${CONF.REDIS.port}连接失败，原因：${err.message}`);
});
module.exports.redis = client;


mongoose.Promise = global.Promise;
const mongo = mongoose.createConnection(CONF.MONGODB.url, CONF.MONGODB.options);
mongo.once('open', function () {
    console.log(`mongodb数据库连接成功${CONF.MONGODB.url}`)

});
mongo.on('error', function () {
    console.error('mongo 数据库连接失败');
});
module.exports.mongo = mongo;



