import './assets/main.css'
import 'primeicons/primeicons.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'

import Lara from '@primevue/themes/lara'
import PrimeVue from 'primevue/config'
import { definePreset } from '@primevue/themes'

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
import Card from 'primevue/card'

const app = createApp(App)

const MyPreset = definePreset(Lara, {
  semantic: {
    primary: {
      50: '#faf5f7',
      100: '#f7ecf1',
      200: '#f0dae4',
      300: '#e6bbcd',
      400: '#d591ac',
      500: '#c56f8e',
      600: '#b05270',
      700: '#964059',
      800: '#7d374a',
      900: '#592a37',
      950: '#3e1923',
    },
  },
})

app.use(createPinia())
app.use(router)
app.use(PrimeVue, {
  theme: {
    preset: MyPreset,
    options: {
      darkModeSelector: '.app-dark',
    },
  },
})

app.component('PvButton', Button)
app.component('PvMenubar', Menubar)
app.component('PvDropdown', Dropdown)
app.component('PvInputText', InputText)
app.component('PvAvatar', Avatar)
app.component('PvTag', Tag)
app.component('PvChip', Chip)
app.component('PvPanel', Panel)
app.component('PvCard', Card)

app.directive('ripple', Ripple)

app.mount('#app')
