import { Component, OnInit, AfterViewInit, HostListener } from '@angular/core';
import { FormControl } from "@angular/forms";
import { FormData } from '../form/formdata.service';
import { FormOptionsService } from "../form/form-options.service";
import { Router } from "@angular/router";
import { GlobalService } from '../services/global.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit, AfterViewInit
{
  public username: FormControl;
  public password: FormControl;
  public hide_password: boolean;

  public constructor(private router: Router, private global: GlobalService)
  {
    this.username = new FormControl("");
    this.password = new FormControl("");
    this.hide_password = true;
  }

  ngOnInit(): void{}

  ngAfterViewInit() : void {}

  @HostListener("document:keydown", ["$event"])
  key_event(event: KeyboardEvent)
  {
    if(event.keyCode == 13)
      this.reroute('/login/adminpanel');
  }

  public reroute(path: string) : void
  {
    this.router.navigate([path]);
    this.global.logged_in = true;
  }
}