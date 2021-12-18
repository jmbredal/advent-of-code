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
            X = Int32.Parse(coord[0]);
            Y = Int32.Parse(coord[1]);
        }

        public override string ToString()
        {
            return $"({X},{Y})";
        }

        public (int X, int Y) ToTuple() {
            return (X, Y);
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
            var segments = data.Where(IsNotDiagonal).Select(CreateLinesegment).ToList();
            var lookup = new Dictionary<(int, int), int>();
            var mapping = GetTuples(segments).Aggregate(lookup, (mapping, tuple) => {
                if (mapping.ContainsKey(tuple)) {
                    mapping[tuple]++;
                } else {
                    mapping[tuple] = 1;
                }
                return mapping;
            });

            Console.WriteLine(mapping.Values.Where(v => v > 1).Count());
        }

        private IEnumerable<Coords> CreateLinesegment(string line) {
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

        private IEnumerable<(int, int)> GetTuples(IEnumerable<IEnumerable<Coords>> segments) {
            return segments.Aggregate(new List<(int, int)>(), (acc, segment) => {
                acc.AddRange(segment.Select(c => c.ToTuple()));
                return acc;
            });
        }

        private bool IsNotDiagonal(string line) {
            var pairs = line.Split(" -> ");
            var from = new Coords(pairs[0]);
            var to = new Coords(pairs[1]);

            return !(from.X != to.X && from.Y != to.Y);
        }

        public void SolveTask2(List<string> data)
        {
            var numbers = data.First().Split(',').Select(c => Int32.Parse(c)).ToList();
        }
    }
}
