export class UniversityData
{
  public constructor(id: string, name: string, visible: boolean, study_programs?: Array<string>, location?: string, event_name?: string, event_year?: number, image?: string, icon?: string)
  {
    this.id = id;
    this.name = name;
    this.event_name = event_name;
    this.event_year = event_year;
    this.visible = visible;
    this.location = location;
    this.image = image;
    this.icon = icon;
    this.study_programs = study_programs;

  }

  public id: string;
  public name: string;
  public event_name: string;
  public event_year: number;
  public visible: boolean;
  public location: string;
  public image: string;
  public icon: string;
  public study_programs: Array<string>;
}