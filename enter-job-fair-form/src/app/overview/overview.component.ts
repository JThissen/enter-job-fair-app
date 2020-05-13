import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { FormControl } from "@angular/forms";
import { Router } from "@angular/router";
import { MatTableDataSource } from "@angular/material/table";
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { animate, state, style, transition, trigger } from '@angular/animations';
import { HttpClient } from '@angular/common/http';
import { ApplicantData } from '../general-classes/applicant-data';
import { EnvService } from '../env.service';
import { GlobalService } from '../services/global.service';
import { UniversityData } from '../general-classes/university-data';

@Component({
  selector: 'app-overview',
  templateUrl: './overview.component.html',
  styleUrls: ['./overview.component.css'],
  animations: [
    trigger("detailExpand", [
      state("collapsed, void", style({height: "0px", minHeight: "0"})),
      state("expanded", style({height: "*"})),
      transition("* <=> *", animate("225ms cubic-bezier(0.4, 0.0, 0.2, 1)")),
    ]),
  ],
})
export class OverviewComponent implements OnInit 
{
  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
  @ViewChild(MatSort, {static: true}) sort: MatSort;

  public selected: string;
  public column_names: Array<string>;
  public current_applicants_data: MatTableDataSource<ApplicantData>;
  public page_size: number;
  public expanded: boolean;
  public expandedElement: any;
  public applicant_data: Array<ApplicantData>;
  public edit_remark: FormControl;
  public university_data: Array<UniversityData>;

  public constructor(public notes_ref: ElementRef, public global: GlobalService, private environment: EnvService, private router: Router, private http: HttpClient)
  {
    this.page_size = 50;
    this.column_names = ["first_name", "last_name", "email_address", "phone_number",
    "degree_level", "study_information_track", "study_program", "graduation_date",
    "availability_date", "career_lunch_participation", "notes", "submission_date", "remark", "actions"];
    this.selected = "all";
    this.expanded = false;
    this.expandedElement = null;
    this.applicant_data = new Array<ApplicantData>();
    this.current_applicants_data = new MatTableDataSource(this.applicant_data);
    this.university_data = new Array<UniversityData>();
    this.edit_remark = new FormControl("");
  }

  ngOnInit(): void
  {
    this.get_universities(this.environment.base_url);
    this.get_applicants(this.environment.base_url);
    this.current_applicants_data.paginator = this.paginator;
    this.current_applicants_data.sort = this.sort;
  }

  ngAfterViewInit() : void {}

  public applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.current_applicants_data.filter = filterValue.trim().toLowerCase();

    if (this.current_applicants_data.paginator) {
      this.current_applicants_data.paginator.firstPage();
    }
  } 

  public on_selection_change(event) : void
  {
    if(event.value == "all")
      this.get_applicants(this.environment.base_url);
    else
      this.get_applicants_university(this.environment.base_url);
  }

  public save_remark(remark: FormControl, index) : void
  {
    let remark_trimmed: string = remark.value.trim();
    this.applicant_data[index].remark = remark_trimmed;
    this.put_applicant(this.environment.base_url, this.applicant_data[index]);
  }

  public beautify_date(date: string | number | Date) : string
  {
    return new Date(date).toLocaleDateString("nl-NL");
  }

  public remove_applicant(index) : void
  {
    this.delete_applicant(this.environment.base_url, this.applicant_data[index].id);
  }

  public reroute(path: string) : void
  {
    this.router.navigate([path]);
  }

  public get_universities(base_url: string) : void
  {
    this.global.loading = true;
    this.http.get<any[]>(`${base_url}api/university`).subscribe(data =>
    {
      this.university_data = new Array<UniversityData>();

      for(let i = 0; i < data.length; i++)
        this.university_data.push(new UniversityData(data[i].id, data[i].name, data[i].visible, data[i].studyPrograms, data[i].location, data[i].eventName, data[i].eventYear));
      this.global.loading = false;
    }, (error) => this.global.loading = false);
  }

  public get_applicants(base_url: string) : void
  {
    this.global.loading = true;
    this.http.get<any[]>(`${base_url}api/applicant`).subscribe(data =>
    {
      this.applicant_data = new Array<ApplicantData>();
      for(let i = 0; i < data.length; i++)
        this.applicant_data.push(new ApplicantData(data[i].id, data[i].firstName, data[i].lastName, data[i].email, data[i].phoneNumber, data[i].degreeLevel, data[i].track, data[i].studyProgram, data[i].graduationDate, data[i].availability, data[i].lunch, data[i].dutchSpeaking, data[i].notes, data[i].remark, data[i].submissionDate, data[i].universityId));

      this.current_applicants_data.data = this.applicant_data;
      this.global.loading = false;
    }, (error) => this.global.loading = false);
  }

  public get_applicants_university(base_url: string) : void
  {
    this.global.loading = true;
    this.http.get<any[]>(`${base_url}api/applicant/university?universityId=${this.selected}`).subscribe(
      {
        next: (data)=>
        {
          console.log("got this data");
          console.log(data);
          this.applicant_data = new Array<ApplicantData>();

          for(let i = 0; i < data.length; i++)
            this.applicant_data.push(new ApplicantData(data[i].id, data[i].firstName, data[i].lastName, data[i].email, data[i].phoneNumber, data[i].degreeLevel, data[i].track, data[i].studyProgram, data[i].graduationDate, data[i].availability, data[i].lunch, data[i].dutchSpeaking, data[i].notes, data[i].remark, data[i].submissionDate, data[i].universityId));

          this.current_applicants_data.data = this.applicant_data;
          this.global.loading = false;
        },
        error: (error)=>
        {
          this.current_applicants_data.data = new Array<ApplicantData>();
          this.global.loading = false;
        }
      });
  }

  public put_applicant(base_url: string, applicant_data: ApplicantData) : void
  {
    this.global.loading = true;
    this.http.put<ApplicantData>(`${base_url}api/applicant`, 
    {
        id: applicant_data.id,
        firstName:  applicant_data.first_name,
        lastName: applicant_data.last_name,
        email: applicant_data.email_address,
        phoneNumber: applicant_data.phone_number,
        degreeLevel: applicant_data.degree_level,
        track: applicant_data.study_information_track,
        studyProgram: applicant_data.study_program,
        graduationDate: applicant_data.graduation_date,
        availability: applicant_data.availability_date,
        lunch: applicant_data.career_lunch_participation,
        dutchSpeaking: applicant_data.dutch_speaking,
        notes: applicant_data.notes,
        remark: applicant_data.remark,
        submissionDate: applicant_data.submission_date,
        universityId: applicant_data.universityId
    }).subscribe(
      {
        next: data => {this.global.loading = false; this.get_applicants(base_url);},
        error: error => {this.global.loading = false;}
      }
    ); 
  }

  public delete_applicant(base_url: string, id: string)
  {
    this.global.loading = true;
    this.http.delete<any>(`${base_url}api/applicant/${id}`).subscribe(
      {
        next: data => 
        {
          this.global.loading = false;

          if(this.selected == "all")
            this.get_applicants(base_url);
          else
            this.get_applicants_university(base_url);
        },
        error: error => {this.global.loading = false; console.log("Failed to execute DELETE request.");}
      });
  }
}