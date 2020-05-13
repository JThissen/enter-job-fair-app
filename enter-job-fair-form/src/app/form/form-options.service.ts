import { Injectable } from '@angular/core';

@Injectable({providedIn: 'root'})
export class FormOptionsService 
{
  public universities: Map<string, Array<string>>;
  public study_information_options: Array<string>;
  public career_lunch_participation_checkbox: boolean;
  public dutch_speaking_checkbox: boolean;
  public privacy_data_checkbox: boolean;
  public label_position: string;
  public notes_characters_left: number;
  public notes_max_characters: number;
  public event_header: string;
  public event_subheader: string;
  public privacy_statement_footer: string;

  public constructor()
  {
    this.universities = new Map<string, Array<string>>();
    this.label_position = "before";
    this.insert_mock_data();
  }

  public insert_mock_data() : void
  {
    this.study_information_options = ["BSc", "MSc", "PDEng", "PhD"];
    this.notes_max_characters = this.notes_characters_left = 250;
    this.event_header = "De Delftse Bedrijvendagen";
    this.event_subheader = "TU Delft, 2020";
    this.privacy_statement_footer = "By filling out this form, you agree to our privacy statement. We handle your information with the greatest care. Your data can be removed upon your request at any time.";
    this.event_header = "De Delftse Bedrijvendagen";
    this.event_subheader = "TU Delft, 2020";
    this.privacy_statement_footer = "By filling out this form, you agree to our privacy statement. We handle your information with the greatest care. Your data can be removed upon your request at any time.";
    this.add_university("TU Delft", ["Aerospace", "Applied Science", "Architecture & Built Environment", "Civil Engineering & Geosciences", "Computer Science", "Electrical Engineering", "Industrial Design Engineering", "Mathematics", "Mechanical, Maritime, Materials", "Technology, Policy, Management"]);
    this.add_university("TU Eindhoven", ["Study program 1", "Study program 2", "Study program 3"]);
    this.add_university("University of Twente", ["Study program 1", "Study program 2", "Study program 3"]);
  }

  public add_university(name: string, study_programs: Array<string>) : void
  {
      this.universities.set(name, study_programs);
  }

  public remove_university(name: string) : void
  {
      if(this.universities.has(name))
          this.universities.delete(name);
  }

  public update_university(name: string, study_programs: Array<string>) : void
  {
      this.add_university(name, study_programs);
  }
}