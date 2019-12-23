import Vue from 'vue'
import Vuetify from 'vuetify'
import 'vuetify/src/stylus/main.styl'
import id from 'vuetify/es5/locale/id'

Vue.use(Vuetify, {
  iconfont: 'md',
  lang: {
    locales: { id },
    current: 'id'
  }
})
