import Vue from 'vue';
import Vuetify, {
  VApp,
  VCard,
  VCardTitle,
  VTextField,
  VSpacer,
  VDataTable,
  VForm,
  VContainer,
  VLayout,
  VFlex,
  VSelect,
  VBtn,
  VImg,
} from 'vuetify/lib';

Vue.use(Vuetify, {
  components: {
    VApp,
    VCard,
    VTextField,
    VCardTitle,
    VSpacer,
    VDataTable,
    VForm,
    VContainer,
    VLayout,
    VFlex,
    VSelect,
    VBtn,
    VImg,
  },
});

export default new Vuetify({
  icons: {
    iconfont: 'mdi',
  },
});
