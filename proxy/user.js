/*
 * @Author: lipengshuai 916709059@qq.com
 * @Date: 2023-10-18 14:10:42
 * @LastEditors: lipengshuai 916709059@qq.com
 * @LastEditTime: 2023-10-26 10:12:18
 * @FilePath: /Easy-Mock/proxy/user.js
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
'use strict'

const _ = require('lodash')
const { User } = require('../models')

const gravatar = [
  'media.istockphoto.com/id/1439016527/zh/%E7%85%A7%E7%89%87/new-years-card-silhouette-of-a-jumping-businessman-mt-fuji-and-the-first-sunrise.jpg?s=1024x1024&w=is&k=20&c=XYn2BzXDV3q90BIA5jpuWzcWY_cKfSqymBas31Sh2Qk=',
  'media.istockphoto.com/id/1439016527/zh/%E7%85%A7%E7%89%87/new-years-card-silhouette-of-a-jumping-businessman-mt-fuji-and-the-first-sunrise.jpg?s=1024x1024&w=is&k=20&c=XYn2BzXDV3q90BIA5jpuWzcWY_cKfSqymBas31Sh2Qk=',
  'media.istockphoto.com/id/1439016527/zh/%E7%85%A7%E7%89%87/new-years-card-silhouette-of-a-jumping-businessman-mt-fuji-and-the-first-sunrise.jpg?s=1024x1024&w=is&k=20&c=XYn2BzXDV3q90BIA5jpuWzcWY_cKfSqymBas31Sh2Qk=',
  'media.istockphoto.com/id/1439016527/zh/%E7%85%A7%E7%89%87/new-years-card-silhouette-of-a-jumping-businessman-mt-fuji-and-the-first-sunrise.jpg?s=1024x1024&w=is&k=20&c=XYn2BzXDV3q90BIA5jpuWzcWY_cKfSqymBas31Sh2Qk=',
  'media.istockphoto.com/id/1439016527/zh/%E7%85%A7%E7%89%87/new-years-card-silhouette-of-a-jumping-businessman-mt-fuji-and-the-first-sunrise.jpg?s=1024x1024&w=is&k=20&c=XYn2BzXDV3q90BIA5jpuWzcWY_cKfSqymBas31Sh2Qk=',
  'media.istockphoto.com/id/1439016527/zh/%E7%85%A7%E7%89%87/new-years-card-silhouette-of-a-jumping-businessman-mt-fuji-and-the-first-sunrise.jpg?s=1024x1024&w=is&k=20&c=XYn2BzXDV3q90BIA5jpuWzcWY_cKfSqymBas31Sh2Qk=',
  'media.istockphoto.com/id/1439016527/zh/%E7%85%A7%E7%89%87/new-years-card-silhouette-of-a-jumping-businessman-mt-fuji-and-the-first-sunrise.jpg?s=1024x1024&w=is&k=20&c=XYn2BzXDV3q90BIA5jpuWzcWY_cKfSqymBas31Sh2Qk=',
]

module.exports = class UserProxy {
  static newAndSave (name, password, nickName, headImg) {
    const user = new User()
    const len = gravatar.length

    user.name = name
    user.password = password
    user.nick_name = nickName || _.now()
    user.head_img = headImg || gravatar[_.random(0, len - 1)]

    return user.save()
  }

  static update (user) {
    return User.updateMany({
      _id: user.id
    }, {
      $set: {
        nick_name: user.nick_name,
        head_img: user.head_img,
        password: user.password
      }
    })
  }

  static getByName (userName) {
    return User.findOne({ name: userName })
  }

  static getById (userId) {
    return User.findById(userId)
  }

  static find (query, opt) {
    return User.find(query, {}, opt)
  }
}
