using AoC;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Solvers
{
    public class Day01Solver
    {
        public void Solve()
        {
            var input = SolverUtils.ParseFile("day01/input");

            var groups = new List<List<long>>();
            var calories = new List<long>();

            input.ForEach((x) =>
            {
                if (x == "")
                {
                    groups.Add(calories);
                    calories = new List<long>();
                } else
                {
                    calories.Add(Int64.Parse(x));
                }
            });

            var sums = groups.Select(g => g.Sum()).Order().Reverse().ToList();

            Console.WriteLine($"Max: {sums[0]}");
            Console.WriteLine($"Sum max three: {sums.GetRange(0, 3).Sum()}");
        }
    }
}
