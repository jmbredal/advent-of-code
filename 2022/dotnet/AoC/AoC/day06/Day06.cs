using AoC;

namespace Solvers
{
    public class Day06Solver : ISolver
    {
        public void Solve1()
        {
            var line = SolverUtils.GetLines<string>("day06/input").ToList()[0];
            for (int i = 0; i < line.Length; i++)
            {
                if (line.Substring(i, 4).Distinct().Count() == 4)
                {
                    Console.WriteLine(i + 4);
                    break;
                }
            }
        }

        public void Solve2()
        {
            var line = SolverUtils.GetLines<string>("day06/input").ToList()[0];
            for (int i = 0; i < line.Length; i++)
            {
                if (line.Substring(i, 14).Distinct().Count() == 14)
                {
                    Console.WriteLine(i + 14);
                    break;
                }
            }
        }
    }
}
