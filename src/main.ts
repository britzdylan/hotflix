import './assets/main.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'
import BasePageView from '@/components/Base/PageView.vue'
import BaseButton from '@/components/Base/Button.vue'
import BaseHeader from '@/components/Base/Header/index.vue'
import NavbarMobile from '@/components/Base/NavbarMobile.vue'
import HeaderMobileSubPage from '@/components/Base/Header/MobileSubPage.vue'
import LoaderIcon from '@/components/Icons/Loading.vue'

import App from './App.vue'
import router from './router'

const app = createApp(App)

app.use(createPinia())
app.use(router)
app.component('BasePageView', BasePageView)
app.component('BaseButton', BaseButton)
app.component('BaseHeader', BaseHeader)
app.component('NavbarMobile', NavbarMobile)
app.component('HeaderMobileSubPage', HeaderMobileSubPage)
app.component('LoaderIcon', LoaderIcon)
app.mount('#app')
