import { Component, OnInit, AfterViewInit, ViewChild, ElementRef, ChangeDetectorRef } from '@angular/core';
import { FormData } from '../form/formdata.service';
import { FormOptionsService } from "../form/form-options.service";
import { Router } from "@angular/router";
import { transitionAnimation } from '../general-classes/transition-animation';

@Component({
  selector: 'app-form-submit',
  templateUrl: './form-submit.component.html',
  styleUrls: ['./form-submit.component.css'],
  animations: [transitionAnimation],
})
export class FormSubmitComponent implements OnInit, AfterViewInit
{
  @ViewChild("event_header") event_header_ref: ElementRef;
  @ViewChild("event_subheader") event_subheader_ref: ElementRef;
  @ViewChild("track_field") track_field_ref: any;
  @ViewChild("textarea_notes") textarea_notes_ref: ElementRef;
  
  public form_data: FormData;
  public form_options: FormOptionsService;
  public event_header: string;
  public event_subheader: string;
  public event_greeting: string;
  public event_redirected: string;
  public current_time: number;
  public interval;

  public constructor(form_data: FormData, form_options: FormOptionsService, private router: Router, private change_detector: ChangeDetectorRef)
  {
    this.form_data = form_data;
    this.form_options = form_options;
    this.event_header = "Thank you for getting in touch!";
    this.event_subheader = "We have received your submission and appreciate you for expressing your interest in our company. One of our colleagues will get back in touch with you soon.";
    this.event_greeting = "Have a great day!";
    this.event_redirected = "You will be automatically redirected in 10 seconds.";
    this.current_time = 10;
  }

  ngOnInit(): void {}

  ngAfterViewInit() : void
  {
    this.interval = setInterval(()=>{this.update();}, 1000);
  }

  public update() : void
  {
    this.current_time--;
    this.event_redirected = this.current_time === 1 ? `You will be automatically redirected in ${this.current_time} second.`
    : `You will be automatically redirected in ${this.current_time} seconds.`;

    if(this.current_time === 0)
    {
      clearInterval(this.interval);
      this.to_launch_page("/");
    }
  }

  public to_launch_page(path: string) : void
  {
    clearInterval(this.interval);
    this.router.navigate([path]);
  }
}