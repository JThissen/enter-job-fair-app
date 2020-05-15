using Microsoft.AspNetCore.Http;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace enter_job_fair_api.Models
{
    public class UniversityModel
    {
        [Key]
        public Guid Id { get; set; }
        public bool Visible { get; set; }
        public string Name { get; set; }
        public string EventName { get; set; }
        public int EventYear { get; set; }
        public string Location { get; set; }
        public List<string> StudyPrograms { get; set; }
    }
}
