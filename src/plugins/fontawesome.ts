import Vue from 'vue';
import { library } from '@fortawesome/fontawesome-svg-core';
import { faUser, faCheckCircle, faTimesCircle,
         faHourglass, faAngleDoubleLeft } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';

library.add(faUser, faCheckCircle, faHourglass, faTimesCircle, faAngleDoubleLeft);
Vue.component('font-awesome-icon', FontAwesomeIcon);