/**
 * Created by tc949 on 2017/4/20.
 */
/**
 * log4js 配置文件
 *
 * 日志等级由低到高
 * ALL TRACE DEBUG INFO WARN ERROR FATAL OFF.
 *
 * 关于log4js的appenders的配置说明
 * https://github.com/nomiddlename/log4js-node/wiki/Appenders
 */
let path = require('path');
//日志根目录
let baseLogPath = path.resolve(__dirname, '../logs')
//错误日志目录
let errorPath = "/error";
//错误日志文件名
let errorFileName = "error";
//错误日志输出完整路径
let errorLogPath = baseLogPath + errorPath + "/" + errorFileName;
// let errorLogPath = path.resolve(__dirname, "../logs/error/error");

//响应日志目录
let responsePath = "/response";
//响应日志文件名
let responseFileName = "response";
//响应日志输出完整路径
let responseLogPath = baseLogPath + responsePath + "/" + responseFileName;
// let responseLogPath = path.resolve(__dirname, "../logs/response/response");
module.exports = {
    "appenders": [
        //错误日志
        {
            "category": "errorLogger",             //logger名称
            "type": "dateFile",                   //日志类型
            "filename": errorLogPath,             //日志输出位置
            "alwaysIncludePattern": true,          //是否总是有后缀名
            "pattern": "-yyyy-MM-dd-hh.log",      //后缀，每小时创建一个新的日志文件
            "path": errorPath                     //自定义属性，错误日志的根目录
        },
        //响应日志
        {
            "category": "resLogger",
            "type": "dateFile",
            "filename": responseLogPath,
            "alwaysIncludePattern": true,
            "pattern": "-yyyy-MM-dd-hh.log",
            "path": responsePath
        }
    ],
    "levels":                                   //设置logger名称对应的的日志等级
        {
            "errorLogger": "ERROR",
            "resLogger": "ALL"
        },
    "baseLogPath": baseLogPath                  //logs根目录
}