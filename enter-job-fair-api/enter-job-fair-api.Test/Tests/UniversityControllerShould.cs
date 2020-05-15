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
using Microsoft.AspNetCore.Http;
using System.IO;
using System.Text;
using Newtonsoft.Json;
using Xunit.Abstractions;

namespace enter_job_fair_api.Test.Tests
{
    public class UniversityControllerFixture
    {
        public ModelDataMock modelDataMock;
        public Mock<IUniversityService> mockUniversityService;
        public Mock<ILogger<UniversityController>> mockLogger;
        public UniversityController UniversityController;

        public UniversityControllerFixture()
        {
            modelDataMock = new ModelDataMock();
            mockUniversityService = new Mock<IUniversityService>();
            mockLogger = new Mock<ILogger<UniversityController>>();
            UniversityController = new UniversityController(mockUniversityService.Object, mockLogger.Object);
        }
    }

    public class UniversityControllerShould : IClassFixture<UniversityControllerFixture>
    {
        private readonly ITestOutputHelper output;
        public UniversityControllerFixture fixture;

        public UniversityControllerShould(ITestOutputHelper output, UniversityControllerFixture fixture)
        {
            this.output = output;
            this.fixture = fixture;
        }

        [Fact]
        public async Task GetUniversities_ReturnCorrectType()
        {
            fixture.mockUniversityService.Setup(i => i.GetUniversitiesAsync()).ReturnsAsync(fixture.modelDataMock.Universities);
            ActionResult<List<University>> result = await fixture.UniversityController.GetUniversities();
            Assert.IsType<ActionResult<List<University>>>(result);
        }

        [Fact]
        public async Task GetUniversities_ReturnCorrectUniversities()
        {
            fixture.mockUniversityService.Setup(i => i.GetUniversitiesAsync()).ReturnsAsync(fixture.modelDataMock.Universities);

            foreach (var i in fixture.modelDataMock.Universities)
                output.WriteLine(i.Name);
            ActionResult<List<University>> result = await fixture.UniversityController.GetUniversities();
            Assert.Equal(2, result.Value.Count);
        }

        [Fact]
        public async Task GetUniversities_ReturnNotFound()
        {
            fixture.mockUniversityService.Setup(i => i.GetUniversitiesAsync()).ReturnsAsync(new List<University>());
            ActionResult<List<University>> result = await fixture.UniversityController.GetUniversities();
            Assert.IsType<NotFoundResult>(result.Result);
        }


        [Fact]
        public async Task GetUniversity_ReturnCorrectType()
        {
            fixture.mockUniversityService.Setup(i => i.GetUniversityAsync(It.IsAny<Guid>())).ReturnsAsync(fixture.modelDataMock.Universities[0]);
            ActionResult<University> result = await fixture.UniversityController.GetUniversity(new Guid("c634373d-48d7-488a-bb16-fe7aabf4f282"));
            Assert.IsType<ActionResult<University>>(result);
        }

        [Fact]
        public async Task GetUniversity_ReturnCorrectApplicant()
        {
            fixture.mockUniversityService.Setup(i => i.GetUniversityAsync(It.IsAny<Guid>())).ReturnsAsync(fixture.modelDataMock.Universities[0]);
            ActionResult<University> result = await fixture.UniversityController.GetUniversity(new Guid("c634373d-48d7-488a-bb16-fe7aabf4f282"));
            Assert.Equal(new Guid("c634373d-48d7-488a-bb16-fe7aabf4f282"), result.Value.Id);
        }

        [Fact]
        public async Task GetUniversity_ReturnNotFound()
        {
            fixture.mockUniversityService.Setup(i => i.GetUniversityAsync(It.IsAny<Guid>())).ReturnsAsync((University)null);
            ActionResult<University> result = await fixture.UniversityController.GetUniversity(Guid.NewGuid());
            Assert.IsType<NotFoundResult>(result.Result);
        }

        [Fact]
        public async Task PostUniversity_ReturnCorrectType()
        {
            
            fixture.mockUniversityService.Setup(i => i.PostUniversityAsync(It.IsAny<UniversityModel>(), It.IsAny<byte[]>(), It.IsAny<byte[]>())).ReturnsAsync(true);
            byte[] mockData = Encoding.UTF8.GetBytes("mock data");
            FormFile mockFile = new FormFile(new MemoryStream(mockData), 0, mockData.Length, "Data", "mock.txt");
            string universityModelMockSerialized = JsonConvert.SerializeObject(new UniversityModel());
            ActionResult<University> result = await fixture.UniversityController.PostUniversity(mockFile, mockFile, universityModelMockSerialized);
            Assert.IsType<CreatedAtActionResult>(result.Result);
        }

        [Fact]
        public async Task PutUniversity_ReturnCorrectType()
        {
            fixture.mockUniversityService.Setup(i => i.PutUniversityAsync(It.IsAny<University>())).ReturnsAsync(true);
            ActionResult<Applicant> result = await fixture.UniversityController.PutUniversity(fixture.modelDataMock.Universities[0]);
            Assert.IsType<NoContentResult>(result.Result);
        }

        [Fact]
        public async Task DeleteUniversity_ReturnCorrectType()
        {
            fixture.mockUniversityService.Setup(i => i.DeleteUniversityAsync(It.IsAny<University>())).ReturnsAsync(true);
            fixture.mockUniversityService.Setup(i => i.FindUniversityAsync(It.IsAny<Guid>())).ReturnsAsync(fixture.modelDataMock.Universities[0]);
            ActionResult<University> result = await fixture.UniversityController.DeleteUniversity(fixture.modelDataMock.Universities[0].Id);
            Assert.IsType<NoContentResult>(result.Result);
        }

        [Fact]
        public async Task DeleteUniversity_ReturnNotFound()
        {
            fixture.mockUniversityService.Setup(i => i.FindUniversityAsync(It.IsAny<Guid>())).ReturnsAsync((University)null);
            ActionResult<University> result = await fixture.UniversityController.DeleteUniversity(Guid.NewGuid());
            Assert.IsType<NotFoundResult>(result.Result);
        }
    }
}
