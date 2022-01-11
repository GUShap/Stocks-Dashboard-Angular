import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { StocksService } from '../stocks/stocks.service';
import { UserService } from '../user/user.service';
import { UtilsService } from '../utils/utils.service';

@Injectable({
  providedIn: 'root'
})
export class DashboardService {
  constructor(private userService: UserService, private stockService: StocksService, private utils: UtilsService) { }


  isOpen = true
  private _sidebarOpen$ = new BehaviorSubject(this.isOpen)
  public sidebarOpen$ = this._sidebarOpen$.asObservable()


  toggleSidebar() {
    this.isOpen = !this.isOpen
    this._sidebarOpen$.next(this.isOpen)
  }

  dashboardData() {
    var chartData: { name: string; amount: number; stockData: any; }[]= []
    this.userService.getUser()
    let user: any;
    this.userService.currUser$.subscribe(res => {
      user = res
    })

    user.portfolio.forEach((stock: { symbol: string; amount: number; }) => {
      return chartData.push(
        {
          name: stock.symbol,
          amount:stock.amount,
          stockData: this.stockService.loadStockDataDaily(stock.symbol)
        });
    })

    return chartData
  }
}
