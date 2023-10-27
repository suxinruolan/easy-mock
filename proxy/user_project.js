/*
 * @Author: lipengshuai 916709059@qq.com
 * @Date: 2023-10-18 14:10:42
 * @LastEditors: lipengshuai 916709059@qq.com
 * @LastEditTime: 2023-10-26 10:03:51
 * @FilePath: /Easy-Mock/proxy/user_project.js
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
'use strict'

const { UserProject } = require('../models')

module.exports = class UserProjectProxy {
  static newAndSave (docs) {
    return UserProject.insertMany(docs)
  }

  static find (query, opt) {
    return UserProject.find(query, {}, opt)
  }

  static findOne (query, opt) {
    return UserProject.findOne(query, {}, opt)
  }

  static updateWorkbench (doc) {
    return UserProject.updateMany({
      _id: doc.id
    }, {
      $set: {
        is_workbench: doc.is_workbench
      }
    })
  }

  static delByProjectId (projectId) {
    return UserProject.remove({
      project: projectId
    })
  }

  static del (query) {
    return UserProject.remove(query)
  }
}
