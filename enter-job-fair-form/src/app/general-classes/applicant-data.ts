export class ApplicantData
{
    public id: string;
    public first_name: string;
    public last_name: string;
    public email_address: string;
    public phone_number: string;
    public degree_level: string;
    public study_information_track: string;
    public study_program: string;
    public graduation_date: string;
    public availability_date: string;
    public career_lunch_participation: boolean;
    public dutch_speaking: boolean;
    public notes: string;
    public remark: string;
    public submission_date: string; 
    public universityId: string;

    public constructor(id: string, first_name: string, last_name: string, email: string, phone_number: string, degree_level: string,
        track: string, study_program: string, graduation_date: string, availability: string, lunch: boolean, dutch_speaking: boolean,
        notes: string, remark: string, submission_date: string, universityId: string)
    {
        this.id = id;
        this.first_name = first_name;
        this.last_name = last_name;
        this.email_address = email;
        this.phone_number = phone_number;
        this.degree_level = degree_level;
        this.study_information_track = track;
        this.study_program = study_program
        this.graduation_date = graduation_date;
        this.availability_date = availability;
        this.career_lunch_participation = lunch
        this.dutch_speaking = dutch_speaking;
        this.notes = notes;
        this.remark = remark;
        this.submission_date = submission_date;
        this.universityId = universityId;
    }
}