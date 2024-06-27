import Vue from 'vue'
import './plugins/axios'
import App from './App.vue'
import router from './router'
import store from './store'
// import axios from 'axios';

import { Switch } from 'vant';
import { Swipe, SwipeItem } from 'vant';
import { Skeleton } from 'vant';
import { CountDown } from 'vant';

Vue.use(CountDown);
Vue.use(Swipe);
Vue.use(SwipeItem);
Vue.use(Switch);
Vue.use(Skeleton);

Vue.config.productionTip = false


new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')




