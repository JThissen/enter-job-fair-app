using enter_job_fair_api.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace enter_job_fair_api.Services
{
    public interface IBooksRepository
    {
        public Task<int> GetBook();
    }
}
