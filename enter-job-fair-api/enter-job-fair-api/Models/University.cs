using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;

namespace enter_job_fair_api.Models
{
    public class University
    {
        [Key]
        public Guid Id { get; set; }
        public bool Visible { get; set; }
        public string Name { get; set; }
        public string EventName { get; set; }
        public int EventYear { get; set; }
        public string Location { get; set; }
        public byte[] Image { get; set; }
        public byte[] Icon { get; set; }
        public List<string> StudyPrograms { get; set; }
        public List<Applicant> Applicants { get; set; }
    }
}
