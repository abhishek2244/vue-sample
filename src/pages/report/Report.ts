import { Component, Vue } from 'vue-property-decorator';
import { RequestService } from '@/utils/RequestUtils.ts';
import RequestHelper from '@/helpers/RequestHelper';

@Component
export default class Report extends Vue {
  protected search: string = '';
  protected selectedDays: string = '';
  protected selectedMerchant: {
    [key: string]: any,
  } = {};
  protected selectedCurrency: string = '';
  protected merchants: object[] = [];
  protected currencyList: string[] = [];
  protected multiCurrData: object[] = [];
  // tslint:disable-next-line: max-line-length
  protected txnRef: string = '';
  protected value1: Date = new Date();
  // tslint:disable-next-line: max-line-length
  protected days: object[] = [{ text: 'Same day', value: 1 }, { text: '2 days', value: 2 }, { text: '3 days', value: 3 }, { text: '4 days', value: 4 }, { text: '5 days', value: 5 }, { text: '6 days', value: 6 }, { text: '7 days', value: 7 }];
  
  constructor() {
    super();
    this.init();
  }
  
  protected async searchTxn(): Promise<void> {
    const searchObj = this.getSearchTxnObj();
    const multiCurrData: object[] = [];
    try {
      const reportResponse = await RequestService.postRequest('transaction', searchObj);
      const reportResponseObj = new RequestHelper(reportResponse).getData();
      if (reportResponseObj.length > 0) {
        for (const iterator of reportResponseObj) {
          multiCurrData.push({ 
            date: iterator.transactionDate,
            merchantName: iterator.merchantName,
            txnRef: iterator.txnReference,
            currencyCode: iterator.currencyCode,
            amount: iterator.txnAmount,
            paymentMode: iterator.paymentMode ? iterator.paymentMode : 'PaymentAbandoned',
            txnStatus: this.getStatusIcon(iterator.txnStatus, true) ,
            acquirer: iterator.provider || '',
          });
        }
        console.log(multiCurrData);
        console.log(reportResponseObj);
        
        this.multiCurrData = multiCurrData;
      }
    } catch (error) {
      console.error(error);
    }
  }
  
  protected getImageSrc(key: string, provider: boolean) {
    if (provider) {
      return key ? require('../../assets/images/' + key.toLowerCase() + '.jpg') : '';
    } else {
      return key ? require('../../assets/images/' + key + '.svg') : '';
    }
  }

  private getStatusIcon(value: string, large: boolean) {
    let labelClass = '';
    let sizeClass = '';
    let styleClass = '';
    
    if (large) {
      sizeClass += 'lg';
    }
    switch (value) {
      case 'Successful':
      labelClass = 'check-circle';
      styleClass = '{ color: "text-success" }';
      break;
      
      case 'Pending':
      labelClass = 'hourglass';
      styleClass = '{ color: "text-warning" }';
      break;
      
      case 'Failed':
      labelClass = 'times-circle';
      styleClass = '{ color: "text-danger" }';
      break;
      
      case 'Reversed':
      labelClass = 'angle-double-left';
      styleClass = '{ color: "text-danger" }';
      break;
    }
    
    return '<font-awesome-icon icon="' + labelClass + '" size="' + sizeClass + '" :style="' + styleClass + '">';
  }
  
  private getSearchTxnObj() {
    const fromDay = this.value1 ? new Date(this.value1) : new Date();
    const fromDate = fromDay.getDate() + '/' + fromDay.getMonth() + '/' + fromDay.getFullYear();
    const txnRef = this.txnRef && typeof this.txnRef !== 'string' ? this.txnRef : '';  
    const currency = !this.selectedCurrency || this.selectedCurrency === 'ALL' 
    ? '' : this.selectedCurrency;
    let toDate: any = new Date();
    const tmpToDay = (parseInt(this.selectedDays, 10) || 1);
    const toDay = tmpToDay - 1;
    fromDay.setDate(fromDay.getDate() + toDay);
    const range = fromDay;
    if (range.getTime() > toDate.getTime()) {
      toDate = toDate.getDate() + '/' + toDate.getMonth() + '/' + toDate.getFullYear();
    } else {
      toDate = fromDay.getDate() + '/' + fromDay.getMonth() + '/' + fromDay.getFullYear();
    }
    return {
      userAction: 'searchTransactions',
      merchantId: this.selectedMerchant.userId,
      txnReference: txnRef,
      fromDate,
      toDate,
      currencyCode: currency,
    };
  }
  
  
  private async init() {
    try {
      const merchantResponse = await RequestService.postRequest('transaction', {
        userAction: 'getList',
      });
      const merchantObj = new RequestHelper(merchantResponse);
      this.$emit('login-event', true);
      const users = merchantObj.getData('users');
      const currencyList = merchantObj.getData();
      
      for (const k in currencyList) {
        if (currencyList.hasOwnProperty(k)) {
          this.currencyList.push(k);
        }
      }
      // tslint:disable-next-line: prefer-for-of
      for (let i = 0; i < users.length; i++) {
        const newId = users[i].id.split('.');
        if (newId.length === 2) {
          this.merchants.push({
            text: '---' + users[i].companyName,
            value: users[i],
          })
        } else if (newId.length === 3) {
          this.merchants.push({
            text: '------' + users[i].companyName,
            value: users[i],
          })
        } else {
          this.merchants.push({
            text: users[i].companyName,
            value: users[i],
          })
        }
      }
    } catch (e) {
      console.error(e);
      
    }
  }
}