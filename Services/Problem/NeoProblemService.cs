using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Neo4j.Driver;
using container_relocate.Models;
using Newtonsoft.Json;


namespace container_relocate.Services
{
    public class NeoProblemService : IProblemService
    {
        private readonly IDriver _driver;

        public NeoProblemService(IDriver driver)
        {
            this._driver = driver;
        }

        public async Task<Problem[]> ListProblems()
        {
            var session = _driver.AsyncSession();
            var values = new List<Problem>();
            Console.WriteLine("SHIT");
            try
            {
                var ret = await session.ReadTransactionAsync(async tx =>
                {
                    var cursor = await tx.RunAsync(
                        @"MATCH (n:Problem)
                        CALL {
                            MATCH (n)-[c:COLUMN]->(cd:Data)
                            WITH c, cd
                            ORDER BY c.sort
                            RETURN collect(cd.data) as data
                        }
                        CALL {
                            MATCH (n)-[s:SOLUTION]->(sd:Data)
                            with s, sd
                            ORDER BY s.sort
                            RETURN collect(sd.data) as solution
                        }
                        RETURN n.id as id, n.col_size as col_size, n.row_size as row_size, data, solution"
                    );
                    return await cursor.ToListAsync();
                });
                foreach (IRecord record in ret)
                {
                    var problem = JsonConvert.DeserializeObject<Problem>(JsonConvert.SerializeObject(record.Values));
                    values.Add(problem);
                }

            }
            finally
            {
                if (session != null)
                {
                    await session.CloseAsync();
                }
            }

            return values.ToArray();
        }
    }
}