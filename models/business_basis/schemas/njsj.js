/*
 * @description: 年级数据
 * @author: zpl
 * @Date: 2021-04-13 16:55:03
 * @LastEditTime: 2021-04-13 19:25:44
 * @LastEditors: zpl
 */
import Sequelize from 'sequelize'
import S from 'fluent-json-schema'

const { DataTypes } = Sequelize

export default {
  id: { type: DataTypes.UUID, defaultValue: DataTypes.UUIDV4, primaryKey: true },
  NJ:	{ type: DataTypes.INTEGER, comment: '年级', allowNull: false },
  NJMC:	{ type: DataTypes.STRING(30), comment: '年级名称', allowNull: false },
}

export const InfoSchema = S.object()
  .id('NJSJ')
  .description('年级数据')
  .prop('id', S.string().format('uuid').required())
  .prop('NJ', S.number().description('年级').required())
  .prop('NJMC', S.string().maxLength(30).description('年级名称').required())

export const CreateSchema = S.object()
  .id('CreateNJSJ')
  .description('创建年级数据')
  .prop('NJ', S.number().description('年级').required())
  .prop('NJMC', S.string().maxLength(30).description('年级名称').required())