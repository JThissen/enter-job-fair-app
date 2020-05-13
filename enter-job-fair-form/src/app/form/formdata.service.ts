import {FormControl, Validators} from '@angular/forms';
import {Injectable} from "@angular/core";
import { UniversityData } from '../general-classes/university-data';

@Injectable({providedIn: "root"})
export class FormData
{
    public universityId: FormControl;
    public first_name: FormControl;
    public last_name: FormControl;
    public email: FormControl;
    public phone_number: FormControl;
    public study_information: FormControl;
    public study_information_track: FormControl;
    public study_program: FormControl;
    public graduation_date: FormControl;
    public availability_date: FormControl;
    public career_lunch_participation: FormControl;
    public dutch_speaking: FormControl;
    public privacy_data: FormControl;
    public notes: FormControl;
    public university_data: UniversityData;

    public event_location_year: string;

    public constructor()
    {
        this.universityId = new FormControl();
        this.first_name = new FormControl("", [Validators.required, Validators.pattern(new RegExp("^(?=.{1,40}$)[a-zA-Z]+(?:[-'\s][a-zA-Z]+)*$"))]);
        this.last_name = new FormControl("", [Validators.required, Validators.pattern(new RegExp("^(?=.{1,40}$)[a-zA-Z]+(?:[-'\s][a-zA-Z]+)*$"))]);
        this.email = new FormControl("", [Validators.email, Validators.required]);
        this.phone_number = new FormControl(),
        this.study_information = new FormControl("", [Validators.required]),
        this.study_information_track = new FormControl();
        this.study_program = new FormControl("", [Validators.required]),
        this.graduation_date = new FormControl(new Date());
        this.availability_date = new FormControl(new Date(), [Validators.required]);
        this.career_lunch_participation = new FormControl(false);
        this.dutch_speaking = new FormControl(false);
        this.notes = new FormControl();
        this.privacy_data = new FormControl(false, [Validators.required]);
    }

    public set_form_control_value(target: FormControl, event) : void
    {
        if(event.value === undefined) return;
        target.setValue(event.value);
    }

    public disable_all() : void
    {
        this.first_name.disable();
        this.last_name.disable();
        this.email.disable();
        this.phone_number.disable();
        this.study_information.disable();
        this.study_information_track.disable();
        this.study_program.disable();
        this.graduation_date.disable();
        this.availability_date.disable();
        this.career_lunch_participation.disable();
        this.dutch_speaking.disable();
        this.notes.disable();
        this.privacy_data.disable();
    }

    public enable_all() : void
    {
        this.first_name.enable();
        this.last_name.enable();
        this.email.enable();
        this.phone_number.enable();
        this.study_information.enable();
        this.study_information_track.enable();
        this.study_program.enable();
        this.graduation_date.enable();
        this.availability_date.enable();
        this.career_lunch_participation.enable();
        this.dutch_speaking.enable();
        this.notes.enable();
        this.privacy_data.enable();
    }

    public on_submit() : void
    {
        console.log("called on_submit");
        console.log(this.first_name.value);
        console.log(this.last_name.value);
        console.log(this.email.value);
        console.log(this.phone_number.value);
        console.log(this.study_information.value);
        console.log(this.study_information_track.value);
        console.log(this.study_program.value);
        console.log(this.graduation_date.value.toISOString());
        console.log(this.availability_date.value.toISOString());
        console.log(this.career_lunch_participation.value);
        console.log(this.dutch_speaking.value);
        console.log(this.notes.value);
    }
}