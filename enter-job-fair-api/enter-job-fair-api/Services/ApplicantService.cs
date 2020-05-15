using enter_job_fair_api.Context;
using enter_job_fair_api.Models;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace enter_job_fair_api.Services
{
    public class ApplicantService : IApplicantService
    {
        private readonly EnterDbContext context;

        public ApplicantService(EnterDbContext context)
        {
            this.context = context;
        }

        public async Task<List<Applicant>> GetApplicantsAsync()
        {
            return await context.Applicants.ToListAsync();
        }

        public async Task<List<Applicant>> GetApplicantsUniversityAsync(Guid universityId)
        {
            return await context.Applicants.Where(i => i.University.Id == universityId).ToListAsync();
        }

        public async Task<Applicant> GetApplicantAsync(Guid id)
        {
            return await FindApplicantAsync(id);
        }

        public async Task<bool> PostApplicantAsync(Applicant applicant, Guid universityId)
        {
            University university = await context.Universities.FirstOrDefaultAsync(i => i.Id == universityId);

            context.Applicants.Add(new Applicant()
            {
                Id = Guid.NewGuid(),
                FirstName = applicant.FirstName,
                LastName = applicant.LastName,
                Email = applicant.Email,
                PhoneNumber = applicant.PhoneNumber,
                DegreeLevel = applicant.DegreeLevel,
                Track = applicant.Track,
                StudyProgram = applicant.StudyProgram,
                GraduationDate = applicant.GraduationDate,
                Availability = applicant.Availability,
                Lunch = applicant.Lunch,
                DutchSpeaking = applicant.DutchSpeaking,
                Notes = applicant.Notes,
                Remark = applicant.Remark,
                SubmissionDate = DateTimeOffset.Now,
                UniversityId = university.Id.ToString(),
                University = university
        });
            return (await context.SaveChangesAsync() > 0);
        }

        public async Task<bool> PutApplicantAsync(Applicant applicant)
        {
            context.Entry(applicant).State = EntityState.Modified;
            return (await context.SaveChangesAsync() > 0);
        }

        public async Task<bool> PutApplicantRemarkAsync(Guid id, string remark)
        {
            Applicant applicant = await context.Applicants.FirstOrDefaultAsync(i => i.Id == id);
            context.Applicants.Attach(applicant);
            context.Entry(applicant).Property(i => i.Remark).IsModified = true;
            return (await context.SaveChangesAsync() > 0);
        }

        public async Task<bool> DeleteApplicantAsync(Applicant applicant)
        {
            context.Applicants.Remove(applicant);
            return (await context.SaveChangesAsync() > 0);
        }

        public async Task<Applicant> FindApplicantAsync(Guid id)
        {
            return await context.Applicants.FirstOrDefaultAsync(i => i.Id == id);
        }
    }
}
