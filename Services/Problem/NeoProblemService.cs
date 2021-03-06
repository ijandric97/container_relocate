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
            var values = new List<Problem>();
            var session = _driver.AsyncSession();
            try
            {
                var ret = await session.ReadTransactionAsync(async tx =>
                {
                    var cursor = await tx.RunAsync(
                        @"MATCH (n:Problem)-[c:COLUMN]->(cd:Data)
                        MATCH (n)-[s:SOLUTION]->(sd:Data)
                        WITH n, c, cd, s, sd
                        ORDER BY c.sort
                        WITH n, s, sd, collect(cd.data) AS data 
                        ORDER BY s.sort
                        RETURN n.id as id, n.col_size as col_size, n.row_size as row_size,
                        data, collect(sd.data) as solution
                        ORDER BY id"
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
                if (session != null) await session.CloseAsync();
            }

            return values.ToArray();
        }

        public async Task<Statistic> GetStatistic()
        {
            var value = new Statistic();
            var session = _driver.AsyncSession();
            try
            {
                var ret = await session.ReadTransactionAsync(async tx =>
                {
                    var cursor = await tx.RunAsync(
                        @"MATCH (n:Problem)
                        MATCH (s:Statistic {id:0})
                        RETURN count(n) AS problem_count, max(s.solved) AS solved_count"
                    );
                    return await cursor.ToListAsync();
                });
                foreach (IRecord record in ret)
                {
                    value = JsonConvert.DeserializeObject<Statistic>(JsonConvert.SerializeObject(record.Values));
                }

            }
            finally
            {
                if (session != null) await session.CloseAsync();
            }

            return value;
        }

        public async Task IncreaseSolved()
        {
            var session = _driver.AsyncSession();
            try
            {
                var ret = await session.WriteTransactionAsync(async tx =>
                {
                    var cursor = await tx.RunAsync(
                        @"MATCH (s:Statistic {id:0})
                        SET s.solved = s.solved + 1
                        RETURN s.solved"
                    );
                    return await cursor.ToListAsync();
                });

            }
            finally
            {
                if (session != null) await session.CloseAsync();
            }
        }
    }
}