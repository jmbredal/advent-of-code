using System;
using System.Collections.Generic;
using System.Linq;
using AdventOfCode;

namespace Solvers
{

    public struct Coords
    {
        public int X { get; set; }
        public int Y { get; set; }

        public Coords(int x, int y)
        {
            X = x;
            Y = y;
        }

        public Coords(string coordString)
        {
            var coord = coordString.Split(",");
            Console.WriteLine($"{coord[0]},{coord[1]}");
            X = Int32.Parse(coord[0]);
            Y = Int32.Parse(coord[1]);
        }

        public override string ToString()
        {
            return $"({X},{Y})";
        }

        public Tuple<int, int> ToTuple() {
            return new Tuple<int, int>(X, Y);
        }
    }

    public class Day05Solver
    {
        public List<string> TestData { get; set; }
        public List<string> RealData { get; set; }

        public Day05Solver()
        {
            TestData = SolverUtils.ParseFile("day05/testdata");
            RealData = SolverUtils.ParseFile("day05/input", true);

            SolveTask1(TestData);
            SolveTask1(RealData);
            // SolveTask2(TestData);
            // SolveTask2(RealData);
        }

        public void SolveTask1(List<string> data)
        {
            // var numbers = data.First().Split(',').Select(c => Int32.Parse(c)).ToList();
            var segments = data.Where(d => !isDiagonal(d)).Select(d => createLinesegment(d)).ToList();
            var lookup = new Dictionary<Tuple<int, int>, int>();
            var mapping = segments.Aggregate(lookup, (acc, segment) => {
                var tuples = segment.ToList().Select(c => c.ToTuple()).ToList();
                tuples.ForEach(t => {
                    // Console.WriteLine(t);
                    if (acc.ContainsKey(t)) {
                        acc[t]++;
                    } else {
                        acc[t] = 1;
                    }
                });
                return acc;
            });

            foreach (var item in mapping)
            {
                // Console.WriteLine(item);
            }

            Console.WriteLine(mapping.Values.Where(v => v > 1).Count());
        }

        private IEnumerable<Coords> createLinesegment(string line) {
            var pairs = line.Split(" -> ");
            var from = new Coords(pairs[0]);
            var to = new Coords(pairs[1]);

            // horizontal line
            if (from.X != to.X) {
                if (from.X > to.X) {
                    var tmp = from;
                    from = to;
                    to = tmp;
                }
                return Enumerable.Range(from.X, to.X - from.X + 1).Select(x => {
                    return new Coords(x, from.Y);
                });
            }

            // vertical line
            if (from.Y != to.Y) {
                if (from.Y > to.Y) {
                    var tmp = from.Y;
                    from.Y = to.Y;
                    to.Y = tmp;
                }
                return Enumerable.Range(from.Y, to.Y - from.Y + 1).Select(y => {
                    return new Coords(from.X, y);
                });
            }

            return new List<Coords>{};
        }

        private bool isDiagonal(string line) {
            var pairs = line.Split(" -> ");
            var from = new Coords(pairs[0]);
            var to = new Coords(pairs[1]);

            return from.X != to.X && from.Y != to.Y;
        }

        public void SolveTask2(List<string> data)
        {
            var numbers = data.First().Split(',').Select(c => Int32.Parse(c)).ToList();
        }
    }
}
