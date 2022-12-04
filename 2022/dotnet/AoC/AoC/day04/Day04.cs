using AoC;

namespace Solvers
{
    public class Day04Solver : Solver
    {
        public void Solve1()
        {
            var result = SolverUtils.GetLines<string>("day04/input").Select(LineFullyContains).Where(x => x).Count();

            Console.WriteLine(result);
        }

        public void Solve2()
        {
            var result = SolverUtils.GetLines<string>("day04/input").Select(LineOverlaps).Where(x => x).Count();

            Console.WriteLine(result);
        }

        bool LineFullyContains(string line)
        {
            var ranges = line.Split(',');
            return FullyContains(ranges[0], ranges[1]);
        }

        bool FullyContains(string rangeA, string rangeB)
        {
            var r1 = rangeA.Split('-').Select(s => Convert.ToInt32(s)).ToArray();
            var r2 = rangeB.Split('-').Select(s => Convert.ToInt32(s)).ToArray();

            return RangeFullyContains(r1, r2) || RangeFullyContains(r2, r1);
        }

        public bool RangeFullyContains(int[] range1, int[] range2)
        {
            return range1[0] >= range2[0] && range1[1] <= range2[1];
        }

        bool LineOverlaps(string line)
        {
            var ranges = line.Split(',');
            return Overlaps(ranges[0], ranges[1]);
        }

        bool Overlaps(string rangeA, string rangeB)
        {
            var r1 = rangeA.Split('-').Select(s => Convert.ToInt32(s)).ToArray();
            var r2 = rangeB.Split('-').Select(s => Convert.ToInt32(s)).ToArray();

            return RangeOverlaps(r1, r2) || RangeOverlaps(r2, r1);
        }

        public bool RangeOverlaps(int[] range1, int[] range2)
        {
            return (range1[1] >= range2[0] && range1[1] <= range2[1]) || (range1[0] >= range2[0] && range1[0] <= range2[1]);
        }

    }
}
