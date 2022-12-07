using AoC;

namespace Solvers
{
    public class Day03Solver: ISolver
    {

        private const string Priorities = " abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ";

        public void Solve1()
        {
            var lines = GetLines();
            var chars = lines.Select(FindIntersection);
            var pris = chars.Select(c => Priorities.IndexOf(c));

            Console.WriteLine(pris.Sum());
        }

        public void Solve2()
        {
            var lines = GetLines();
            var groups = GroupByThree(lines);
            var chars = groups.Select(FindIntersection);
            var pris = chars.Select(c => Priorities.IndexOf(c));

            Console.WriteLine(pris.Sum());
        }

        private List<string> GetLines()
        {
            return SolverUtils.ParseFile("day03/input", true);
        }

        private char FindIntersection(string line)
        {
            var halfSize = line.Count() / 2;
            var part1 = line.Substring(0, halfSize);
            var part2 = line.Substring(halfSize);

            var intersection = Enumerable.Intersect(part1, part2).ToList();
            if (intersection.Count() > 0)
            {
                return intersection[0];
            }

            return ' ';
        }

        private char FindIntersection(List<string> group)
        {
            var firstIntersection = string.Join("", Enumerable.Intersect(group[0], group[1]));
            var intersection = Enumerable.Intersect(firstIntersection, group[2]).ToList();

            if (intersection.Count() > 0)
            {
                return intersection[0];
            }

            return ' ';
        }

        private List<List<string>> GroupByThree(List<string> lines)
        {
            var groups = new List<List<string>>();
            var group = new List<string>();
            foreach (var line in lines)
            {
                if (group.Count == 3)
                {
                    groups.Add(group);
                    group = new List<string>();
                }

                group.Add(line);
            }
            groups.Add(group);

            return groups;
        }
    }
}
