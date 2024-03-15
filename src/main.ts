import './assets/main.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'
import BaseButton from './components/Base/Button.vue'

import App from './App.vue'
import router from './router'

const app = createApp(App)

app.use(createPinia())
app.use(router)
app.component('BaseButton', BaseButton)
app.mount('#app')
