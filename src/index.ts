import { App } from 'vue'
import * as Components from './components'
import './index.scss'

function install(app: App) {
  Object.entries(Components)
    .forEach(([name, component]) => {
      app.component(name, component)
    })
}

export default {
  install
}
