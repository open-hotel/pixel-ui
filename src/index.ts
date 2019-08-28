import './stylus/main.styl'
import { PluginFunction } from 'vue'
import {
  WindowManager,
  Window,
  Button,
  TabList,
  TabListItem,
  TabView,
  TabContainer
} from './components'

export * from './components'

export const PixelUI: PluginFunction<void> = Vue => {
  Vue.component('px-btn', Button)

  Vue.component('px-window-manager', WindowManager)
  Vue.component('px-window', Window)

  Vue.component('px-tab-list', TabList)
  Vue.component('px-tab-list-item', TabListItem)
  Vue.component('px-tab-view', TabView)
  Vue.component('px-tab-container', TabContainer)
}
