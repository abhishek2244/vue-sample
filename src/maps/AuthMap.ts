class AuthMap {
  private map: {
    [key: string]: any;
  } = {};

  public setData(key: string, val: any): void {
    this.map[key] = val;
    localStorage.setItem(key, val);
  }
  public getData(key: string): any {
    if (this.map[key]) {
      return this.map[key];
    } else if (localStorage.getItem(key)) {
      this.map[key] = localStorage.getItem(key);
      return this.map[key];
    } else {
      return false;
    }
  }
  public clearData(): void {
    this.map = {};
    localStorage.clear();
  }
}

export const AuthObj = new AuthMap();