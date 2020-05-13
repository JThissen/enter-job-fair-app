using enter_job_fair_api.Models;
using enter_job_fair_api.Services;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace enter_job_fair_api.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ApplicantController : ControllerBase
    {
        private readonly IApplicantService applicantService;
        private readonly ILogger<ApplicantController> logger;
        
        public ApplicantController(IApplicantService applicantService, ILogger<ApplicantController> logger)
        {
            this.applicantService = applicantService;
            this.logger = logger;
        }

        [HttpGet]
        public async Task<ActionResult<List<Applicant>>> GetApplicants()
        {
            List<Applicant> applicants = await applicantService.GetApplicantsAsync();

            if (applicants.Count == 0)
                return NotFound();

            return Ok(applicants);
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<Applicant>> GetApplicant(Guid id)
        {
            Applicant applicant = await applicantService.GetApplicantAsync(id);

            if (applicant == null)
                return NotFound();

            return Ok(applicant);
        }

        [HttpGet("university")]
        public async Task<ActionResult<Applicant>> GetApplicantsUniversity(Guid universityId)
        {
            logger.LogWarning(universityId.ToString());
            List<Applicant> applicants = await applicantService.GetApplicantsUniversityAsync(universityId);

            if (applicants.Count == 0)
                return NotFound();

            return Ok(applicants);
        }

        [HttpPost]
        public async Task<ActionResult<Applicant>> PostApplicant([FromBody] Applicant applicant, Guid universityId)
        {
            logger.LogWarning(universityId.ToString());
            await applicantService.PostApplicantAsync(applicant, universityId);
            await applicantService.GetApplicantAsync(applicant.Id);
            return CreatedAtAction(nameof(GetApplicant), new { id = applicant.Id }, applicant);
        }

        

        [HttpPut]
        public async Task<ActionResult> PutApplicant([FromBody] Applicant applicant)
        {
            await applicantService.PutApplicantAsync(applicant);
            return NoContent();
        }

        [HttpPut]
        [Route("ApplicantRemark")]
        public async Task<ActionResult> PutApplicantRemark([FromBody] Applicant applicant)
        {
            await applicantService.PutApplicantRemarkAsync(applicant.Id, applicant.Remark);
            return NoContent();
        }

        [HttpDelete("{id}")]
        public async Task<ActionResult<Applicant>> DeleteApplicant(Guid id)
        {
            Applicant existingApplicant = await applicantService.FindApplicantAsync(id);

            if (existingApplicant == null)
                return NotFound();

            await applicantService.DeleteApplicantAsync(existingApplicant);
            return existingApplicant;
        }
    }
}
