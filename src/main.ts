import plugin from '@/plugins'
import '@/assets/global.scss'
import { createApp } from 'vue'
import App from './App.vue'

function bootstrap() {
  const app = createApp(App)
  plugin(app)
  app.mount('#app')
}

bootstrap()
