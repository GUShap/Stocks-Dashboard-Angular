import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Observable, Observer, Subscription } from 'rxjs';
import { User } from 'src/app/models/user';
import { DashboardService } from 'src/app/services/dashboard/dashboard.service';
import { UserService } from 'src/app/services/user/user.service';

@Component({
  selector: 'app-default',
  templateUrl: './default.component.html',
  styleUrls: ['./default.component.scss'],
})
export class DefaultComponent implements OnInit {
  @Output() resize = new EventEmitter()

  subscribe: Subscription
  sideBarOpen$!: boolean;

  currUser$;

  constructor(private dashboardService: DashboardService, private userService: UserService) { }

  ngOnInit(): void {
    this.subscribe = this.dashboardService.sidebarOpen$.subscribe(res => this.sideBarOpen$ = res)
    this.userService.loadUsers()
    this.userService.currUser$.subscribe(user=> this.currUser$ = user)
  }

  toggleSidebar() {
    this.dashboardService.toggleSidebar()
  }

}
