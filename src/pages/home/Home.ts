import { Component, Vue } from 'vue-property-decorator';
import HelloWorld from '@/pages/hello-world/hello-world.vue';

@Component({
  components: {
    HelloWorld,
  },
})
export default class Home extends Vue {}
