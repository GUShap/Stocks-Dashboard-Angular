import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Observable, Subscription } from 'rxjs';
import { DashboardService } from 'src/app/services/dashboard/dashboard.service';

@Component({
  selector: 'app-default',
  templateUrl: './default.component.html',
  styleUrls: ['./default.component.scss'],
})
export class DefaultComponent implements OnInit {
  @Output() resize = new EventEmitter()

  sideBarOpen$!: boolean;
  constructor(private dashboardService: DashboardService) { }

  ngOnInit(): void {
    this.dashboardService.sidebarOpen$.subscribe(res => this.sideBarOpen$ = res)
  }

  toggleSidebar() {
    this.dashboardService.toggleSidebar()
  }

}
