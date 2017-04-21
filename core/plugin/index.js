/**
 * Created by Tristan on 17/4/13.
 */
const fs = require('fs');
const pt = require('path');

module.exports.getRouteFiles = (path) => {
    let filesList = [];
    readFile(path, filesList);
    return filesList
};

//遍历读取文件
function readFile(path, filesList) {
    files = fs.readdirSync(path);//需要用到同步读取
    files.forEach(walk);
    function walk(file) {
        states = fs.statSync(pt.join(path, file));
        if (states.isDirectory()) {
            readFile(pt.join(path, file), filesList);
        }
        else {
            //创建一个对象保存信息
            let obj = new Object();
            obj.name = file;//文件名
            obj.path = pt.join(path, file); //文件绝对路径
            filesList.push(obj);
        }
    }
}
