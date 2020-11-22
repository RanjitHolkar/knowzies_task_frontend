import { Component, Inject, OnInit } from '@angular/core';
import { INavData } from '@coreui/angular';
@Component({
  selector: 'app-sidebars',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent implements OnInit {
  public navItems = [];
  public userDetails: any;
  public sidebarMinimized = false;
  constructor() {
    this.userDetails = localStorage.getItem('currentUser');
    this.userDetails = JSON.parse(this.userDetails);

    this.setData();
  }

  ngOnInit(): void {
  }

  toggleMinimize(e) {
    this.sidebarMinimized = e;
  }
  setData() {
    const navItems: INavData[] = [
    ];
    if (this.userDetails.role == '1') {
      navItems.push({
        name: 'Employee List',
        url: '/employee-list',
        icon: 'icon-speedometer'
      });
      navItems.push({
        name: 'Task List',
        url: '/task-list',
        icon: 'icon-speedometer'
      });
    } else {
      navItems.push({
        name: 'Task List',
        url: '/emp-task',
        icon: 'icon-speedometer'
      });
    }
    this.navItems = navItems;
  }

}
