/* eslint-disable new-cap */
/*
 * @description: 服务申请表
 * @author: zpl
 * @Date: 2021-01-03 10:14:28
 * @LastEditTime: 2021-01-08 09:37:22
 * @LastEditors: zpl
 */
const { Model, DataTypes } = require('sequelize');
const { serviceStatus } = require('../../../dictionary');

/**
 * 服务申请表
 *
 * @class ServiceRequest
 * @extends {Model}
 */
class ServiceRequest extends Model {
  /**
   * 初始化，统一暴露给index，保证所有model使用同一sequelize实例
   *
   * @static
   * @param {*} sequelize
   * @memberof ServiceRequest
   */
  static initNow(sequelize) {
    ServiceRequest.init({
      corporateName: {
        type: DataTypes.STRING,
        allowNull: false,
        require: true,
        comment: '公司名称',
      },
      tel: {
        type: DataTypes.STRING,
        allowNull: false,
        require: true,
        comment: '座机',
      },
      email: {
        type: DataTypes.STRING(64),
        allowNull: false,
        comment: '邮箱',
      },
      address: {
        type: DataTypes.STRING,
        comment: '地址',
      },
      zipCode: {
        type: DataTypes.STRING(6),
        comment: '邮编',
      },
      website: {
        type: DataTypes.STRING,
        comment: '企业网站',
      },
      contacts: {
        type: DataTypes.STRING,
        allowNull: false,
        comment: '联系人',
      },
      contactsMobile: {
        type: DataTypes.STRING(11),
        allowNull: false,
        comment: '联系人手机',
      },
      demandType: {
        type: DataTypes.STRING,
        allowNull: false,
        require: true,
        comment: '需求类型',
      },
      requestDesc: {
        type: DataTypes.STRING,
        allowNull: false,
        require: true,
        comment: '需求描述',
      },
      status: {
        type: DataTypes.STRING,
        defaultValue: serviceStatus.underReview,
        comment: '状态（申请中 | 接受申请 | 拒绝申请 | 服务中 | 服务完成）',
      },
      rejectReason: {
        type: DataTypes.STRING,
        comment: '拒绝原因',
      },
      serviceDesc: {
        type: DataTypes.STRING,
        comment: '服务描述，管理员选填，便于事后追溯',
      },
    }, {
      sequelize,
      modelName: 'ServiceRequest',
      comment: '服务申请表',
    });
  }
}

module.exports = ServiceRequest;
