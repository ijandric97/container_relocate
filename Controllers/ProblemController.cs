using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using container_relocate.Models;
using container_relocate.Services;

namespace container_relocate.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class ProblemController : ControllerBase
    {
        private readonly IProblemService _problemService;

        public ProblemController(IProblemService problemService)
        {
            this._problemService = problemService;
        }

        // GET api/problem
        [HttpGet("")]
        public async Task<ActionResult<IEnumerable<Problem>>> GetProblems()
        {
            var items = await this._problemService.ListProblems();

            return Ok(items.ToArray());
        }

        [HttpGet("statistic")]
        public async Task<ActionResult<IEnumerable<Statistic>>> GetStatistic()
        {
            var item = await this._problemService.GetStatistic();

            return Ok(item);
        }

        [HttpPost("statistic")]
        public async Task<ActionResult> IncreaseSolved()
        {
            await this._problemService.IncreaseSolved();
            return Ok("Solved increased");
        }

    }
}