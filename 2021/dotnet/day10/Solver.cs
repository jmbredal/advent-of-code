using System;
using System.Linq;
using System.Collections.Generic;
using AdventOfCode;

namespace Solvers
{
    public class Day10Solver
    {
        public List<string> TestData { get; set; }
        public List<string> RealData { get; set; }
        public List<char> StartingChars { get; set; }
        public List<char> EndingChars { get; set; }

        public Day10Solver()
        {
            TestData = SolverUtils.ParseFile("day10/testdata");
            RealData = SolverUtils.ParseFile("day10/input", true);

            StartingChars = new List<char> { '(', '[', '{', '<' };
            EndingChars = new List<char> { ')', ']', '}', '>' };

            SolveTask1(TestData);
            SolveTask1(RealData);
            SolveTask2(TestData);
            SolveTask2(RealData);
        }

        public void SolveTask1(List<string> lines)
        {
            var scoreMap = new Dictionary<char, int>{
                {')', 3},
                {']', 57},
                {'}', 1197},
                {'>', 25137},
            };

            var sum = lines.Select(ParseLine)
                .Where(s => !string.IsNullOrEmpty(s))
                .Select(s => scoreMap[s[0]])
                .Sum();

            Console.WriteLine($"Total error score: {sum}");
        }

        public void SolveTask2(List<string> lines)
        {
            var scoreMap = new Dictionary<char, long>{
                {')', 1},
                {']', 2},
                {'}', 3},
                {'>', 4},
            };

            var incomplete = lines.Where(l => ParseLine(l) == null);
            var scores = incomplete.Select(line =>
            {
                return GetCompletionChars(line).Aggregate((long) 0, (score, c) =>
                {
                    score *= 5;
                    score += scoreMap[c];
                    return score;
                });
            }).ToList();

            scores.Sort();
            var middle = (scores.Count / 2);
            Console.WriteLine($"Middle completion score: {scores[middle]}");
        }

        private string ParseLine(string line)
        {
            var stack = new Stack<char>();
            foreach (var c in line)
            {
                if (StartingChars.Contains(c))
                {
                    stack.Push(c);
                }

                if (EndingChars.Contains(c))
                {
                    var x = stack.Pop();
                    var startCharIndex = StartingChars.IndexOf(x);
                    if (EndingChars[startCharIndex] != c)
                    {
                        // Console.WriteLine($"Expected {endingChars[startCharIndex]} but found {c}");
                        return c.ToString();
                    }
                }
            }
            return null;
        }

        private List<char> GetCompletionChars(string line)
        {
            var stack = new Stack<char>();
            foreach (var c in line)
            {
                if (StartingChars.Contains(c))
                {
                    stack.Push(c);
                }

                if (EndingChars.Contains(c))
                {
                    stack.Pop();
                }
            }

            var completionChars = new List<char>();
            while (stack.Count > 0)
            {
                var c = stack.Pop();
                var index = StartingChars.IndexOf(c);
                completionChars.Add(EndingChars[index]);
            }
            return completionChars;
        }
    }
}