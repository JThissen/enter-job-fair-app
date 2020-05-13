import { Component, OnInit, ViewChild, ElementRef, ChangeDetectorRef, HostListener } from '@angular/core';
import { FormControl, Validators } from "@angular/forms";
import { Router } from "@angular/router";
import { MatTableDataSource } from "@angular/material/table";
import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import {animate, state, style, transition, trigger} from '@angular/animations';
import { MatStepper } from '@angular/material/stepper';
import { EnvService } from "../env.service";
import { HttpClient } from '@angular/common/http';
import { UniversityData } from '../general-classes/university-data';
import { GlobalService } from '../services/global.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-university',
  templateUrl: './university.component.html',
  styleUrls: ['./university.component.css'],
  animations: [
    trigger("detailExpand", [
      state("collapsed, void", style({height: "0px", minHeight: "0"})),
      state("expanded", style({height: "*", paddingTop: "25px", paddingBottom: "25px"})),
      transition("collapsed <=> *", animate("225ms cubic-bezier(0.4, 0.0, 0.2, 1)")),
    ]),
  ],
})
export class UniversityComponent implements OnInit 
{
  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
  @ViewChild(MatSort, {static: true}) sort: MatSort;
  @ViewChild("expand_container") expand_container_ref: ElementRef;
  @ViewChild("stepper_container") stepper_container_ref: ElementRef;
  @ViewChild("stepper") stepper_ref: MatStepper;
  @ViewChild("image_input") image_input_ref: ElementRef;
  @ViewChild("image_label") image_label_ref: ElementRef;
  @ViewChild("image_create_input") image_create_input_ref: ElementRef;
  @ViewChild("image_create_label") image_create_label_ref: ElementRef;
  @ViewChild("icon_input") icon_input_ref: ElementRef;
  @ViewChild("icon_label") icon_label_ref: ElementRef;
  @ViewChild("icon_create_input") icon_create_input_ref: ElementRef;
  @ViewChild("icon_create_label") icon_create_label_ref: ElementRef;

  public university_name: FormControl;
  public university_location: FormControl;
  public create_event_name: FormControl;
  public create_event_year: FormControl;
  public create_event_image: FormControl;
  public create_event_icon: FormControl;
  public study_program: FormControl;
  public edit_study_program: FormControl;
  public study_programs: Array<string>;
  public edit_event_name: FormControl;
  public event_name: FormControl;
  public edit_event_year: FormControl;
  public edit_location: FormControl;
  public edit_name: FormControl;
  public edit_image: FormControl;
  public edit_icon: FormControl;
  public create_disabled: boolean;
  public current_universities_data: MatTableDataSource<UniversityData>;
  public selected: string;
  public column_names: Array<string>;
  public page_size: number;
  public expanded: boolean;
  public expandedElement: any;
  public university_data: Array<UniversityData>;
  public loaded_university_data: boolean;
  public image: ArrayBuffer;
  public icon: ArrayBuffer;
  public create_image: ArrayBuffer;
  public create_icon: ArrayBuffer;
  public current_index: number;

  public constructor(public global: GlobalService, public environment: EnvService, private router: Router, private change_detector: ChangeDetectorRef, private http: HttpClient)
  {
    this.university_name = new FormControl("", [Validators.required]);
    this.university_location = new FormControl("", [Validators.required]);
    this.create_event_name = new FormControl("", [Validators.required]);
    this.create_event_year = new FormControl("", [Validators.required, Validators.pattern(new RegExp("^[0-9]+$"))]);
    this.create_event_image = new FormControl("", [Validators.required]);
    this.create_event_icon = new FormControl("", [Validators.required]);
    this.study_program = new FormControl("");
    this.edit_study_program = new FormControl("");
    this.study_programs = new Array<string>();
    this.edit_event_name = new FormControl("");
    this.event_name = new FormControl("");
    this.edit_event_year = new FormControl("");
    this.edit_location = new FormControl("");
    this.edit_name = new FormControl("");
    this.edit_image = new FormControl("");
    this.edit_icon = new FormControl("");
    this.edit_image.disable();
    this.create_event_image.disable();
    this.edit_icon.disable();
    this.create_event_icon.disable();
    this.column_names = ["visible", "name", "location", "event_name", "event_year", "study_programs", "image", "icon", "actions"];
    this.create_disabled = false;
    this.page_size = 10;
    this.university_data = new Array<UniversityData>();
    this.current_universities_data = new MatTableDataSource(this.university_data);
  }

  ngOnInit(): void
  {
    this.get_universities(environment.urlAddress);
    this.current_universities_data.paginator = this.paginator;
    this.current_universities_data.sort = this.sort;
  }

  ngAfterViewInit() : void {}

  public send_index(index) : void
  {
    this.current_index = index;
  }

  public upload_image() : void
  {
    let reader: FileReader = new FileReader();
    this.edit_image.setValue(`${this.image_input_ref.nativeElement.files[0].name} — ${this.image_input_ref.nativeElement.files[0].size / 1000} kb.`);
    
    reader.onload = (e: any) => {
      this.image = e.target.result as ArrayBuffer;
      this.put_file(this.environment.base_url, this.university_data[this.current_index], "image");
    };

    reader.readAsArrayBuffer(this.image_input_ref.nativeElement.files[0]);
  }

