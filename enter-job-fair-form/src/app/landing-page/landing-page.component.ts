import { Component, OnInit, AfterViewInit, ViewChild, ViewChildren, ElementRef, ChangeDetectorRef, QueryList, ViewEncapsulation, HostListener } from '@angular/core';
import { FormData } from '../form/formdata.service';
import { Router } from "@angular/router";
import { HttpClient } from "@angular/common/http";
import { EnvService } from "../env.service";
import { UniversityData } from "../general-classes/university-data";
import { MatOption } from '@angular/material/core';
import { GlobalService } from '../services/global.service';
import { animate, state, style, transition, trigger, query} from '@angular/animations';
import { BreakpointObserver } from '@angular/cdk/layout';

@Component({
  selector: 'app-landing-page',
  templateUrl: './landing-page.component.html',
  styleUrls: ['./landing-page.component.css'],
  animations: [
    trigger("show_few", [
      transition("void => *", [
        style({opacity: 0}),
        animate(350, style({opacity: 1}))
      ]),
      transition("* => void", [
        animate(0, style({opacity: 0}))
      ])
    ]),
    trigger("show_all", [
      transition("void => *", [
        style({opacity: 0}),
        animate(350, style({opacity: 1}))
      ]),
      transition("* => void", [
        animate(0, style({opacity: 0}))
      ])
    ])
  ]
})
export class LandingPageComponent implements OnInit, AfterViewInit
{
  @ViewChild("cards_ref") cards_ref: any;
  @ViewChildren(MatOption) mat_options_ref: QueryList<MatOption>;

  public selected: string;
  public disabled: boolean;
  public university_data: Array<UniversityData>;
  private form_data: FormData;
  private environment: EnvService;
  private http: HttpClient;
  private router: Router;
  public gradients: Array<string>;
  public currently_selected: any;
  public previously_selected: any;
  public show_all: boolean;
  public show_events_str: string;
  public breakpoint_observer: BreakpointObserver;
  public event_path: any;

  public constructor(form_data: FormData, environment: EnvService, router: Router, http: HttpClient, private global: GlobalService, private cd: ChangeDetectorRef)
  {
    this.disabled = true;
    this.university_data = new Array<UniversityData>();
    this.form_data = form_data;
    this.router = router;
    this.http = http;
    this.environment = environment;
    this.show_all = false;
    this.show_events_str = "Show all available events";
    this.gradients = new Array<string>();
    this.add_gradients();
  }
  
  ngOnInit(): void
  {
    this.get_universities(this.environment.base_url);
  }
  
  ngAfterViewInit() : void
  {}

  @HostListener("document:click", ["$event"])
  public click_event(event)
  {
    this.on_click(event);
  }

  @HostListener("document:keydown", ["$event"])
  public key_event(event: KeyboardEvent)
  {
    if(event.keyCode == 13 && this.selected != undefined)
      this.reroute('/job-fair-form')
  }

  public add_gradients()
  {
    //https://cssgradient.io/gradient-backgrounds/
    this.gradients.push("linear-gradient( 45deg, #FCCF31 0%, #F55555 100%)");
    this.gradients.push("linear-gradient( 45deg, #43CBFF 0%, #9708CC 100%)");
    this.gradients.push("linear-gradient( 45deg, #69FF97 10%, #00E4FF 100%)");
    this.gradients.push("linear-gradient( 45deg, #F97794 0%, #623AA2 100%)");
    this.gradients.push("linear-gradient( 45deg, #FEB692 0%, #EA5455 100%)");
    this.gradients.push("linear-gradient( 45deg, #FFF720 10%, #3CD500 100%)");
    this.gradients.push("linear-gradient( 45deg, #90F7EC 0%, #32CCBC 100%)");
    this.gradients.push("linear-gradient( 45deg, #81FBB8 0%, #28C76F 100%)");
    this.gradients.push("linear-gradient( 45deg, #F6CEEC 10%, #D939CD 100%)");
    this.gradients.push("linear-gradient( 45deg, #FDEB71 0%, #F8D800 100%)");
    this.gradients.push("linear-gradient( 45deg, #F761A1 0%, #8C1BAB 100%)");
    this.gradients.push("linear-gradient( 45deg, #ABDCFF 0%, #0396FF 100%)");
  }

  public on_click(event?)
  {
    for(let i = 0; i < event.path.length; i++)
    {
      if(<string>(event.path[i].className) != undefined && <string>(event.path[i].className).includes("card-content"))
      {
        for(let i = 0 ; i < this.cards_ref.nativeElement.children.length; i++)
          this.cards_ref.nativeElement.children[i].children[0].classList.remove("selected");

        this.event_path = event.path[i];
        this.selected = event.path[i].id;
        event.path[i].classList.add("selected");
        this.form_data.universityId.setValue(this.selected);
        this.disabled = false;
      }
    }
  }

  public on_selection_change(event?: any) : void
  {
    this.disabled = false;
    this.form_data.universityId.setValue(this.selected);
    this.highlight_card(event);
  }

  public reroute(path: string) : void
  {
    this.router.navigate([path]);
  }

  public get_universities(base_url: string)
  {
    this.global.loading = true;
    this.http.get<any[]>(base_url + "api/university").subscribe(
    {
      next: (data) =>
      {
        this.university_data = new Array<UniversityData>();

        for(let i = 0; i < data.length; i++)
        {
          if(data[i].visible)
            this.university_data.push(new UniversityData(data[i].id, data[i].name, data[i].visible, data[i].studyPrograms, data[i].location, data[i].eventName, data[i].eventYear, `data:image/png;base64,${data[i].image}`, `data:image/png;base64,${data[i].icon}`));
        }
        this.global.loading = false;
      },

      error: (error) =>
      {
        this.global.loading = false;
      }
    });
  }

  public show_all_events() : void
  {
    this.show_all = !this.show_all;
    this.show_events_str = this.show_all ? "Hide events" : "Show all available events";
  }

  public toggle() : boolean
  {
    return this.show_all;
  }

  public animation_complete(event)
  {
    this.highlight_card(event);
  }

  public highlight_card(event) : void
  {
    for(let i = 0 ; i < this.cards_ref.nativeElement.children.length; i++)
    {
      this.cards_ref.nativeElement.children[i].children[0].classList.remove("selected")

      if(this.cards_ref.nativeElement.children[i].children[0].id == this.selected)
        this.cards_ref.nativeElement.children[i].children[0].classList.add("selected")
    }
  }
}