import { Injectable } from '@angular/core';
import { LocalStorageService } from 'angular-2-local-storage';
import { CookieService } from 'ng2-cookies';

@Injectable()
export class StorageServiceService {

  constructor(private ls: LocalStorageService, public cookieService: CookieService) { }

  setData(data) {
    this.ls.set("data", data);
  }
  getData() {
    let tmp = this.ls.get("data"); // data tre sa fie array de id-uri, to remember
    if (tmp == null || typeof tmp == undefined || typeof tmp != "object")
      return [];
    else return tmp;
  }

  appendToData(id) {
    let old = <Array<number>>this.getData();
    if (old.indexOf(id) == -1) {
      console.log(old);
      old.push(id);
      this.setData(old);
    }
  }
  removeFromData(id) {
    let old = <Array<number>>this.getData();
    let inxd = old.indexOf(id.toString());
    if (inxd > -1) {
      old.splice(inxd, 1);
      this.setData(old);
    }
  }
  getCookie(cName: string) {
    return this.cookieService.get(cName);
  }

  addCookie(cName: string, cValue: string) {
    console.log('Adding: ', cName, cValue);
    this.cookieService.set(cName, cValue);
  }
  removeCookie(rName: string) {
    console.log('Removing: ', rName);
    this.cookieService.delete(rName);
  }

  checkCookie(cName) {
    return this.cookieService.check(cName);
  }

}
