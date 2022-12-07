using AoC;
using System.Text.RegularExpressions;

namespace Solvers
{
    public class Day05Solver : ISolver
    {
        public void Solve1()
        {
            var lines = SolverUtils.GetLines<string>("day05/input").ToList();
            var stacks = Stacks();
            Action<string> HandleInstruction = line => HandleStackInstruction(stacks, line);
            lines.ForEach(HandleInstruction);

            Console.WriteLine(string.Join("", stacks.Keys.Select(k => stacks[k].Peek())));
        }

        public void Solve2()
        {
            var lines = SolverUtils.GetLines<string>("day05/input").ToList();
            var stacks = Stacks();
            Action<string> HandleInstruction = line => HandleStackInstruction2(stacks, line);
            lines.ForEach(HandleInstruction);

            Console.WriteLine(string.Join("", stacks.Keys.Select(k => stacks[k].Peek())));
        }

        (int count, int from, int to) ParseLine(string input)
        {
            var pattern = @"move (\d+) from (\d+) to (\d+)";
            var match = Regex.Match(input, pattern, RegexOptions.IgnoreCase);
            var count = Int32.Parse(match.Groups[1].Value);
            var from = Int32.Parse(match.Groups[2].Value);
            var to = Int32.Parse(match.Groups[3].Value);

            return (count, from, to);
        }

        void HandleStackInstruction(Dictionary<int, Stack<char>> stacks, string line)
        {
            var (count, from, to) = ParseLine(line);
            for (int i = 0; i < count; i++)
            {
                var crate = stacks[from].Pop();
                stacks[to].Push(crate);
            }
        }

        void HandleStackInstruction2(Dictionary<int, Stack<char>> stacks, string line)
        {
            var (count, from, to) = ParseLine(line);
            var temp = new List<char> { };
            for (int i = 0; i < count; i++)
            {
                var crate = stacks[from].Pop();
                temp.Add(crate);
            }

            temp.Reverse();
            temp.ForEach(crate =>
            {
                stacks[to].Push(crate);
            });
        }

        Dictionary<int, Stack<char>> Stacks()
        {
            var one = new List<char> { 'G', 'D', 'V', 'Z', 'J', 'S', 'B' };
            var two = new List<char> { 'Z', 'S', 'M', 'G', 'V', 'P' };
            var three = new List<char> { 'C', 'L', 'B', 'S', 'W', 'T', 'Q', 'F' };
            var four = new List<char> { 'H', 'J', 'G', 'W', 'M', 'R', 'V', 'Q' };
            var five = new List<char> { 'C', 'L', 'S', 'N', 'F', 'M', 'D' };
            var six = new List<char> { 'R', 'G', 'C', 'D' };
            var seven = new List<char> { 'H', 'G', 'T', 'R', 'J', 'D', 'S', 'Q' };
            var eight = new List<char> { 'P', 'F', 'V' };
            var nine = new List<char> { 'D', 'R', 'S', 'T', 'J' };

            var d = new Dictionary<int, Stack<char>>
            {
                { 1, new Stack<char>(one) },
                { 2, new Stack<char>(two) },
                { 3, new Stack<char>(three) },
                { 4, new Stack<char>(four) },
                { 5, new Stack<char>(five) },
                { 6, new Stack<char>(six) },
                { 7, new Stack<char>(seven) },
                { 8, new Stack<char>(eight) },
                { 9, new Stack<char>(nine) },
            };

            return d;
        }
    }
}


//[F][Q][Q]
//[B][Q][V][D][S]
//[S][P][T][R][M][D]
//[J][V][W][M][F][J][J]
//[Z][G][S][W][N][D][R][T]
//[V][M][B][G][S][C][T][V][S]
//[D][S][L][J][L][G][G][F][R]
//[G][Z][C][H][C][R][H][P][D]
//1   2   3   4   5   6   7   8   9


