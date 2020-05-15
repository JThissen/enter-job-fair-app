using System;
using Xunit;
using Moq;
using enter_job_fair_api.Services;
using enter_job_fair_api.Models;
using System.Collections.Generic;
using enter_job_fair_api.Controllers;
using Microsoft.Extensions.Logging;
using Microsoft.AspNetCore.Mvc;
using System.Threading.Tasks;

namespace enter_job_fair_api.Test.Tests
{
    public class ApplicantControllerFixture
    {
        public ModelDataMock modelDataMock;
        public Mock<IApplicantService> mockApplicantService;
        public Mock<ILogger<ApplicantController>> mockLogger;
        public ApplicantController applicantController;

        public ApplicantControllerFixture()
        {
            modelDataMock = new ModelDataMock();
            mockApplicantService = new Mock<IApplicantService>();
            mockLogger = new Mock<ILogger<ApplicantController>>();
            applicantController = new ApplicantController(mockApplicantService.Object, mockLogger.Object);
        }
    }

    public class ApplicantControllerShould : IClassFixture<ApplicantControllerFixture>
    {
        public ApplicantControllerFixture fixture;

        public ApplicantControllerShould(ApplicantControllerFixture fixture) => this.fixture = fixture;

        [Fact]
        public async Task GetApplicants_ReturnCorrectType()
        {
            fixture.mockApplicantService.Setup(i => i.GetApplicantsAsync()).ReturnsAsync(fixture.modelDataMock.Applicants);
            ActionResult<List<Applicant>> result = await fixture.applicantController.GetApplicants();
            Assert.IsType<ActionResult<List<Applicant>>>(result);
        }

        [Fact]
        public async Task GetApplicants_ReturnCorrectApplicants()
        {
            fixture.mockApplicantService.Setup(i => i.GetApplicantsAsync()).ReturnsAsync(fixture.modelDataMock.Applicants);
            ActionResult<List<Applicant>> result = await fixture.applicantController.GetApplicants();
            Assert.Equal(2, result.Value.Count);
        }

        [Fact]
        public async Task GetApplicants_ReturnNotFound()
        {
            fixture.mockApplicantService.Setup(i => i.GetApplicantsAsync()).ReturnsAsync(new List<Applicant>());
            ActionResult<List<Applicant>> result = await fixture.applicantController.GetApplicants();
            Assert.IsType<NotFoundResult>(result.Result);
        }


        [Fact]
        public async Task GetApplicant_ReturnCorrectType()
        {
            fixture.mockApplicantService.Setup(i => i.GetApplicantAsync(It.IsAny<Guid>())).ReturnsAsync(fixture.modelDataMock.Applicants[0]);
            ActionResult<Applicant> result = await fixture.applicantController.GetApplicant(new Guid("7e64c6f4-936a-4b8d-b666-3f28a464380f"));
            Assert.IsType<ActionResult<Applicant>>(result);
        }

        [Fact]
        public async Task GetApplicant_ReturnCorrectApplicant()
        {
            fixture.mockApplicantService.Setup(i => i.GetApplicantAsync(It.IsAny<Guid>())).ReturnsAsync(fixture.modelDataMock.Applicants[0]);
            ActionResult<Applicant> result = await fixture.applicantController.GetApplicant(new Guid("7e64c6f4-936a-4b8d-b666-3f28a464380f"));
            Assert.Equal(new Guid("7e64c6f4-936a-4b8d-b666-3f28a464380f"), result.Value.Id);
        }

        [Fact]
        public async Task GetApplicant_ReturnNotFound()
        {
            fixture.mockApplicantService.Setup(i => i.GetApplicantAsync(It.IsAny<Guid>())).ReturnsAsync((Applicant)null);
            ActionResult<Applicant> result = await fixture.applicantController.GetApplicant(Guid.NewGuid());
            Assert.IsType<NotFoundResult>(result.Result);
        }


        [Fact]
        public async Task GetApplicantsUniversity_ReturnCorrectType()
        {
            fixture.mockApplicantService.Setup(i => i.GetApplicantsUniversityAsync(It.IsAny<Guid>())).ReturnsAsync(fixture.modelDataMock.Applicants);
            ActionResult<List<Applicant>> result = await fixture.applicantController.GetApplicantsUniversity(new Guid("c634373d-48d7-488a-bb16-fe7aabf4f282"));
            Assert.IsType<ActionResult<List<Applicant>>>(result);
        }

        [Fact]
        public async Task GetApplicantsUniversity_ReturnCorrectApplicants()
        {
            fixture.mockApplicantService.Setup(i => i.GetApplicantsUniversityAsync(It.IsAny<Guid>())).ReturnsAsync(fixture.modelDataMock.Applicants);
            ActionResult<List<Applicant>> result = await fixture.applicantController.GetApplicantsUniversity(new Guid("c634373d-48d7-488a-bb16-fe7aabf4f282"));
            Assert.Equal(2, result.Value.Count);
        }

        [Fact]
        public async Task GetApplicantsUniversity_ReturnNotFound()
        {
            fixture.mockApplicantService.Setup(i => i.GetApplicantsUniversityAsync(It.IsAny<Guid>())).ReturnsAsync(new List<Applicant>());
            ActionResult<List<Applicant>> result = await fixture.applicantController.GetApplicantsUniversity(Guid.NewGuid());
            Assert.IsType<NotFoundResult>(result.Result);
        }


        [Fact]
        public async Task PostApplicant_ReturnCorrectType()
        {
            fixture.mockApplicantService.Setup(i => i.PostApplicantAsync(It.IsAny<Applicant>(), It.IsAny<Guid>())).ReturnsAsync(true);
            ActionResult<Applicant> result = await fixture.applicantController.PostApplicant(fixture.modelDataMock.Applicants[0], new Guid(fixture.modelDataMock.Applicants[0].UniversityId));
            Assert.IsType<CreatedAtActionResult>(result.Result);
        }

        [Fact]
        public async Task PutApplicant_ReturnCorrectType()
        {
            fixture.mockApplicantService.Setup(i => i.PutApplicantAsync(It.IsAny<Applicant>())).ReturnsAsync(true);
            ActionResult<Applicant> result = await fixture.applicantController.PutApplicant(fixture.modelDataMock.Applicants[0]);
            Assert.IsType<NoContentResult>(result.Result);
        }

        [Fact]
        public async Task DeleteApplicant_ReturnCorrectType()
        {
            fixture.mockApplicantService.Setup(i => i.DeleteApplicantAsync(It.IsAny<Applicant>())).ReturnsAsync(true);
            fixture.mockApplicantService.Setup(i => i.FindApplicantAsync(It.IsAny<Guid>())).ReturnsAsync(fixture.modelDataMock.Applicants[0]);
            ActionResult<Applicant> result = await fixture.applicantController.DeleteApplicant(fixture.modelDataMock.Applicants[0].Id);
            Assert.IsType<NoContentResult>(result.Result);
        }

        [Fact]
        public async Task DeleteApplicant_ReturnNotFound()
        {
            fixture.mockApplicantService.Setup(i => i.FindApplicantAsync(It.IsAny<Guid>())).ReturnsAsync((Applicant)null);
            ActionResult<Applicant> result = await fixture.applicantController.DeleteApplicant(Guid.NewGuid());
            Assert.IsType<NotFoundResult>(result.Result);
        }
    }
}
