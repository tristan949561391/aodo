/**
 * Created by tc949 on 2017/4/14.
 */
const multer = require('koa-multer');
const mongo = require('../conn').mongo;
const mongoose = require('mongoose');
const Grid = require('gridfs-stream');

function GfsStorage(opts) {
    this.mongo = opts.mongo;
    this.gfs = new Grid(this.mongo.db, mongoose.mongo);
    this._handleFile = (req, file, cb) => {
        let writeStream = this.gfs.createWriteStream({
            filename: file.originalname,
            content_type: file.mimetype,
        });
        let readStream = file.stream;
        readStream.pipe(writeStream);
        readStream.on('data', function (chunk) { // 当有数据流出时，写入数据
            if (writeStream.write(chunk) === false) { // 如果没有写完，暂停读取流
                readStream.pause();
            }
        });
        writeStream.on('drain', function () { // 写完后，继续读取
            readStream.resume();
        });

        readStream.on('end', function () { // 当没有数据时，关闭数据流
            writeStream.end();
        });
        writeStream.on('close', f => {
            req.body.back = f;
            cb(null)
        });
    };
    this._removeFile = (req, file, cb) => {
        delete file.buffer;
        cb(null)
    }
}

const storage = new GfsStorage({
    mongo: mongo
});
const upload = multer({storage: storage});

module.exports = upload;


