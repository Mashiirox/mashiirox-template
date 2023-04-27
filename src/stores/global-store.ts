import { observable, action, makeObservable } from 'mobx';

export class GlobalStore {
  isLogin = localStorage.getItem('isLogin') === '1';

  constructor() {
    makeObservable(this, {
      isLogin: observable,
      setIsLogin: action,
      clearStore: action,
    });
  }

  setIsLogin = (value: boolean): void => {
    this.isLogin = value;
  };

  clearStore = (): void => {
    this.isLogin = false;
  };
}

export default new GlobalStore();
