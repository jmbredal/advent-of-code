using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;

namespace Solvers
{
    public class Day01Solver
    {
        public List<int> TestData { get; set; }
        public List<int> RealData { get; set; }

        public Day01Solver()
        {
            TestData = File.ReadAllLines("day01/testdata").Select(line => Int32.Parse(line)).ToList();
            RealData = File.ReadAllLines("day01/input").Select(line => Int32.Parse(line)).ToList();

            SolveTask1();
            SolveTask2();
        }

        public void SolveTask1()
        {
            var testCounter = GetCounter(TestData);
            var realCounter = GetCounter(RealData);

            Console.WriteLine("Task 1 test: {0}", testCounter);
            Console.WriteLine("Task 1 real: {0}", realCounter);
        }

        public void SolveTask2()
        {
            var testCounter = GetWindowCounter(TestData);
            var realCounter = GetWindowCounter(RealData);

            Console.WriteLine("Task 2 test: {0}", testCounter);
            Console.WriteLine("Task 2 real: {0}", realCounter);
        }

        public static int GetCounter(List<int> lines)
        {
            var counter = 0;
            for (int i = 0; i < lines.Count; i++)
            {
                if (i == 0) continue;

                if (lines[i] > lines[i - 1])
                {
                    counter++;
                }
            }

            return counter;
        }

        public static int GetWindowCounter(List<int> lines)
        {
            var counter = 0;
            for (int i = 3; i < lines.Count; i++)
            {
                var startIndex = i - 3;
                var previous = lines.GetRange(startIndex, 3).Sum();
                var current = lines.GetRange(startIndex + 1, 3).Sum();
                if (current > previous)
                {
                    counter++;
                }
            }

            return counter;
        }
    }
}
