using enter_job_fair_api.Context;
using enter_job_fair_api.Models;
using enter_job_fair_api.Services;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Logging;
using Microsoft.AspNetCore.Http;
using enter_job_fair_api.Other;
using Newtonsoft.Json;

namespace enter_job_fair_api.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class UniversityController : ControllerBase
    {
        private readonly IUniversityService universityService;
        private readonly ILogger<UniversityController> logger;

        public UniversityController(IUniversityService universityService, ILogger<UniversityController> logger)
        {
            this.universityService = universityService;
            this.logger = logger;
        }

        [HttpGet]
        public async Task<ActionResult<List<University>>> GetUniversities()
        {
           List<University> universities = await universityService.GetUniversitiesAsync();

            if (universities.Count == 0)
                return NotFound();

            return Ok(universities);
        }
        
        [HttpGet("{id}")]

        public async Task<ActionResult<University>> GetUniversity(Guid id)
        {
            University university = await universityService.GetUniversityAsync(id);

            if (university == null)
                return NotFound();
            
            return Ok(university);
        }

        [HttpPost]
        public async Task<ActionResult<University>> PostUniversity([FromForm] IFormFile image, [FromForm] IFormFile icon, [FromForm] string obj)
        {
            UniversityModel universityModel = JsonConvert.DeserializeObject<UniversityModel>(obj);
           
            byte[] imageBytes = await Utilities.ReadFormFileAsync(image);
            byte[] iconBytes = await Utilities.ReadFormFileAsync(icon);

            await universityService.PostUniversityAsync(universityModel, imageBytes, iconBytes);
            return CreatedAtAction(nameof(GetUniversity), new { id = universityModel.Id }, universityModel);
        }

        [HttpPut("file")]
        public async Task<IActionResult> UploadFileAsync([FromForm] IFormFile myFile, [FromForm] Guid universityId, [FromForm] string type)
        {
            byte[] fileBytes = await Utilities.ReadFormFileAsync(myFile);
            await universityService.PutFileAsync(universityId, fileBytes, type);
            return NoContent();
        }

        [HttpPut]
        public async Task<ActionResult> PutUniversity([FromBody] University university)
        {
            await universityService.PutUniversityAsync(university);
            return NoContent();
        }

        [HttpDelete("{id}")]
        public async Task<ActionResult<University>> DeleteUniversity(Guid id)
        {
            University existingUniversity = await universityService.FindUniversityAsync(id);
            
            if (existingUniversity == null)
                return NotFound();

            await universityService.DeleteUniversityAsync(existingUniversity);
            return existingUniversity;
        }
    }
}
