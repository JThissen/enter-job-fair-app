using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using enter_job_fair_api.Context;
using enter_job_fair_api.Services;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.HttpsPolicy;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using Microsoft.Extensions.Logging;

namespace enter_job_fair_api
{
    public class Startup
    {
        private readonly IConfiguration configuration;
        private readonly string corsPolicy;

        public Startup()
        {
            this.configuration = BuildConfiguration().Build();
            corsPolicy = "front_end_policy";
        }

        public void ConfigureServices(IServiceCollection services)
        {
            services.AddCors(setupAction =>
            {
                setupAction.AddPolicy(corsPolicy, policy =>
                {
                    policy.WithOrigins(configuration["AppSettings:BaseUrl"])
                    .AllowAnyMethod()
                    .AllowAnyHeader()
                    .AllowCredentials();
                });
            });

            services.AddDbContext<EnterDbContext>(options =>
            {
                options.UseNpgsql(configuration["ConnectionStrings:PostgreSQLConnection"]);
            });
            services.AddControllers();
            services.AddScoped<IUniversityService, UniversityService>();
            services.AddScoped<IApplicantService, ApplicantService>();
            services.AddControllersWithViews().AddNewtonsoftJson();
        }

        public void Configure(IApplicationBuilder app, IWebHostEnvironment env, ILogger<Startup> logger)
        {
            if (env.IsDevelopment())
                app.UseDeveloperExceptionPage();
            else if (env.IsProduction() || env.IsStaging())
                app.UseExceptionHandler("/Error");

            app.UseCors(corsPolicy);
            app.UseHttpsRedirection();
            app.UseStaticFiles();
            app.UseRouting();
            app.UseAuthorization();
            app.UseEndpoints(endpoints =>
            {
                endpoints.MapControllers();
            });
        }

        public IConfigurationBuilder BuildConfiguration()
        {
            var environment = Environment.GetEnvironmentVariable("ASPNETCORE_ENVIRONMENT");

            return new ConfigurationBuilder()
                .AddJsonFile("appsettings.json", false, true)
                .AddJsonFile($"appsettings.{environment}.json", true)
                .AddEnvironmentVariables();
        }
    }
}
