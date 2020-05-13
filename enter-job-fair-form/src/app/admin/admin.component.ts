import { Component, OnInit, AfterViewInit, ElementRef } from '@angular/core';
import { Router } from "@angular/router";
import { BreakpointObserver, BreakpointState } from "@angular/cdk/layout";
import { animate, state, style, transition, trigger} from '@angular/animations';
import { transitionAnimation } from '../general-classes/transition-animation';
import { GlobalService } from '../services/global.service';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css'],
  animations: [
    trigger("detailExpand", [
      state("collapsed", style({height: "0px", minHeight: "0"})),
      state("expanded", style({height: "*"})),
      transition("expanded <=> collapsed", animate("225ms cubic-bezier(0.4, 0.0, 0.2, 1)")),
    ]), transitionAnimation,
  ],
})
export class AdminComponent implements OnInit, AfterViewInit
{
  public expanded: boolean;
  public mobile_query: boolean;

  public constructor(public notes_ref: ElementRef, private router: Router, private break_point: BreakpointObserver, private global: GlobalService)
  {}

  ngOnInit(): void {}

  ngAfterViewInit() : void
  {
    this.expanded = !this.break_point.isMatched(["(max-width: 599px"]).valueOf();

    this.break_point.observe(["(max-width: 599px)"]).subscribe((value: BreakpointState) =>
    {
      if(value.matches)
        this.mobile_query = true;
      else
        this.mobile_query = false;
    });
  }

  public reroute(path: string) : void
  {
    this.router.navigate([path]);
    
    if(path == "/")
      this.global.logged_in = false;
  }
}