  public upload_create_image() : void
  {
    let reader: FileReader = new FileReader();
    this.create_event_image.setValue(`${this.image_create_input_ref.nativeElement.files[0].name} — ${this.image_create_input_ref.nativeElement.files[0].size / 1000} kb.`);
    
    reader.onload = (e: any) => {
      this.create_image = e.target.result as ArrayBuffer;
    };

    reader.readAsArrayBuffer(this.image_create_input_ref.nativeElement.files[0]);
  }

  public upload_icon() : void
  {
    this.edit_icon.setValue(`${this.icon_input_ref.nativeElement.files[0].name} — ${this.icon_input_ref.nativeElement.files[0].size / 1000} kb.`);

    let reader: FileReader = new FileReader();
    
    reader.onload = (e: any) => {
      this.icon = e.target.result as ArrayBuffer;
      this.put_file(this.environment.base_url, this.university_data[this.current_index], "icon");
    };

    reader.readAsArrayBuffer(this.icon_input_ref.nativeElement.files[0]);
  }

  public upload_create_icon() : void
  {
    let reader: FileReader = new FileReader();
    this.create_event_icon.setValue(`${this.icon_create_input_ref.nativeElement.files[0].name} — ${this.icon_create_input_ref.nativeElement.files[0].size / 1000} kb.`);
    
    reader.onload = (e: any) => {
      this.create_icon = e.target.result as ArrayBuffer;
    };

    reader.readAsArrayBuffer(this.icon_create_input_ref.nativeElement.files[0]);
  }

  public applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.current_universities_data.filter = filterValue.trim().toLowerCase();

