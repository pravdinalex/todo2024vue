import { createApp } from 'vue'
import { createPinia } from 'pinia'
import { createVuestic } from 'vuestic-ui'
import App from './App.vue'
import './assets/main.css'
import 'material-design-icons-iconfont/dist/material-design-icons.min.css'
import 'vuestic-ui/css'

const app = createApp(App)

app.use(createPinia())
app.use(createVuestic({})) // TODO: use createVuesticEssential to reduce bundle size

app.mount('#app')
