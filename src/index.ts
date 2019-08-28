import './stylus/main.styl'
import { VueConstructor } from 'vue'
import {
  WindowManager,
  Window,
  Button,
  TabList,
  TabListItem,
  TabView,
  TabContainer
} from './components'

export const PixelUI = (Vue: VueConstructor) => {
  Vue.component('px-btn', Button)

  Vue.component('px-window-manager', WindowManager)
  Vue.component('px-window', Window)

  Vue.component('px-tab-list', TabList)
  Vue.component('px-tab-list-item', TabListItem)
  Vue.component('px-tab-view', TabView)
  Vue.component('px-tab-container', TabContainer)
}
