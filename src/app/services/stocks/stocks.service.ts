import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { UtilsService } from '../utils/utils.service';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class StocksService {
  private _apiKey = 'TEUH27YAZWKT45IS'

  private _companyName$ = new BehaviorSubject<any>(null)
  public companyName$ = this._companyName$.asObservable()

  constructor(private utils: UtilsService, private http: HttpClient) { }

  public loadStockDataDaily(symbol: string): any {
    let data = this.utils.load(symbol)
    if (!data) {
      data = {
        date: [],
        value: [],
        name: symbol
      }
      this.http.get(`https://www.alphavantage.co/query?function=TIME_SERIES_DAILY&symbol=${symbol}&outputsize=compact&apikey=${this._apiKey}`)
        .subscribe(async (res: any) => {
          for (const key in res["Time Series (Daily)"]) {
            data.date.push(key)
            data.value.push(+res["Time Series (Daily)"][key]["4. close"])
          }
          this.utils.store(symbol, data)
          return data
        })
    }
    return data
  }

  public async getCompanyDetails(symbol: string) {
   return this.http.get(`https://api.polygon.io/v1/meta/symbols/${symbol}/company?apiKey=PuereyJTxUAGN42apNF4DRRj4VKIjtGq`)
      .subscribe()
  }
}

