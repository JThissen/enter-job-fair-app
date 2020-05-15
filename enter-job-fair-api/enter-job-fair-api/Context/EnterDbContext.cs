using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using enter_job_fair_api.Models;
using Microsoft.EntityFrameworkCore;

namespace enter_job_fair_api.Context
{
    public class EnterDbContext : DbContext
    {
        public DbSet<Applicant> Applicants { get; set; }
        public DbSet<University> Universities { get; set; }
        public DbSet<Admin> Admins { get; set; }

        public EnterDbContext(DbContextOptions<EnterDbContext> options) : base(options)
        { }
    }
}
