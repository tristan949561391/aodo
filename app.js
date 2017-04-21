/**
 * Created by Tristan on 2017/3/29.
 */
const Koa = require('koa');
const bodyparser = require('koa-bodyparser');
const Logger = require('koa-logger');
const cors = require('koa2-cors');
const routesFileFinder = require('./core/plugin/index');
const path = require('path');
const Err = require('./error');
let app = new Koa();


app.use(bodyparser());
app.use(Logger());
app.use(cors());
app.use(async (ctx, next) => {
    try {
        await next()
    } catch (e) {
        console.log(e.message);
        console.error(e.stack);
        let status = 500;
        if (e instanceof Err.NotFound) {
            status = e.code;
        }
        ctx.status = status;
        ctx.body = {status: e.code || 500, message: e.message, name: e.name}
    }
});

let routesFile = routesFileFinder.getRouteFiles(path.join(__dirname, 'app/route'))
routesFile.forEach(rout => {
    console.log(rout.name);
    let r = require(rout.path);
    app.use(r.routes()).use(r.allowedMethods())
});
module.exports = app;

