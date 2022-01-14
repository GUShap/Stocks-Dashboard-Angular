import { Component, OnInit } from '@angular/core';
import { DashboardService } from 'src/app/services/dashboard/dashboard.service';
import { StocksService } from 'src/app/services/stocks/stocks.service';

@Component({
  selector: 'app-posts',
  templateUrl: './posts.component.html',
  styleUrls: ['./posts.component.scss']
})
export class PostsComponent implements OnInit {
  chartData!: Object[];  
  constructor(private dashboardService: DashboardService, private stockService:StocksService) { }

  ngOnInit(): void {
    this.chartData = this.dashboardService.dashboardData()    
  }

}
