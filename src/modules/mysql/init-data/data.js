/*
 * @description: 数据库初始数据
 * @author: zpl
 * @Date: 2020-07-26 22:19:42
 * @LastEditTime: 2021-02-20 12:06:18
 * @LastEditors: zpl
 */
// 用户组
exports.userGroupList = [{
  name: '管理员',
  tag: 'admin',
}, {
  name: '用户',
  tag: 'user',
}, {
  name: '访客',
  tag: 'guest',
}];

// 用户
exports.userList = [{
  loginName: 'admin',
  password: 'waxh1234',
  name: 'admin',
  sex: '男',
  mobile: '18688888888',
  email: '813015173@qq.com',
  remark: '',
  verification_code: '',
  status: 1,
  group: '管理员',
}, {
  loginName: 'user',
  password: 'Ysp@1234',
  name: 'user',
  sex: '男',
  mobile: '',
  email: '',
  remark: '',
  verification_code: '',
  status: 1,
  group: '用户',
}];

// 栏目类型
exports.channelTypeList = [{
  name: '主页',
  orderIndex: 0,
}, {
  name: '文章列表',
  orderIndex: 5,
}, {
  name: '图片列表',
  orderIndex: 10,
}, {
  name: '图文列表',
  orderIndex: 15,
}, {
  name: '视频列表',
  orderIndex: 20,
}, {
  name: '单篇文章',
  orderIndex: 25,
}, {
  name: '外部链接',
  orderIndex: 30,
}, {
  name: '安全培训',
  orderIndex: 35,
}];

// 会员类别
exports.memberTypeList = [{
  name: '副理事长单位',
  orderIndex: 5,
}, {
  name: '理事单位',
  orderIndex: 10,
}, {
  name: '单位会员',
  orderIndex: 15,
}, {
  name: '个人会员',
  orderIndex: 20,
}];

// 系统配置
exports.sysConfig = [{
  name: 'base_url',
  value: 'http://www.snains.cn/',
  descStr: '访问域名/IP',
  group: '上传',
}, {
  name: 'image_ext',
  value: 'gif,jpg,jpeg,png,bmp',
  descStr: '图片格式限制，以英文逗号分隔',
  group: '上传',
}, {
  name: 'image_size',
  value: '1024',
  descStr: '图片大小限制，单位KB',
  group: '上传',
}, {
  name: 'video_ext',
  value: 'mp4,ogg,wav',
  descStr: '视频格式限制，以英文逗号分隔',
  group: '上传',
}, {
  name: 'video_size',
  value: '512000',
  descStr: '视频大小限制，单位KB',
  group: '上传',
}, {
  name: 'audio_ext',
  value: 'mp3',
  descStr: '音频格式限制，以英文逗号分隔',
  group: '上传',
}, {
  name: 'audio_size',
  value: '51200',
  descStr: '音频大小限制，单位KB',
  group: '上传',
}, {
  name: 'other_ext',
  value: 'doc,docx,xls,xlsx,ppt,htm,html,txt,zip,rar,gz,bz2',
  descStr: '其他格式限制，以英文逗号分隔',
  group: '上传',
}, {
  name: 'other_size',
  value: '5120',
  descStr: '其他大小限制，单位KB',
  group: '上传',
}, {
  name: 'host',
  value: 'smtp.sina.com',
  descStr: 'SMTP服务器',
  group: '邮箱',
}, {
  name: 'port',
  value: '465',
  descStr: '端口号',
  group: '邮箱',
}, {
  name: 'user',
  value: 'zpl_dongxie',
  descStr: '用户名',
  group: '邮箱',
}, {
  name: 'pass',
  value: 'a5a0fbddd5e70460',
  descStr: '授权码',
  group: '邮箱',
}, {
  name: 'from',
  value: '"朱鹏亮" <zpl_dongxie@sina.com>',
  descStr: '发件人邮箱地址',
  group: '邮箱',
}, {
  name: 'oldManager',
  value: 'http://www.snains.cn:8000',
  descStr: '同步数据的旧环境',
  group: '同步',
}];
