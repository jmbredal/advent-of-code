using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;

namespace Day02
{

    public class Instruction
    {
        public string Action { get; set; }
        public int Value { get; set; }
    }

    public class Position
    {
        public int Horizontal { get; set; }
        public int Depth { get; set; }
        public int Aim { get; set; }
    }

    public class Day02Solver
    {
        public List<Instruction> TestData { get; set; }
        public List<Instruction> RealData { get; set; }

        public Day02Solver()
        {
            TestData = ParseFile("day02/testdata");
            RealData = ParseFile("day02/input");

            SolveTask1();
            SolveTask2();
        }

        public static List<Instruction> ParseFile(string filename)
        {
            return File.ReadAllLines(filename).Select(line =>
            {
                var parts = line.Split(" ");
                return new Instruction
                {
                    Action = parts[0],
                    Value = Int32.Parse(parts[1])
                };
            }).ToList();
        }

        public void SolveTask1()
        {
            var testPosition = GetPosition(TestData);
            var realPosition = GetPosition(RealData);
            Console.WriteLine("Task 1 test: {0}", testPosition.Horizontal * testPosition.Depth);
            Console.WriteLine("Task 1 real: {0}", realPosition.Horizontal * realPosition.Depth);
        }

        public void SolveTask2()
        {
            var testPosition = GetPositionWithAim(TestData);
            var realPosition = GetPositionWithAim(RealData);
            Console.WriteLine("Task 2 test: {0}", testPosition.Horizontal * testPosition.Depth);
            Console.WriteLine("Task 2 real: {0}", realPosition.Horizontal * realPosition.Depth);
        }

        private Position GetPosition(List<Instruction> instructions)
        {
            var position = new Position
            {
                Horizontal = 0,
                Depth = 0,
            };

            instructions.ForEach(instruction =>
            {
                switch (instruction.Action)
                {
                    case "forward":
                        position.Horizontal += instruction.Value;
                        break;
                    case "down":
                        position.Depth += instruction.Value;
                        break;
                    case "up":
                        position.Depth -= instruction.Value;
                        break;
                };
            });

            return position;
        }

        private Position GetPositionWithAim(List<Instruction> instructions)
        {
            var position = new Position
            {
                Horizontal = 0,
                Depth = 0,
                Aim = 0,
            };

            instructions.ForEach(instruction =>
            {
                switch (instruction.Action)
                {
                    case "forward":
                        position.Horizontal += instruction.Value;
                        position.Depth += position.Aim * instruction.Value;
                        break;
                    case "down":
                        position.Aim += instruction.Value;
                        break;
                    case "up":
                        position.Aim -= instruction.Value;
                        break;
                };
            });

            return position;
        }
    }
}
