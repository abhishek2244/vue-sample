interface CustomObject {
  [key: string]: any
}

export default class RequestHelper {
  private respObj: CustomObject = {};
  constructor(responseObj: CustomObject) {
    this.respObj = responseObj.data;
  }

  public getData(key?: string) {
    if (key && this.respObj[key]) {
      return this.respObj[key];
    } else {
      return this.respObj;
    }
  }
}