/*
 * @description: 路由
 * @author: zpl
 * @Date: 2020-08-02 13:19:12
 * @LastEditTime: 2021-01-19 16:40:41
 * @LastEditors: zpl
 */
const fp = require('fastify-plugin');
const Method = require('./method');

const routerBaseInfo = {
  modelName_U: 'Channel',
  modelName_L: 'channel',
  getURL: '/api/channel/:id',
  getAllURL: '/api/channels',
  getOnFilterURL: '/api/channels/:filter',
  getListURL: '/api/getChannelList',
  putURL: '/api/channel',
  deleteURL: '/api/channels',
};
module.exports = fp(async (server, opts, next) => {
  const mysqlModel = server.mysql.models;
  const CurrentModel = mysqlModel[routerBaseInfo.modelName_U];
  const ChannelSettingModule = mysqlModel.ChannelSetting;
  const { ajv } = opts;
  const method = new Method(CurrentModel, ajv);


  /*
  *                        _oo0oo_
  *                       o8888888o
  *                       88" . "88
  *                       (| -_- |)
  *                       0\  =  /0
  *                     ___/`---'\___
  *                   .' \\|     |// '.
  *                  / \\|||  :  |||// \
  *                 / _||||| -:- |||||- \
  *                |   | \\\  - /// |   |
  *                | \_|  ''\---/''  |_/ |
  *                \  .-\__  '-'  ___/-. /
  *              ___'. .'  /--.--\  `. .'___
  *           ."" '<  `.___\_<|>_/___.' >' "".
  *          | | :  `- \`.;`\ _ /`;.`/ - ` : | |
  *          \  \ `_.   \_ __\ /__ _/   .-` /  /
  *      =====`-.____`.___ \_____/___.-`___.-'=====
  *                        `=---='
  *
  *
  *      ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
  *
  *            佛祖保佑       永不宕机     永无BUG
  */

  const getByIdSchema = require('./query-by-id-schema');
  server.get(
      routerBaseInfo.getURL,
      {
        schema: { ...getByIdSchema, tags: ['channel'], summary: '根据ID获取单个' },
        config: { ChannelSettingModule },
      },
      (request, reply) => method.getById(request, reply),
  );

  server.get(
      routerBaseInfo.getAllURL,
      {
        schema: { tags: ['channel'], summary: '获取所有' },
        config: { ChannelSettingModule },
      },
      (request, reply) => method.getAll(request, reply),
  );

  const keywordFilterSchema = require('./keyword-filter-schema');
  server.get(
      routerBaseInfo.getOnFilterURL,
      {
        schema: { ...keywordFilterSchema, tags: ['channel'], summary: '关键字过滤查找栏目' },
        config: { ChannelSettingModule },
      },
      (request, reply) => method.getOnFilter(request, reply),
  );

  const queryListSchema = require('./query-list-schema');
  server.post(
      routerBaseInfo.getListURL,
      {
        schema: { ...queryListSchema, tags: ['channel'], summary: '根据条件获取列表' },
        config: { ChannelSettingModule },
      },
      (request, reply) => method.queryList(request, reply),
  );

  const updateSchema = require('./update-schema');
  server.put(routerBaseInfo.putURL,
      { schema: { ...updateSchema, tags: ['channel'], summary: '新增或更新' } },
      (request, reply) => method.upsert(request, reply),
  );

  const deleteSchema = require('./delete-schema');
  server.delete(
      routerBaseInfo.deleteURL,
      { schema: { ...deleteSchema, tags: ['channel'], summary: '批量删除' } },
      (request, reply) => method.remove(request, reply),
  );

  next();
});
