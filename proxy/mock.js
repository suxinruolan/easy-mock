/*
 * @Author: lipengshuai 916709059@qq.com
 * @Date: 2023-10-18 14:10:42
 * @LastEditors: lipengshuai 916709059@qq.com
 * @LastEditTime: 2023-10-22 23:46:13
 * @FilePath: /Easy-Mock/proxy/mock.js
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
'use strict'

const { Mock } = require('../models')

module.exports = class MockProxy {
  static newAndSave (docs) {
    return Mock.insertMany(docs)
  }

  static getById (mockId) {
    return Mock.findById(mockId).populate('project')
  }

  static find (query, opt) {
    return Mock.find(query, {}, opt).populate('project')
  }

  static findOne (query, opt) {
    return Mock.findOne(query, {}, opt).populate('project')
  }

  static updateById (mock) {
    return Mock.updateMany({
      _id: mock.id
    }, {
      $set: {
        url: mock.url,
        mode: mock.mode,
        method: mock.method,
        parameters: mock.parameters,
        description: mock.description,
        response_model: mock.response_model
      }
    })
  }

  static updateMany (docs) {
    return Promise.all(docs.map(item => this.updateById(item)))
  }

  static delByIds (mockIds) {
    return Mock.remove({
      _id: {
        $in: mockIds
      }
    })
  }

  static del (query) {
    return Mock.remove(query)
  }
}
