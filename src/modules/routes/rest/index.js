/*
 * @description rest接口，不做身份验证，其他系统使用的路由要加验证
 * @author: zpl
 * @Date: 2020-07-30 11:26:02
 * @LastEditTime: 2020-08-01 21:11:54
 * @LastEditors: zpl
 */
const fp = require('fastify-plugin');
const {queryByCid, queryAll} = require('../content/query-list-method');
const {onRouteError} = require('../util');

const querySchema = require('./query-content-list-schema');

module.exports = fp(async (server, opts, next) => {
  const mysqlModel = server.mysql.models;
  const {ajv} = opts;

  // 按条件获取发布的文章
  server.post('/getPubList', {querySchema}, async (req, reply) => {
    const validate = ajv.compile(querySchema.body.valueOf());
    const valid = validate(req.body);
    if (!valid) {
      return reply.code(400).send(validate.errors);
    }
    try {
      const {
        channelId,
        current = 1,
        pageSize = 20,
      } = req.body;
      const result = await queryByCid({
        mysqlModel,
        channelId,
        search: {pubStatus: '已发布'},
        pageSize,
        current,
      });
      return reply.code(200).send(result);
    } catch (error) {
      return onRouteError(error, reply);
    }
  });

  server.get('/recomList', {}, async (req, reply) => {
    try {
      const result = await queryAll({mysqlModel, search: {pubStatus: '已发布', isRecom: true}});
      return reply.code(200).send(result);
    } catch (error) {
      return onRouteError(error, reply);
    }
  });

  server.get('/channelSingleContent/:id', {}, async (req, reply) => {
    try {
      const id = req.params.id;
      const channel = await mysqlModel.Channel.findOne({
        where: {
          id,
          channelType: '单篇文章',
        },
        include: {
          model: mysqlModel.ContentDetail,
          where: {
            pubStatus: '已发布',
          },
        },
      });
      if (channel) {
        const content = channel.ContentDetails.length ? channel.ContentDetails[0] : {};
        reply.code(200).send(content);
      } else {
        reply.code(404);
      }
    } catch (error) {
      return onRouteError(error, reply);
    }
  });

  next();
});
