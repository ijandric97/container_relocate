using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using container_relocate.Models;

namespace container_relocate.Services
{
    public interface IProblemService
    {
        Task<Problem[]> ListProblems();
        Task<Statistic> GetStatistic();

        Task IncreaseSolved();
    }
}