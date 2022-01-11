import { Component, EventEmitter, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  @Output() toggleSideBar = new EventEmitter()
  constructor() { }

  ngOnInit(): void {
    setTimeout(()=>{
      window.dispatchEvent(
        new Event('resize')
      ),300
    })
  }

}
