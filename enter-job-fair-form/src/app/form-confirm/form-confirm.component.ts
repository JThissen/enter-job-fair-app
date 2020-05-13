import { Component, OnInit, AfterViewInit, ViewChild, ElementRef } from '@angular/core';
import { FormData } from '../form/formdata.service';
import { FormOptionsService } from "../form/form-options.service";
import { Router } from "@angular/router";
import { HttpClient } from '@angular/common/http';
import { EnvService } from '../env.service';
import { GlobalService } from '../services/global.service';
import { transitionAnimation } from '../general-classes/transition-animation';

@Component({
  selector: 'app-form-confirm',
  templateUrl: './form-confirm.component.html',
  styleUrls: ['./form-confirm.component.css'],
  animations: [transitionAnimation],
})
export class FormConfirmComponent implements OnInit, AfterViewInit
{
  @ViewChild("event_subheader") event_subheader_ref: ElementRef;
  @ViewChild("track_field") track_field_ref: any;
  
  public form_data: FormData;
  public form_options: FormOptionsService;

  public constructor(form_data: FormData, form_options: FormOptionsService, private environment: EnvService, private router: Router, private http: HttpClient, private global: GlobalService)
  {
    this.form_data = form_data;
    this.form_options = form_options;
    this.form_data.disable_all();
  }

  ngOnInit(): void 
  {}

  ngAfterViewInit() : void
  {
    this.show_input_field();
  }

  public show_input_field() : void
  {
    if(this.form_data.study_information.value === this.form_options.study_information_options[1])
      this.track_field_ref._elementRef.nativeElement.classList.add("visible");
  }

  public confirm_and_submit(path: string) : void
  {
    this.post_applicant(this.environment.base_url, this.form_data);
  }

  public reroute(path: string) : void
  {
    this.router.navigate([path]);
  }

  public post_applicant(base_url: string, form_data: FormData) : void
  {
    this.global.loading = true;
    this.http.post<any>(`${base_url}api/applicant?universityId=${form_data.universityId.value}`, 
    {
        firstName: form_data.first_name.value,
        lastName: form_data.last_name.value,
        email: form_data.email.value,
        phoneNumber: form_data.phone_number.value,
        degreeLevel: form_data.study_information.value,
        track: form_data.study_information_track.value,
        studyProgram: form_data.study_program.value,
        graduationDate: form_data.graduation_date.value.toISOString(),
        availability: form_data.availability_date.value.toISOString(),
        lunch: form_data.career_lunch_participation.value,
        dutchSpeaking: form_data.dutch_speaking.value,
        notes: form_data.notes.value,
    }).subscribe(
      {
        next: data => 
        {
          this.reroute("/job-fair-form/confirm/submit");
          this.global.loading = false;
        },
        error: error => 
        {
          console.log("Failed to execute POST request.");
          this.global.loading = false;
        }
      }
    ); 
  }
}