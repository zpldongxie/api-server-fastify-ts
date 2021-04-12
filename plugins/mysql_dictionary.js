/*
 * @description: 注册字典数据库模型
 * @author: zpl
 * @Date: 2021-04-10 15:57:54
 * @LastEditTime: 2020-01-03 12:31:45
 * @LastEditors: zpl
 */
import fp from 'fastify-plugin'
import Sequelize from 'sequelize'

import prodConf from '../configure_production.js'
import devConf from '../configure_dev.js'
import registerModels from '../models/dictionary/index.js'

async function plugin(fastify, options) {
  const { config } = fastify;
  const seqConf = config.NODE_ENV === 'production' ? prodConf.mysql.dictionary : devConf.mysql.dictionary
  const { database, user, password, host, dialect, pool, autoConnect, resetTable } = seqConf;
  let sequelize = new Sequelize(database, user, password, {
    host,
    dialect,
    pool,
    operatorsAliases: false, // 仍可通过传入 operators map 至 operatorsAliases 的方式来使用字符串运算符，但会返回弃用警告
    logging: false,
    define: {
      charset: 'utf8mb4',
      dialectOptions: {
        collate: 'utf8mb4_general_ci',
      },
    },
  })
  await registerModels(sequelize, resetTable);
  if (autoConnect) {
    return sequelize.authenticate().then(decorate)
  }
  sequelize.sync()
  decorate()
  return Promise.resolve();

  function decorate() {
    fastify.decorate('mysql_dictionary', sequelize)
    fastify.addHook('onClose', (fastifyInstance, done) => {
      sequelize.close()
        .then(done)
        .catch(done)
    })
  }
}

export default fp(plugin, {
  name: 'mysql_dictionary'
})