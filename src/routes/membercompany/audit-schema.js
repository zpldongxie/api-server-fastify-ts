/*
 * @description: 审批接口参数
 * @author: zpl
 * @Date: 2021-01-11 16:55:39
 * @LastEditTime: 2021-01-11 16:55:58
 * @LastEditors: zpl
 */
const S = require('fluent-schema');
const { memberStatus } = require('../../dictionary');

const bodyJsonSchema = S.object()
    .prop('id', S.string().format('uuid'))
    .prop(
        'status',
        S.string()
            .enum(Object.values(memberStatus))
            .default(memberStatus.underReview)
            .description('状态'),
    )
    .prop('rejectDesc', S.string().description('驳回原因'))
    .required(['id', 'status']);

module.exports = {
  body: bodyJsonSchema,
};
