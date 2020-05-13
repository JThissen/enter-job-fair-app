using enter_job_fair_api.Context;
using enter_job_fair_api.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using System.Collections;
using Microsoft.Extensions.Logging;
using Microsoft.AspNetCore.Http;

namespace enter_job_fair_api.Services
{
    public class UniversityService : IUniversityService
    {
        private readonly EnterDbContext context;
        private readonly ILogger<UniversityService> logger;

        public UniversityService(EnterDbContext context, ILogger<UniversityService> logger)
        {
            this.context = context;
            this.logger = logger;
        }

        public async Task<List<University>> GetUniversitiesAsync()
        {
            return await context.Universities.ToListAsync();
        }

        public async Task<University> GetUniversityAsync(Guid id)
        {
            return await FindUniversityAsync(id);
        }

        public async Task<bool> PostUniversityAsync(UniversityModel universityModel, byte[] image, byte[] icon)
        {
            context.Universities.Add(new University()
            {
                Id = Guid.NewGuid(),
                Visible = universityModel.Visible,
                Name = universityModel.Name,
                EventName = universityModel.EventName,
                EventYear = universityModel.EventYear,
                Location = universityModel.Location,
                Image = image,
                Icon = icon,
                StudyPrograms = universityModel.StudyPrograms
            });
            return (await context.SaveChangesAsync() > 0);
        }

        public async Task<bool> PutUniversityAsync(University university)
        {
            University current_university = await context.Universities.FirstOrDefaultAsync(i => i.Id == university.Id);

            if (current_university == null)
                return false;
            else
            {
                current_university.Visible = university.Visible;
                current_university.Name = university.Name;
                current_university.EventName = university.EventName;
                current_university.EventYear = university.EventYear;
                current_university.Location = university.Location;
                current_university.StudyPrograms = university.StudyPrograms;
                return (await context.SaveChangesAsync() > 0);
            }
        }

        public async Task<bool> DeleteUniversityAsync(University university)
        {
            context.Universities.Remove(university);
            return (await context.SaveChangesAsync() > 0);
        }

        public async Task<University> FindUniversityAsync(Guid id)
        {
            return await context.Universities.FirstOrDefaultAsync(i => i.Id == id);
        }

        public async Task<bool> PutFileAsync(Guid universityId, byte[] bytes, string type)
        {
            University university = await context.Universities.FirstOrDefaultAsync(i => i.Id == universityId);
            
            switch(type)
            {
                case "image": university.Image = bytes; break;
                case "icon": university.Icon = bytes; break;
            }
            context.Entry(university).State = EntityState.Modified;
            return (await context.SaveChangesAsync() > 0);
        }
    }
}
