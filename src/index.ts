import Vue from 'vue'
import {
  WindowManager,
  Window,
  Button,
  TabList,
  TabListItem
} from './components'

Vue.component('px-btn', Button)

Vue.component('px-window-manager', WindowManager)
Vue.component('px-window', Window)

Vue.component('px-tab-list', TabList)
Vue.component('px-tab-list-item', TabListItem)
Vue.component('px-tab-view', TabListItem)
