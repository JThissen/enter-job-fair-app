using enter_job_fair_api.Models;
using System;
using System.Collections.Generic;
using System.Text;

namespace enter_job_fair_api.Test
{
    public class ModelDataMock
    {
        public List<University> Universities { get; set; }
        public List<Applicant> Applicants { get; set; }

        public ModelDataMock()
        {
            Universities = CreateUniversities();
            Applicants = CreateApplicants();

            foreach (Applicant a in Applicants)
                Universities[0].Applicants.Add(a);
        }

        List<University> CreateUniversities()
        {
            return new List<University>()
            {
                new University
                {
                    Id = new Guid("c634373d-48d7-488a-bb16-fe7aabf4f282"),
                    Visible = true,
                    Name = "University of Twente",
                    EventName = "Event @ UT",
                    EventYear = 2020,
                    Location = "Enschede",
                    StudyPrograms = new List<string>(){"Computer Science", "Civil Engineering", "Advanced Technology", "Electrical Engineering"},
                    Applicants = new List<Applicant>()
                },
                new University
                {
                    Id = new Guid("09c92185-8a5c-4ac3-8817-a6b1086c2f38"),
                    Visible = true,
                    Name = "Eindhoven University of Technology",
                    EventName = "Event @ TUEindhoven",
                    EventYear = 2020,
                    Location = "Eindhoven",
                    StudyPrograms = new List<string>(){"Computer Science", "Civil Engineering", "Advanced Technology", "Electrical Engineering"},
                    Applicants = new List<Applicant>()
                }
            };
        }

        List<Applicant> CreateApplicants()
        {
            return new List<Applicant>()
            {
               new Applicant
               {
                   Id = new Guid("7e64c6f4-936a-4b8d-b666-3f28a464380f"),
                   FirstName = "Michael",
                   LastName = "Scott",
                   Email = "michaelscott@papercompany.com",
                   PhoneNumber = "1234567890",
                   DegreeLevel = "BSc",
                   Track = "Track 1",
                   StudyProgram = "Program 1",
                   GraduationDate = new DateTimeOffset(DateTime.Now),
                   Availability = new DateTimeOffset(DateTime.Now),
                   Lunch = true,
                   Notes = "Insert a message here...",
                   SubmissionDate = new DateTimeOffset(DateTime.Now),
                   UniversityId = "c634373d-48d7-488a-bb16-fe7aabf4f282"
               },
               new Applicant
               {
                   Id = new Guid("88c038f4-16e4-443c-a1ab-9811b9564108"),
                   FirstName = "Michael2",
                   LastName = "Scott2",
                   Email = "michaelscott2@papercompany.com",
                   PhoneNumber = "1234567890",
                   DegreeLevel = "BSc",
                   Track = "Track 1",
                   StudyProgram = "Program 1",
                   GraduationDate = new DateTimeOffset(DateTime.Now),
                   Availability = new DateTimeOffset(DateTime.Now),
                   Lunch = true,
                   Notes = "Insert a message here...",
                   SubmissionDate = new DateTimeOffset(DateTime.Now),
                   UniversityId = "c634373d-48d7-488a-bb16-fe7aabf4f282"
               }
            };
        }
    }
}
