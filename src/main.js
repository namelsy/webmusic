import { createApp, provide } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import * as vant from './vant/vant';
import VueCookies from 'vue-cookies'






createApp(App).use(store).use(router).use(vant).use(VueCookies)
.mount('#app')
provide('$cookies',VueCookies)   //把cookies挂在全局
