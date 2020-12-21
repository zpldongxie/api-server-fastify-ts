/*
 * @description: 系统配置表
 * @author: zpl
 * @Date: 2020-10-14 21:31:40
 * @LastEditTime: 2020-10-15 17:57:39
 * @LastEditors: zpl
 */
const { Model, DataTypes } = require('sequelize');
/**
 * 系统配置
 *
 * @class SysConfig
 * @extends {Model}
 */
class SysConfig extends Model {
  /**
   * 初始化，统一暴露给index，保证所有model使用同一sequelize实例
   *
   * @static
   * @param {*} sequelize
   * @memberof SysConfig
   */
  static initNow(sequelize) {
    SysConfig.init({
      id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
      },
      name: {
        type: DataTypes.STRING,
        unique: true,
        allowNull: false,
        comment: '配置名称',
      },
      value: {
        type: DataTypes.STRING,
        allowNull: false,
        comment: '配置值',
      },
      descStr: {
        type: DataTypes.STRING,
        defaultValue: '',
        comment: '配置说明',
      },
    }, {
      sequelize,
      modelName: 'SysConfig',
    });
  }
}

module.exports = SysConfig;