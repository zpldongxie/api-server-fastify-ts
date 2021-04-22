/*
 * @description: 年级代码
 * @author: zpl
 * @Date: 2021-04-22 12:20:09
 * @LastEditTime: 2021-04-22 12:20:54
 * @LastEditors: zpl
 */
import Sequelize from 'sequelize'
import getSchema from './schemas/nj.js'
import data from './initData/nj.js'

const { Model } = Sequelize

class NJ extends Model {
  static init(sequelize) {
    return super.init(getSchema(), {
      tableName: "nj",
      sequelize,
      timestamps: false,
      comment: '年级代码',
    })
  }

  static associate(models) {
    //No asociations
  }

  static getId(where) {
    return this.findOne({
      where,
      attributes: ["id"],
    });
  }

  static async initData() {
    await this.destroy({ where: {} })
    await this.bulkCreate(data)
  }

  toJSON() {
    return {
      id: this.id,
      dmlb: this.dmlb,
      dm: this.dm,
      dmhy: this.dmhy,
      dmsm: this.dmsm,
    }
  }
}

export default NJ;