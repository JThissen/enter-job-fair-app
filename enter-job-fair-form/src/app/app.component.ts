import { Component, OnInit} from '@angular/core';
import { Title } from "@angular/platform-browser";
import { Router, RouterOutlet } from '@angular/router';
import { GlobalService } from './services/global.service';
import { transitionAnimation } from './general-classes/transition-animation';

@Component({
  selector: "app-root",
  templateUrl: './app.component.html',
  styleUrls: ["./app.component.css"],
  animations: [transitionAnimation],
  providers: []
})
export class AppComponent implements OnInit
{
  private title_serivce: Title;
  public title: string;

  public constructor(title_service: Title, public global: GlobalService, private router: Router)
  {
    this.title_serivce = title_service;
    this.set_title("ENTER | Job fair app");
  }

  ngOnInit() : void
  {
    this.title_serivce.setTitle(this.title);
  }

  public set_title(title: string)
  {
    this.title_serivce.setTitle(title);
  }

  public prepare_route(outlet: RouterOutlet)
  {
    return outlet && outlet.activatedRouteData && outlet.activatedRouteData['animation'];
  }
}