/**
 * Created by Tristan on 17/3/19.
 */
const Router = require('koa-router')
const route = new Router();
const upload = require('../../core/plugin/multer');
const file_service = require('../service/file.service');
const Err = require('../../error');

route.prefix('/file');

/**
 * 上传文件
 */

route.post('/post', upload.single('file'), async (ctx) => {
    ctx.body = ctx.req.body.back;
});

/**
 * 下载文件，会自动重定向到下载地址
 */
route.get('/get/:fid', async (ctx) => {
    let fid = ctx.params.fid;
    let filedate = await file_service.get_filedata(fid);
    if (filedate === null) throw new Err.NotFound(404, 'file not found');
    ctx.res.setHeader('Content-Type', filedate.contentType);
    ctx.redirect('/file/static/' + filedate.filename + '?fid=' + filedate._id);
});

/**
 * 下载地址
 */
route.get('/static/:filename', async (ctx) => {
    let fid = ctx.query.fid;
    let filedate = await file_service.get_filedata(fid);
    ctx.res.setHeader('Content-Type', filedate.contentType);
    ctx.body = file_service.get_filestream(fid);
});
/**
 * 删除文件
 */
route.post('/delete/:fid', async (ctx) => {
    let fileId = ctx.params.fid;
    file_service.drop_file(fileId);
    ctx.body = 'ok';
});

/**
 * 判断文件是否存在
 */
route.post('/check/:fid', async (ctx) => {
    let fileId = ctx.params.fid;
    ctx.body = await file_service.check_exist(fileId);
});

module.exports = route;
