import { Component, Vue } from 'vue-property-decorator';
import { RequestService } from '@/utils/RequestUtils.ts';
import { CommonServices } from '@/utils/CommonUtils';
import RequestHelper from '@/helpers/RequestHelper';
import { AuthObj } from '@/maps/AuthMap';
import router from '@/router';

@Component({
  beforeRouteEnter: async (to, from, next) => {
    if (from.name === 'report') {
      try {
        await RequestService.postRequest('logout', {
          userAction: 'logout',
        });
        AuthObj.clearData();
        next((login) => {
            login.$emit('login-event', false);
          },
        );
      } catch (error) {
        console.error(error);
      }
    } else {
      next();
    }
  },
})
export default class Login extends Vue {
  protected value1: Date = new Date();
  private user: string = '';
  private pass: string = '';
  protected async submitLogin() {
    try {
      AuthObj.clearData();
      await CommonServices.setDashboardToken();
      const loginResponse = await RequestService.postRequest('authNoTag', {
        userAction: 'login',
        userName: this.user,
        password: this.pass,
      });
      const loginObject = new RequestHelper(loginResponse);
      this.$emit('login-event', true);
      AuthObj.setData('sessionKey', loginObject.getData('sessionKey'));
      AuthObj.setData(RequestService.getFP(), loginObject.getData('authTag'));
      router.push('report');
    } catch (error) {
      console.error(error);
    }
  }
}