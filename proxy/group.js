/*
 * @Author: lipengshuai 916709059@qq.com
 * @Date: 2023-10-18 14:10:42
 * @LastEditors: lipengshuai 916709059@qq.com
 * @LastEditTime: 2023-10-26 10:04:02
 * @FilePath: /Easy-Mock/proxy/group.js
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
'use strict'

const { Group } = require('../models')
const UserGroupProxy = require('./user_group')

module.exports = class GroupProxy {
  static async newAndSave (docs) {
    const group = new Group(docs)
    const result = await group.save()
    return UserGroupProxy.newAndSave({ user: result.user, group: result.id })
  }

  static findByName (name) {
    return Group.findOne({ name })
  }

  static findOne (query) {
    return Group.findOne(query)
  }

  static find (query) {
    return Group.find(query, {})
  }

  static updateById (id, doc) {
    return Group.updateMany({ _id: id }, { $set: doc })
  }

  static del (query) {
    return Group.remove(query)
  }
}