    if (this.current_universities_data.paginator) {
      this.current_universities_data.paginator.firstPage();
    }
  } 

  public create_university() : void
  {
    this.create_disabled = !this.create_disabled;
    this.stepper_container_ref.nativeElement.classList.remove("hidden");
    this.expand_container_ref.nativeElement.classList.add("content-container-expand");
  }

  public add_study_program(study_program: FormControl) : void
  {
    let study_program_trimmed: string = study_program.value.trim();
    
    if(study_program_trimmed === "")
      return;

    for(let i = 0; i < this.study_programs.length; i++)
    {
      if(this.study_programs[i] === study_program_trimmed)
        return;
    }

    this.study_programs.push(study_program.value.trim());
    this.study_programs.sort();
    this.study_program.setValue("");
  }

  public edit_add_study_program(study_program, index) : void
  {
    let study_program_trimmed: string = study_program.value.trim();
    
    if(study_program_trimmed === "")
      return;

    for(let i = 0; i < this.university_data[index].study_programs.length; i++)
    {
      if(this.university_data[index].study_programs[i] === study_program_trimmed)
        return;
    }

    this.university_data[index].study_programs.push(study_program.value.trim());
    this.university_data[index].study_programs.sort();
    this.put_university(environment.urlAddress, this.university_data[index]);
    this.edit_study_program.setValue("");
    this.refresh_table();
  }

  public edit_remove_study_program(container_index, index: number) : void
  {
    this.university_data[container_index].study_programs.splice(index, 1);
    this.put_university(environment.urlAddress, this.university_data[container_index]);
  }

  public edit_change_event_name(event_name: FormControl, index) : void
  {
    let event_name_trimmed: string = event_name.value.trim();
    this.university_data[index].event_name = event_name_trimmed;
    this.put_university(environment.urlAddress, this.university_data[index]);
  }

  public edit_change_event_year(event_year: FormControl, index) : void
  {
    if(event_year.value.match(new RegExp("^[0-9]+$")))
    {
      this.university_data[index].event_year = event_year.value;
      this.put_university(environment.urlAddress, this.university_data[index]);
      this.refresh_table();
    }
  }

  public edit_change_location(location: FormControl, index) : void
  {
      this.university_data[index].location = location.value;
      this.put_university(environment.urlAddress, this.university_data[index]);
  }

  public edit_change_name(name: FormControl, index, element) : void
  {
      this.university_data[index].name = name.value;
      this.put_university(environment.urlAddress, this.university_data[index]);
      this.change_detector.detectChanges();
  }

  public remove_study_program(index: number) : void
  {
    this.study_programs.splice(index, 1);
  }

  public visible(row) : boolean
  {
    return row.visible;
  }

  public checkbox_change(row, index) : void
  {
    this.university_data[index].visible = !this.university_data[index].visible;
    this.put_university(environment.urlAddress, this.university_data[index]);
  }

  public show_study_programs(row) : string
  {
    let study_programs: string = "";

    for(let i = 0; i < row.study_programs.length; i++)
    {
      if(i !== 0 && i == row.study_programs.length - 1)
        study_programs += `and ${row.study_programs[i]}.`;
      else
        study_programs += `${row.study_programs[i]}, `;
    }

    if(row.study_programs.length == 1)
      study_programs = `${row.study_programs[0]}`;

    return study_programs;
  }

  public set_color(i: number) : string
  {
    if(i % 2 == 0)
      return "rgba(48, 48, 48, 1)";
    return "rgba(54, 54, 54, 1)";
  }

  public stepper_next(variable: FormControl) : void
  {
    if(variable.value.trim() != "")
      this.stepper_ref.selected.completed = true;
    this.stepper_ref.next();
  }

  public stepper_next_int(variable: FormControl) : void
  {
    if(Number.isInteger(Number(variable.value)))
      this.stepper_ref.selected.completed = true;
    this.stepper_ref.next();
  }

  public stepper_next_file(variable: FormControl) : void
  {
    if(variable.value != "")
      this.stepper_ref.selected.completed = true;
    this.stepper_ref.next();
  }

  public complete() : void
  {
    this.post_university(environment.urlAddress, this.university_name, this.university_location, this.create_event_name, this.create_event_year, this.study_programs, this.create_image, this.create_icon);
    this.create_disabled = !this.create_disabled;
    this.stepper_container_ref.nativeElement.classList.add("hidden");
    this.refresh_table();
    this.stepper_ref.reset();
  }

  @HostListener("document:keydown", ["$event"])
  public key_event(event: KeyboardEvent)
  {
    if(event.keyCode == 13)
    {
      switch(this.stepper_ref.selectedIndex)
      {
        case 0: this.stepper_next(this.university_name); break;
        case 1: this.stepper_next(this.university_location); break;
        case 2: this.stepper_next(this.create_event_name); break;
        case 3: this.stepper_next_int(this.create_event_year); break;
        case 4: this.stepper_next_file(this.create_event_image); break;
        case 5: this.stepper_next_file(this.create_event_icon); break;
        case 6: this.complete(); break;
      }
    }
  }

  public refresh_table() : void
  {
    this.current_universities_data.data = this.university_data;
    this.current_universities_data.paginator = this.paginator;
    this.current_universities_data.sort = this.sort;
    this.change_detector.detectChanges();
  }

  public remove_university(index) : void
  {
    this.delete_university(environment.urlAddress, this.university_data[index].id);
    this.refresh_table();
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
        this.university_data.push(new UniversityData(data[i].id, data[i].name, data[i].visible, data[i].studyPrograms, data[i].location, data[i].eventName, data[i].eventYear, `data:image/png;base64,${data[i].image}`, `data:image/png;base64,${data[i].icon}`));

      this.current_universities_data.data = this.university_data;
      this.global.loading = false;
    }, error => this.global.loading = false);
  }

  public post_university(base_url: string, university_name: FormControl, university_location: FormControl, create_event_name: FormControl, create_event_year: FormControl, study_programs: Array<string>, create_image: ArrayBuffer, create_icon: ArrayBuffer) : void
  {
    this.global.loading = true;

    let obj =
    {
      visible: true,
      name: university_name.value,
      eventName: create_event_name.value,
      eventYear: Number(create_event_year.value),
      location: university_location.value,
      studyPrograms: study_programs,
    }

    let fd = new FormData();
    fd.append("image", new Blob([create_image]));
    fd.append("icon", new Blob([create_icon]))
    fd.append("obj", JSON.stringify(obj));

    this.http.post<any>(`${base_url}api/university`, fd).subscribe(
      {
        next: data => {this.global.loading = false; this.get_universities(base_url);},
        error: error => {this.global.loading = false; console.log("Failed to execute POST request.")}
      }
    ); 
  }

  public put_file(base_url: string, university_data: UniversityData, type: string) : void
  {
    this.global.loading = true;
    let fd = new FormData();
    fd.append("myFile", new Blob([type == "image" ? this.image : this.icon]));
    fd.append("universityId", university_data.id);
    fd.append("type", type);

    this.http.put(`${base_url}api/university/file`, fd).subscribe(
      {
        next: data => {console.log(data); this.global.loading = false; this.get_universities(base_url);},
        error: error => {console.log("Failed to execute PUT request."); this.global.loading = false;}
      }
    );
  }

  public put_university(base_url: string, university_data: UniversityData) : void
  {
    this.global.loading = true;
    this.http.put<UniversityData>(`${base_url}api/university`, 
    {
        id: university_data.id,
        visible: university_data.visible,
        name: university_data.name,
        eventName: university_data.event_name,
        eventYear: Number(university_data.event_year),
        location: university_data.location,
        studyPrograms: university_data.study_programs
    }).subscribe(
      {
        next: data => {this.global.loading = false; this.get_universities(base_url);},
        error: error => {this.global.loading = false; console.log("Failed to execute PUT request.")}
      }
    ); 
  }

  public delete_university(base_url: string, id: string)
  {
    this.global.loading = true;
    this.http.delete<any>(`${base_url}api/university/${id}`).subscribe(
      {
        next: data => {this.global.loading = false; this.get_universities(base_url);},
        error: error => {this.global.loading = false; console.log("Failed to execute DELETE request.");}
      });
  }
}