using Microsoft.AspNetCore.Http;
using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Threading.Tasks;

namespace enter_job_fair_api.Other
{
    public static class Utilities
    {
        public static async Task<byte[]> ReadFormFileAsync(IFormFile file)
        {
            var fileSize = file.Length;
            byte[] fileBytes = new byte[file.Length];

            using (Stream fileStream = file.OpenReadStream())
            {
                var offset = 0;

                while (offset < file.Length)
                {
                    var chunkSize = fileSize - offset < 8192 ? (int)fileSize - offset : 8192;
                    offset += await fileStream.ReadAsync(fileBytes, offset, chunkSize);
                }
            }

            return fileBytes;
        }
    }
}
