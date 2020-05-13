import { Component, OnInit, AfterViewInit, ViewChild, ElementRef, ChangeDetectorRef } from '@angular/core';
import { FormData } from './formdata.service';
import { FormOptionsService } from "./form-options.service";
import { Router } from "@angular/router";
import { EnvService } from '../env.service';
import { HttpClient } from '@angular/common/http';
import { UniversityData } from '../general-classes/university-data';
import { GlobalService } from '../services/global.service';
import { BreakpointObserver, BreakpointState } from "@angular/cdk/layout";

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.css']
})
export class FormComponent implements OnInit, AfterViewInit
{
  @ViewChild("event_subheader") event_subheader_ref: ElementRef;
  @ViewChild("track_field") track_field_ref: any;
  @ViewChild("textarea_notes") textarea_notes_ref: ElementRef;
  @ViewChild("study_information") study_information_ref: ElementRef;
  @ViewChild("privacy_data") privacy_data_ref: ElementRef;
  
  public university_data: UniversityData;
  public form_data: FormData;
  public form_options: FormOptionsService;
  private environment: EnvService;

  public constructor(form_data: FormData, form_options: FormOptionsService, environment: EnvService, private global: GlobalService, private router: Router, private change_detector: ChangeDetectorRef, private http: HttpClient, private break_point: BreakpointObserver)
  {
    this.form_data = form_data;
    this.form_options = form_options;
    this.environment = environment;

    if(this.form_data.first_name.disabled)
      this.form_data.enable_all();
  }

  ngOnInit(): void
  {
    this.get_university(this.environment.base_url, this.form_data.universityId.value);
  }

  ngAfterViewInit() : void
  {
    this.break_point.observe(["(max-width: 599px)"]).subscribe((value: BreakpointState) =>
    {
      if(value.matches){
        this.track_field_ref._elementRef.nativeElement.firstChild.style.width = "180px";
      }
    })
    this.textarea_notes_ref.nativeElement.addEventListener("input", (event)=>{this.form_options.notes_characters_left = this.update_characters_left(event);});
    this.form_options.notes_characters_left = this.update_characters_left_initial();
    this.change_detector.detectChanges();
  }

  public show_input_field(event) : void
  {
    if(event.value === undefined)
      return;

    let element = this.track_field_ref._elementRef.nativeElement;

    if(event.value === this.form_options.study_information_options[1])
      element.classList.add("visible");
    else
      element.classList.remove("visible");
  }

  public update_characters_left(event) : number
  {
    let target: HTMLElement = <HTMLElement>event.currentTarget;
    let max_length = target.getAttribute("maxlength");
    let current_length = (<any>target).value.length;
    return parseInt(max_length) - current_length;
  }

  public update_characters_left_initial() : number
  {
    let max_length = this.textarea_notes_ref.nativeElement.maxLength;
    let current_length = this.textarea_notes_ref.nativeElement.value.length;
    return parseInt(max_length) - current_length;
  }

  public next(path: string) : void
  {
    this.check_custom_error_forms();

    if(!this.form_data.first_name.valid ||
    !this.form_data.last_name.valid ||
    !this.form_data.email.valid ||
    !this.form_data.study_information.valid ||
    !this.form_data.study_program.valid ||
    !this.form_data.availability_date.valid ||
    !this.form_data.privacy_data.valid) return;

    this.router.navigate([path]);
  }

  public check_custom_error_forms() : void
  {
    if(!this.form_data.study_information.valid || !this.form_data.study_program.valid)
      this.study_information_ref.nativeElement.style.border = "2px solid rgba(244, 67, 54, 1)";
    else
      this.study_information_ref.nativeElement.style.border = "1px solid rgba(110, 110, 110, 1)";
    if(!this.form_data.privacy_data.valid)
      this.privacy_data_ref.nativeElement.style.border = "2px solid rgba(244, 67, 54, 1)";
      else
      this.privacy_data_ref.nativeElement.style.border = "1px solid rgba(110, 110, 110, 1)"; 
  }

  public async get_university(base_url: string, id: string)
  {
    this.global.loading = true;
    this.http.get<any>(`${base_url}api/university/${id}`).subscribe(data =>
    {
      this.university_data = new UniversityData(data.id, data.name, data.visible, data.studyPrograms, data.location, data.eventName, data.eventYear);
      this.form_data.university_data = this.university_data;
      this.form_data.event_location_year = `${this.university_data.location}, ${this.university_data.event_year}`;
      this.global.loading = false;
    }, error =>
    {
      this.global.loading = false;
    });
  }
}