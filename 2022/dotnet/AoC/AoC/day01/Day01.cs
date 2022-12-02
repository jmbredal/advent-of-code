using AoC;

namespace Solvers
{
    public class Day01Solver : Solver
    {
        public void Solve1()
        {
            var sums = GetSums();
            Console.WriteLine($"Max: {sums[0]}");
        }

        public void Solve2()
        {
            var sums = GetSums();
            Console.WriteLine($"Sum max three: {sums.GetRange(0, 3).Sum()}");
        }

        public List<long> GetSums()
        {
            var input = SolverUtils.ParseFile("day01/input");
            var groups = SolverUtils.GroupLines<long>(input);
            return groups.Select(g => g.Sum()).Order().Reverse().ToList();
        }
    }
}
