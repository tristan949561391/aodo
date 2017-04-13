const CONF = require('../../conf/index');
const MongoClient = require('mongodb').MongoClient;
const redis = require("redis");
module.exports.getMongo = () => {
    return new Promise((resolve, reject) => {
        MongoClient.connect(CONF.MONGODB.url, function (err, db) {
            if (!err) {
                console.log(`mongodb数据库：${CONF.MONGODB.url}连接成功`);
                resolve(db);
            } else {
                console.log(`mongodb数据库：${CONF.MONGODB.url}连接失败,原因:${err.message}`);
                reject(err);
            }
        });
    });
};


module.exports.getRedis = () => {
    return new Promise((resolve, reject) => {
        const client = redis.createClient(CONF.REDIS.port, CONF.REDIS.host, CONF.REDIS.options);
        client.on('connect', () => {
            console.log(`redis 数据库:${CONF.REDIS.host}:${CONF.REDIS.port}连接成功`);
            resolve(client);
        });
        client.on("error", function (err) {
            console.error(`redis 数据库:${CONF.REDIS.host}:${CONF.REDIS.port}连接失败，原因：${err.message}`);
            reject(err);
        });
    })
};

