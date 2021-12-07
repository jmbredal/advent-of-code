using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;

namespace Solvers
{

    public class Day07Solver
    {
        public List<string> TestData { get; set; }
        public List<string> RealData { get; set; }

        public Day07Solver()
        {
            TestData = ParseFile("day07/testdata");
            RealData = ParseFile("day07/input", true);

            SolveTask1(TestData);
            SolveTask1(RealData);
            SolveTask2(TestData);
            SolveTask2(RealData);
        }

        public static List<string> ParseFile(string filename, bool unixStyle=false)
        {
            if (unixStyle) {
                return File.ReadAllText(filename).Split('\n').ToList();
            } else {
                return File.ReadAllText(filename).Split(Environment.NewLine).ToList();
            }
        }

        public void SolveTask1(List<string> data)
        {
            var minMoves = 1000000000;
            var numbers = data.First().Split(',').Select(c => Int32.Parse(c)).ToList();
            for (var position = 0; position <= numbers.Max(); position++) {
                var moves = 0;
                numbers.ForEach(n => {
                    moves += Math.Abs(n - position);
                });
                if (moves < minMoves) {
                    minMoves = moves;
                }
            }
            Console.WriteLine($"Task 1: {minMoves} fuel");
        }

        public void SolveTask2(List<string> data)
        {
            var minMoves = 100000000000;
            var numbers = data.First().Split(',').Select(c => Int32.Parse(c)).ToList();
            for (var position = 0; position <= numbers.Max(); position++) {
                var moves = 0;
                numbers.ForEach(n => {
                    moves += FindMoveCost(Math.Abs(n - position));
                });
                if (moves < minMoves) {
                    minMoves = moves;
                }
            }
            Console.WriteLine($"Task 2: {minMoves} fuel");
        }

        private int FindMoveCost(int distance)
        {
            return ((distance * distance) + distance) / 2;
        }
    }
}
