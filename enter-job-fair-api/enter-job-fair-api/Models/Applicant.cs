using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;

namespace enter_job_fair_api.Models
{
    public enum DEGREE_LEVEL
    {
        BSc, MSc, PDEng, PhD
    }

    public class Applicant
    {
        [Key]
        public Guid Id { get; set; }
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public string Email { get; set; }
        public string PhoneNumber { get; set; }
        public string DegreeLevel { get; set; }
        public string Track { get; set; }
        public string StudyProgram { get; set; }
        public DateTimeOffset? GraduationDate { get; set; }
        public DateTimeOffset Availability { get; set; }

        public bool Lunch { get; set; }
        public bool DutchSpeaking { get; set; }
        public string Notes { get; set; }
        public string Remark { get; set; }
        public DateTimeOffset? SubmissionDate { get; set; }
        public string UniversityId { get; set; }
        public University University { get; set; }
    }
}
