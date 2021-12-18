using System;
using System.Collections.Generic;
using System.Linq;
using AdventOfCode;

namespace Solvers
{

    public class Day06Solver
    {
        public List<string> TestData { get; set; }
        public List<string> RealData { get; set; }

        public Day06Solver()
        {
            TestData = SolverUtils.ParseFile("day06/testdata");
            RealData = SolverUtils.ParseFile("day06/input", true);

            SolveTask1(TestData);
            SolveTask1(RealData);
            SolveTask2(TestData);
            SolveTask2(RealData);
        }

        public void SolveTask1(List<string> data)
        {
            var buckets = InitializeBuckets(data);
            Simulate(80, buckets);
            Console.WriteLine($"After 80 days: {buckets.Values.Sum()} fish");
        }

        public void SolveTask2(List<string> data)
        {
            var buckets = InitializeBuckets(data);
            Simulate(256, buckets);
            Console.WriteLine($"After 256 days: {buckets.Values.Sum()} fish");
        }

        private Dictionary<int, double> InitializeBuckets(List<string> data)
        {
            var buckets = new Dictionary<int, double>();
            for (int i = 0; i < 9; i++)
            {
                buckets[i] = 0;
            }

            // Fill with initial values
            data[0].Split(",").Select(Int32.Parse).ToList().ForEach(n => buckets[n]++);
            return buckets;
        }

        private void Simulate(int days, Dictionary<int, double> buckets)
        {
            for (int i = 0; i < days; i++)
            {
                Step(buckets);
            }
        }

        private void Step(Dictionary<int, double> buckets)
        {
            var spawn = buckets[0];
            for (int i = 0; i < 8; i++)
            {
                buckets[i] = buckets[i + 1];
            }
            buckets[6] += spawn;
            buckets[8] = spawn;
        }

    }
}
