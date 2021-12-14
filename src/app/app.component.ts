import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Component, OnInit } from '@angular/core';
import { PageEvent } from '@angular/material/paginator';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'front';
  searchText?: string | any;
  pageEvent: PageEvent | any;
  length: number = 0;
  pageSize: number = 3; 
  users: any[] | any = [];
  pagedList: any[] = [];
  cols? : number;
  breakpoint: number = 3;
  gridByBreakpoint = {
    xl: 3,
    lg: 3,
    md: 3,
    sm: 2,
    xs: 1
  }

  constructor(private breakpointObserver: BreakpointObserver) {
    this.breakpointObserver.observe([
      Breakpoints.XSmall,
      Breakpoints.Small,
      Breakpoints.Medium,
      Breakpoints.Large,
      Breakpoints.XLarge,
    ]).subscribe(result => {
      if (result.matches) {
        if (result.breakpoints[Breakpoints.XSmall]) {
          this.cols = this.gridByBreakpoint.xs;
        }
        if (result.breakpoints[Breakpoints.Small]) {
          this.cols = this.gridByBreakpoint.sm;
        }
        if (result.breakpoints[Breakpoints.Medium]) {
          this.cols = this.gridByBreakpoint.md;
        }
        if (result.breakpoints[Breakpoints.Large]) {
          this.cols = this.gridByBreakpoint.lg;
        }
        if (result.breakpoints[Breakpoints.XLarge]) {
          this.cols = this.gridByBreakpoint.xl;
        }
      }
    });
  }


  ngOnInit() {
    this.breakpoint = (window.innerWidth <= 800) ? 1 : 3;
    this.users = [
      {
      displayName: 'John Doe 1',
      avatar: null,
      email: 'john.doe@devoteam.com',
      name: 'John',
      role: 'Admin'
    },
    {
      displayName: 'Karl max',
      avatar: null,
      email: 'karl.max@devoteam.com',
      name: 'karl',
      role: 'Admin'
    },
    {
      displayName: 'Seth rogan',
      avatar: null,
      email: 'seth.rogan@devoteam.com',
      name: 'Seth',
      role: 'Admin'
    },
    {
      displayName: 'Max will',
      avatar: null,
      email: 'max.will@devoteam.com',
      name: 'Maw',
      role: 'User'
    }
  ];
    this.pagedList = this.users.slice(0, 10);
    this.length = this.users.length;
  }


  OnPageChange(event: PageEvent){
    let startIndex = event.pageIndex * event.pageSize;
    let endIndex = startIndex + event.pageSize;
    if(endIndex > this.length){
      endIndex = this.length;
    }
    this.pagedList = this.users.slice(startIndex, endIndex);
  }
}
