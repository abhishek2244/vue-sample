import Vue from 'vue';
import App from '@/app.vue';
import router from './router';
import store from './store';
import vuetify from '@/plugins/vuetify';
import '@/plugins/fontawesome';
import '@/plugins/bootstrap';
import Datepicker from 'vue2-datepicker';

Vue.use(Datepicker);

Vue.config.productionTip = false;

new Vue({
  router,
  store,
  vuetify,
  render: (h) => h(App),
}).$mount('#app');
