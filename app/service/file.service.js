/**
 * Created by tc949 on 2017/4/14.
 */
const mongoose = require('mongoose');
const Grid = require('gridfs-stream');
const mongo = require('../../core/conn').mongo;
let gfs = new Grid(mongo.db, mongoose.mongo);
/**
 * 获取文件信息
 * @param  {String} _id
 * @returns {Promise}
 */
module.exports.get_filedata = (_id) => {
    return new Promise((resolve, reject) => {
        gfs.findOne({_id: _id}, function (err, file) {
            if (err) {
                reject(err);
            }
            resolve(file);
        });
    })
};
/**
 * 获取文件输出流
 * @param {String} _id
 * @returns {Stream}
 */
module.exports.get_filestream = (_id) => {
    return gfs.createReadStream({
        _id: _id
    })
};
/**
 * 文件删除
 * @param {String} _id:string
 * @returns {Promise}
 */
module.exports.drop_file = (_id) => {
    return new Promise((resolve, reject) => {
        gfs.remove({_id: _id}, (err) => {
            if (err) reject(err);
            resolve(true);
        });
    })
};

/**
 * 文件是否存在
 * @param {String} _id
 * @returns {Promise}
 */
module.exports.check_exist = (_id) => {
    return new Promise((resolve, reject) => {
        gfs.exist({_id: _id}, function (err, found) {
            if (err) reject(err);
            resolve(found);
        });
    });
};