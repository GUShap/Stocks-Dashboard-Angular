import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UtilsService {
  static load() {
    throw new Error('Method not implemented.');
  }

  constructor() { }

  public setId(): string {
    var txt = ''
    let length = 10;
    const possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'
    for (let i = 0; i < length; i++) {
      txt += possible.charAt(Math.floor(Math.random() * possible.length))
    }
    return txt
  }

  public getRandomInt(max = 500000, min = 10000) {
    return Math.floor(Math.random() * (max - min) + min)
  }

  public store(key: string, any: any): void {
    localStorage[key] = JSON.stringify(any);
  }

  public load(key: string): any {
    var str = localStorage[key] || 'null';
    return JSON.parse(str);
  }
}
