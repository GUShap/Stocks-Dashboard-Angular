import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { UtilsService } from '../utils/utils.service';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  user = {
    username: 'Guy Shapira',
    password: '1234',
    id: this.utils.setId(),
    portfolio: [
      {
        symbol: 'IBM',
        amount: 127
      },
      {
        symbol: 'MSFT',
        amount: 23
      },
      {
        symbol: 'ABNB',
        amount: 42
      },
      {
        symbol: 'GH',
        amount: 22
      },
      {
        symbol: 'TT',
        amount: 3
      }
    ],
    mvoes: [],
    imgUrl: 'https://robohash.org/re'
  }

  private _currUser$ = new BehaviorSubject<Object>({})
  public currUser$ = this._currUser$.asObservable()

  constructor(private utils: UtilsService) { }

  public getUser() {
    this._currUser$.next(this.user)
  }
}
