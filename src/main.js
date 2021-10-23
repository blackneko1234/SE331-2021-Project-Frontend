import { FontAwesomeIcon } from './plugins/font-awesome'
import { createApp } from 'vue'
import { Quasar } from 'quasar'
import quasarUserOptions from './quasar-user-options'
import Vaccination from './store'
import upperFirst from 'lodash/upperFirst'
import camelCase from 'lodash/camelCase'
import router from './router'
import App from './App.vue'
import '@/services/AxiosInterceptorSetup.js'
import 'nprogress/nprogress.css'
import 'bootstrap'

const requireComponent = require.context(
  './components',
  false,
  /Base[A-Z]\w+\.(vue|js)$/
)

const app = createApp(App)
requireComponent.keys().forEach((fileName) => {
  const componentConfig = requireComponent(fileName)
  const componentName = upperFirst(
    camelCase(fileName.replace(/^\.\/(.*)\.\w+$/, '$1'))
  )
  app.component(componentName, componentConfig.default || componentConfig)
})
app.use(Quasar, quasarUserOptions).use(router).component('font-awesome-icon', FontAwesomeIcon).provide('Vaccination', Vaccination).mount('#app')
