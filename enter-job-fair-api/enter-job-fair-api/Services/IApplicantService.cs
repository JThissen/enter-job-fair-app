using enter_job_fair_api.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace enter_job_fair_api.Services
{
    public interface IApplicantService
    {
        public Task<List<Applicant>> GetApplicantsAsync();
        public Task<List<Applicant>> GetApplicantsUniversityAsync(Guid universityId);
        public Task<Applicant> GetApplicantAsync(Guid id);
        public Task<bool> PostApplicantAsync(Applicant applicant, Guid universityId);
        public Task<bool> PutApplicantAsync(Applicant applicant);
        public Task<bool> PutApplicantRemarkAsync(Guid id, string remark);
        public Task<bool> DeleteApplicantAsync(Applicant applicant);
        public Task<Applicant> FindApplicantAsync(Guid id);
    }
}
