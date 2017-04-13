/**
 * Created by Tristan on 2017/3/29.
 */
const Koa = require('koa');
const bodyparser = require('koa-bodyparser');
const Logger = require('koa-logger');
const convert = require('koa-convert');
const cors = require('koa2-cors');
const UnckeckError = require("./error/index").UnckeckError;
const connInit = require("./core/conn");

//-------midleware
module.exports.appCallback = async () => {
    let app = new Koa();
    app.mongo = await connInit.getMongo();
    app.redis = await connInit.getRedis();
    app.use(bodyparser());
    app.use(Logger());
    app.use(cors());
    app.use(async (ctx, next) => {
        try {
            await next()
        } catch (e) {
            console.log(e.message);
            console.error(e.stack);
            ctx.status = 500;
            ctx.body = {status: e.code || 500, message: e.message, name: e.name}
        }
    });
    app.use(async () => {
        throw new UnckeckError(404, 'not find');
    });
    return app.callback();
};
