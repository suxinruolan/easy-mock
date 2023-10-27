/*
 * @Author: lipengshuai 916709059@qq.com
 * @Date: 2023-10-18 14:10:42
 * @LastEditors: lipengshuai 916709059@qq.com
 * @LastEditTime: 2023-10-22 23:35:50
 * @FilePath: /Easy-Mock/proxy/mock_count.js
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
'use strict'

const _ = require('lodash')
const moment = require('moment')

const { MockCount } = require('../models')

module.exports = class MockCountProxy {
  static newAndSave (mockIds) {
    const group = _.groupBy(mockIds)
    const date = moment().format('YYYY-MM-DD')

    Object.keys(group).forEach(async mockId => {
      await MockCount.updateMany(
        {mock: mockId, create_at: date},
        {$inc: { count: group[mockId].length }},
        {upsert: true}
      )
    })
  }
}
