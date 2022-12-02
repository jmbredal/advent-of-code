using AoC;

namespace Solvers
{
    public class Day03Solver: Solver
    {
        public void Solve1()
        {
            var lines = GetLines();
            lines.ForEach(l => Console.WriteLine(l));
        }

        public void Solve2()
        {
        }

        private List<string> GetLines()
        {
            return SolverUtils.ParseFile("day03/input");
        }
    }
}
