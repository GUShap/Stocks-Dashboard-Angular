import { Injectable } from '@angular/core';
import { BehaviorSubject, Subscription } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { User } from 'src/app/models/user';
import { UtilsService } from '../utils/utils.service';
import { StocksService } from '../stocks/stocks.service';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private _usersDb: User[]
  private usersKey: string = 'usersDb'

  private _users$ = new BehaviorSubject<User[]>([])
  public users$ = this._users$.asObservable()

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
        symbol: 'IGV',
        amount: 3
      }
    ],
    mvoes: [],
    imgUrl: 'https://robohash.org/re'
  }

  private _currUser$ = new BehaviorSubject<Object>({})
  public currUser$ = this._currUser$.asObservable()

  constructor(
    private utils: UtilsService,
    private stockService: StocksService,
    private http: HttpClient) { }

  public getUser() {
    this._currUser$.next(this.user)
  }

  public loadUsers() {
    this._usersDb = this.utils.load(this.usersKey) || []
    if (!this._usersDb || !this._usersDb.length) {
      var tickerList$: string[];
      this.stockService.allTickers$.subscribe(res => {
        tickerList$ = res
      })
      this.http.get('https://randomuser.me/api/?results=50')
        .subscribe((res: any) => {
          res.results.forEach(user => {
            user.id = this.utils.setId()
            user.balance = this.utils.getRandomInt()
            user.imgUrl = user.picture.large
            user.portfolio = []
            tickerList$.forEach(symbol => {
              if (Math.random() > 0.96) {
                let stock = {
                  symbol,
                  amount: this.utils.getRandomInt(100000, 10)
                }
                user.portfolio.push(stock)
              }
            })
            delete user.picture
            this._usersDb.push(user)
          })
          this._usersDb.forEach((user: any) => {
            user.contacts = this.loadContacts(user.id)
          })
          this.utils.store(this.usersKey, this._usersDb)
        })
    }
    this._users$.next(this._usersDb)
  }

  public getEmptyUser() {
    return {
      email: '',
      name: '',
      password: ''
    }
  }

  private loadContacts(id) {
    const contacts = []
    this._usersDb.forEach(user => {
      let token = {
        id: user.id,
        name: user.name,
        imgUrl: user.imgUrl,
        login: user.login,
        portfolio: user.portfolio
      }
      if (Math.random() > 0.7 && user.id !== id) contacts.push(token)
    })

    return contacts
  }


}
