using enter_job_fair_api.Context;
using enter_job_fair_api.Models;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Logging;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace enter_job_fair_api.Services
{
    public class BooksRepository : IBooksRepository
    {
        private readonly ILogger<BooksRepository> logger;
        private EnterDbContext context;

        public BooksRepository(EnterDbContext context, ILogger<BooksRepository> logger)
        {
            this.context = context;
            this.logger = logger;
        }

        public async Task<int> GetBook()
        {
            //if(id == Guid.Empty)
            //{
            //    throw new ArgumentNullException(nameof(id));
            //}

            //return await context.Books.Include(x => x.Author).FirstOrDefaultAsync(x => x.Id == id);

            return await do_something();
        }

        public async Task<int> do_something()
        {
            await Task.Delay(1000);

            return 500;
        }
    }
}
