import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit, } from '@angular/core';
import { Observable } from 'rxjs';
import { DashboardService } from 'src/app/services/dashboard/dashboard.service';
import { StocksService } from 'src/app/services/stocks/stocks.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class DashboardComponent implements OnInit {

  sideBarOpen$!: boolean;
  cmps = {
    isBigChartShown: true,
    isCardsShown: true,
    isPieShown: true,
    isTableShown: true
  }

  chartData!: Object[];  

  constructor(private dashboardService: DashboardService) { }

   ngOnInit(): void {
    this.chartData = this.dashboardService.dashboardData()
    this.subscribeCmps()
  }

  subscribeCmps() {
    this.dashboardService.sidebarOpen$.subscribe(res => this.sideBarOpen$ = res)
  }

}
