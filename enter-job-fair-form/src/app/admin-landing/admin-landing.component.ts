import { Component, OnInit } from '@angular/core';
import { Router } from "@angular/router";

@Component({
  selector: 'app-admin-landing',
  templateUrl: './admin-landing.component.html',
  styleUrls: ['./admin-landing.component.css']
})
export class AdminLandingComponent implements OnInit 
{
  public constructor(private router: Router) {}

  ngOnInit() : void {}

  public reroute(path: string) : void
  {
    this.router.navigate([path]);
  }
}