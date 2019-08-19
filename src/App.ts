import { Component, Vue } from 'vue-property-decorator';

@Component
export default class App extends Vue {
  public isLoggedIn: boolean = false;

  public setLoginFlag(login: boolean): void {
    this.isLoggedIn = login;
  }
}