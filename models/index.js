/*
 * @Author: lipengshuai 916709059@qq.com
 * @Date: 2023-10-18 14:10:42
 * @LastEditors: lipengshuai 916709059@qq.com
 * @LastEditTime: 2023-10-22 22:54:56
 * @FilePath: /Easy-Mock/models/index.js
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
'use strict'

const mongoose = require('mongoose')
// console.log('mongoose: ', mongoose);
const config = require('config')
mongoose.Promise = global.Promise
mongoose.connect(config.get('db'), {
  // useMongoClient: true,
  // poolSize: 20
}).catch((err) => {
  /* istanbul ignore if */
  if (err) {
    console.log('报错了 :',err);
    console.error('connect to %s error: ', config.get('db'), err.message)
    process.exit(1)
  }
})

module.exports = {
  User: require('./user'),
  Mock: require('./mock'),
  Group: require('./group'),
  Project: require('./project'),
  MockCount: require('./mock_count'),
  UserGroup: require('./user_group'),
  UserProject: require('./user_project')
}
