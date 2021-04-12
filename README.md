# api-server-fastify
## 基于fastify实现的RESTful API服务

## 系统说明
- 本系统为纯API服务，无UI界面
- 使用到的技术

||||||
| :---: | :---: | :---: | :---: | :---: |
|<a href="https://nodejs.org/zh-cn/" target="_blank"><img src="https://nodejs.org/static/images/logo.svg" height="40" /><br />nodejs</a>|<a href="https://www.fastify.io/" target="_blank"><img src="https://www.fastify.io/images/fastify-logo-inverted.2180cc6b1919d47a.png" height="40" /><br />fastify</a>|<a href="https://swagger.io/" target="_blank"><img src="https://static1.smartbear.co/swagger/media/assets/images/swagger_logo.svg" height="40" /><br />swagger</a>|<a href="https://sequelize.org/" target="_blank"><img src="https://sequelize.org/master/image/brand_logo.png" height="40" /><br />sequelize</a>|<a href="https://www.mysql.com/" target="_blank"><img src="https://labs.mysql.com/common/logos/mysql-logo.svg?v2" height="40" /><br />mysql</a>|
<br />
- 参考项目

|||
|-|-|
|[fastify-example](https://github.com/delvedor/fastify-example#readme)|[fastify-starter-kit](https://github.com/SecSamDev/fastify-starter-kit)|
<br />
- 代码结构
```hash
root
  ├─ models       # 数据库模型
  |     ├─ business_basis           # 基础教育数据库
  |     |    ├─ initData            # 初始数据
  |     |    ├─ schemas             # 模型定义
  |     |    ├─ index.js            # 统一加载所有model
  |     |    ├─ README.md           # 说明文档
  |     |    ├─ user.js             # 模型方法实现-用户，其他依此类推
  |     |
  |     └─ dictionary               # 字典数据库，结构同上
  |
  ├─ plugins       # 插件
  |     ├─ authorization.js         # OAthor2认证配置，暂未生效
  |     ├─ jwt.js                   # jwt认证
  |     ├─ mysql_business_basis.js  # 基础教育数据库模型挂载及同步
  |     ├─ mysql_dictionary.js      # 字典数据库模型挂载及同步
  |     ├─ swagger.js               # swagger路由映射
  |     └─ util.js                  # 定义一此通用的工具及方法
  |
  ├─ routes        # 路由
  |     ├─ auth                     # 认证相关路由
  |     ├─ status.js                # 系统状态路由
  |     ├─ README.md                # 路由实现说明及开发建议
  |     ├─ user                     # 用户相关路由，其他依此类推
  |
  ├─ script        # 需要用到，但不影响项目的脚本
  |     ├─ keys-generator.js        # 生成42位长度的base64字符串
  |
  ├─ test          # 测试脚本，后期再实现
  |
  ├─ .env          # 系统变量配置
  ├─ app.js        # 应用入口
  ├─ configure_dev.js           # 开发环境配置
  ├─ configure_production.js    # 生产环境配置
  └─ server.js                  # 不使用cli时，请直接以此文件为入口，使用npm执行
```

# TODO
## swagger转openAPI后，components下schemas名称不准确的问题
- fastify-swagger引用的json-schema-resolver包需要优化，官方已有[问题跟踪](https://github.com/Eomm/json-schema-resolver/pull/4)
- 先修改[源码](node_modules/json-schema-resolver/ref-resolver.js)140行进行规避
```js
json[kRefToDef] = `def-${rolling++}`
// 修改为
json[kRefToDef] = id || `def-${rolling++}`
```

## 关于数据库
本系统使用mysql，对应的操作库为sequelize和mysql2

## 关于接口
### 接口定义步骤
- 定义了针对所有model的通用api模板
- 通过CLI工具自动生成标准route文件，有特殊业务场景的可在生成的标准文件中进行修改
- 所有参数验证在route文件中结合schema完成
```js
// 参数验证
const validate = ajv.compile(queryListSchema.body.valueOf());
const valid = validate(request.body);
if (!valid) {
  return reply.code(400).send(validate.errors);
}
```
- routes -> util.js 实现了面向业务操作的基本封装以及统一应答设定，由route文件进行调用
### 本系统使用fastify-swagger自动生成api文档
api文档地址：
[http://{ip}:4000/documentation/static/index.html](http://139.186.165.200:3000/documentation/static/index.html)

## 其他实现
### 1. 上传下载使用fastify-multer插件
配置方法
- 在项目config中配置上传的物理路径，建议先手动创建uploads/文件夹，再配置具体路径
- 此时可以正常进行上传
- 在管理平台上传配置中设置访问域名，例如 http://www.baidu.com/，建议以 / 结尾
- 资源管理功能中会默认域名对应配置的物理路径，且上传文件夹是以静态资源进行访问
- 例如磁盘中/uploads/image/aaa.png 对应的访问地址就是 ip:port/uploads/image/aaa.png

## 参考代码，源自fastify-example项目
- fastfiy封装的http客户端，性能做过优化
```js
import undici from 'undici'
// Undici is an http client for Node.js extremely optimized
// to achieve the best performances possible. Is very well
// suited if you need to send all the request to the same endpoint.
const client = undici('https://api.github.com')
async function isUserAllowed (token) {
  const response = await client.request({
    method: 'GET',
    path: '/user/emails',
    headers: {
      'User-Agent': 'scurte',
      Authorization: `Bearer ${token}`
    }
  })

  if (response.statusCode >= 400) {
    throw httpErrors.unauthorized('Authenticate again')
  }

  let payload = ''
  response.body.setEncoding('utf8')
  for await (const chunk of response.body) {
    payload += chunk
  }
  payload = JSON.parse(payload)

  const isAllowed = payload.some(ele => allowedUsers.includes(ele.email))
  if (!isAllowed) {
    const err = httpErrors.forbidden('You are not allowed to access this')
    // let's store the user info so we can log them later
    err.user = payload
    throw err
  }

  for (const ele of payload) {
    if (ele.primary) return ele.email
  }
  throw httpErrors.badRequest('The user does not have a primary email')
}
```
- OAuth认证插件
```js
import OAuth from 'fastify-oauth2'
// `fastify-oauth2` is a plugin that helps you handle oauth2 flows.
// It comes with preconfigured settings for the major oauth providers.
// Are you using Auth0? See https://npm.im/fastify-auth0-verify
fastify.register(OAuth, {
  name: 'github',
  credentials: {
    client: {
      id: config.GITHUB_APP_ID,
      secret: config.GITHUB_APP_SECRET
    },
    auth: OAuth.GITHUB_CONFIGURATION
  },
  startRedirectPath: '/_app/login/github',
  // TODO: this url should change if we are in prod
  callbackUri: 'http://localhost:3000/_app/login/github/callback',
  scope: ['user:email']
})
```