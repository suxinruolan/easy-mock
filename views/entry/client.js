/*
 * @Author: lipengshuai 916709059@qq.com
 * @Date: 2023-10-18 14:10:42
 * @LastEditors: lipengshuai 916709059@qq.com
 * @LastEditTime: 2023-10-26 22:25:47
 * @FilePath: /Easy-Mock/views/entry/client.js
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import Vue from 'vue'
import iView from 'iview'
import { createApp } from './main'
import 'github-markdown-css'
import 'highlight.js/styles/github.css'
const { app, router, store } = createApp()

Vue.mixin({
  beforeRouteUpdate (to, from, next) {
    const { asyncData } = this.$options
    if (asyncData) {
      asyncData({
        store: this.$store,
        route: to
      }).then(next).catch(next)
    } else {
      next()
    }
  }
})

if (window.__INITIAL_STATE__) {
  store.replaceState(window.__INITIAL_STATE__)
}

// 初始化用户信息
store.commit('user/SET_VALUE', Vue.ls.get('user') || {})
router.onReady(() => {
  router.beforeResolve((to, from, next) => {
    const matched = router.getMatchedComponents(to)
    const prevMatched = router.getMatchedComponents(from)
    let diffed = false
    const activated = matched.filter((c, i) => {
      return diffed || (diffed = (prevMatched[i] !== c))
    })
    const asyncDataHooks = activated.map(c => c.asyncData).filter(_ => _)
    if (!asyncDataHooks.length) {
      return next()
    }

    iView.LoadingBar.start()
    Promise.all(asyncDataHooks.map(hook => hook({ store, route: to })))
      .then(() => {
        iView.LoadingBar.finish()
        next()
      })
      .catch(next)
  })

  app.$mount('#app')
})
