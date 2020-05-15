using enter_job_fair_api.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace enter_job_fair_api.Services
{
    public interface IUniversityService
    {
        public Task<List<University>> GetUniversitiesAsync();
        public Task<University> GetUniversityAsync(Guid id);
        public Task<bool> PostUniversityAsync(UniversityModel universityModel, byte[] image, byte[] icon);
        public Task<bool> PutUniversityAsync(University university);
        public Task<bool> DeleteUniversityAsync(University university);
        public Task<University> FindUniversityAsync(Guid id);
        public Task<bool> PutFileAsync(Guid universityId, byte[] bytes, string type);
    }
}
