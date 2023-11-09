import './assets/main.css'


import { createApp } from 'vue'
import { createPinia } from 'pinia'
import App from './App.vue'
import router from './router/index.js'
import {IonicVue} from '@ionic/vue'
import VueAxios from 'vue-axios'

const app = createApp(App)
app.use(BootstrapVue)
app.use(IconsPlugin)
app.use(createPinia())
app.use(VueAxios,axios)
app.use(router)

app.mount('#app')
