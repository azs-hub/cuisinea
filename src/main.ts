import './assets/main.css'
import 'primevue/resources/themes/aura-light-green/theme.css'
import 'primeicons/primeicons.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'
import PrimeVue from 'primevue/config'

import App from './App.vue'
import router from './router'

import Ripple from 'primevue/ripple'
import Button from 'primevue/button'
import Menubar from 'primevue/menubar'
import Dropdown from 'primevue/dropdown'
import InputText from 'primevue/inputtext'
import Avatar from 'primevue/avatar'
import Tag from 'primevue/tag'
import Chip from 'primevue/chip'
import Panel from 'primevue/panel'

const app = createApp(App)

app.use(createPinia())
app.use(router)
app.use(PrimeVue, { ripple: true })

app.component('PvButton', Button)
app.component('PvMenubar', Menubar)
app.component('PvDropdown', Dropdown)
app.component('PvInputText', InputText)
app.component('PvAvatar', Avatar)
app.component('PvTag', Tag)
app.component('PvChip', Chip)
app.component('PvPanel', Panel)

app.directive('ripple', Ripple)

app.mount('#app')
