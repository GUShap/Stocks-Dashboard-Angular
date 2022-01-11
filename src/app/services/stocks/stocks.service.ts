import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { UtilsService } from '../utils/utils.service';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class StocksService {
  private _apiKey = 'TEUH27YAZWKT45IS'

  private _stock$ = new BehaviorSubject<any>(null)
  public stock$ = this._stock$.asObservable()

  constructor(private utils: UtilsService, private http: HttpClient) { }

  public loadStockDataDaily(symbol = 'IBM'): any {
    let data = this.utils.load(symbol)
    if (!data) {
      data={
        date:[],
        value:[]
      }
      this.http.get(`https://www.alphavantage.co/query?function=TIME_SERIES_DAILY&symbol=${symbol}&outputsize=compact&apikey=${this._apiKey}`)
        .subscribe((res: any) => {      
          for(const key in res["Time Series (Daily)"]){
            data.date.push(key)
            data.value.push(res["Time Series (Daily)"][key]["4. close"])
          }
          // data = res["Time Series (Daily)"]
          this.utils.store(symbol, data)
        })
    }
    return data
  }

}

