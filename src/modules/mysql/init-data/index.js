/*
 * @description: 初始化数据库
 * @author: zpl
 * @Date: 2020-07-27 12:40:11
 * @LastEditTime: 2021-03-06 23:59:44
 * @LastEditors: zpl
 */
const UserMethod = require('../../../routes/user/method')
const { departmentTag } = require('../../../dictionary');

/**
 * 初始化部门
 *
 * @param {*} DepartmentModel 用户组模型
 * @param {*} dataList 用户组初始数据
 * @return {Array} 操作结果
 */
const initDepartment = async (DepartmentModel, dataList) => {
  const result = [];
  try {
    for (const department of dataList) {
      await DepartmentModel.create(department);
      result.push(`department: ${department.name}，创建成功。`);
    }
  } catch (err) {
    const { errors } = err;
    if (errors && errors.length) {
      const { message } = errors[0];
      result.push(`数据库执行失败，department创建失败： ${message}`);
    }
    result.push(`系统异常，department创建失败： ${err}`);
  }
  return result;
};

/**
 * 初始化用户
 *
 * @param {*} mysqlModel
 * @param {*} dataList 用户初始数据
 * @return {Array} 操作结果
 */
const initUser = async (mysqlModel, dataList) => {
  const method = new UserMethod(mysqlModel, 'User', {});
  const result = [];
  try {
    for (const user of dataList) {
      const res = await method.createUser(user);
      if (res.status) {
        result.push(`user: ${user.loginName}，创建成功。`);
      } else {
        result.push(`user: ${user.loginName}，创建失败。${res.message}`);
      }
    }
  } catch (err) {
    const { errors } = err;
    if (errors && errors.length) {
      const { message } = errors[0];
      console.error(`数据库执行失败： ${message}`);
      result.push(`数据库执行失败： ${message}`);
    }
    console.error(`系统异常，user创建失败： ${err}`);
    result.push(`系统异常，user创建失败： ${err}`);
  }
  return result;
};

/**
 * 初始化系统配置
 *
 * @param {*} SysConfigModel 系统配置模型
 * @param {*} dataList 系统配置初始数据
 * @return {Array} 操作结果
 */
const initSysConfig = async (SysConfigModel, dataList) => {
  const result = [];
  try {
    for (const config of dataList) {
      const currentSysConfig = await SysConfigModel.create(config);
      console.log(`sysConfig: ${currentSysConfig.name}，创建成功。`);
      result.push(`sysConfig: ${currentSysConfig.name}，创建成功。`);
    }
  } catch (err) {
    const { errors } = err;
    if (errors && errors.length) {
      const { message } = errors[0];
      console.error(`数据库执行失败： ${message}`);
      result.push(`数据库执行失败： ${message}`);
    }
    console.error(`系统异常，memberType创建失败： ${err}`);
    result.push(`系统异常，memberType创建失败： ${err}`);
  }
  return result;
};

/**
 * 初始化数据库
 *
 * @param {*} models
 * @return {Array} 执行结果
 */
module.exports = async (models) => {
  const { Department, SysConfig } = models;
  const { userList, departmentList, sysConfig } = require('./data');
  let returnResult = [];

  const departments = await Department.findAll();
  if (departments && departments.length) return ['无需初始化'];

  console.log('-----------------------------------------------');
  console.log('---------------初始化数据 开始---------------');
  console.log('-----------------------------------------------');

  console.log('1. 初始化部门...');
  returnResult = returnResult.concat(await initDepartment(Department, departmentList));
  console.log('2. 初始化用户...');
  returnResult = returnResult.concat(await initUser(models, userList));
  console.log('3. 初始化系统配置...');
  returnResult = returnResult.concat(await initSysConfig(SysConfig, sysConfig));

  console.log('-----------------------------------------------');
  console.log('---------------初始化数据 结束---------------');
  console.log('-----------------------------------------------');

  return returnResult;
};
