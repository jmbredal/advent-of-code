using AoC;

using System.Linq;
using System.Reflection;

namespace Solvers
{
    public class Day10Solver : ISolver
    {

        public Day10Solver()
        {

        }

        public void Solve1()
        {
            var lines = SolverUtils.GetLines<string>("day10/input").ToList();

            var x = 1;
            var clockticks = 0;
            var linecounter = 0;
            var memory = new Stack<string>() { };
            var reportTicks = new List<int> { 20, 60, 100, 140, 180, 220 };

            var strengths = new List<int>();
            while (linecounter < lines.Count)
            {
                clockticks++;
                var parts = lines[linecounter].Split(" ");
                var operation = parts[0];

                if (reportTicks.Contains(clockticks))
                {
                    var strength = clockticks * x;
                    strengths.Add(strength);
                    Console.WriteLine($"{clockticks} x: {x}, signal strength: {strength}");
                }

                if (operation == "noop")
                {
                    linecounter++;
                }

                if (operation == "addx")
                {
                    if (memory.Count == 0)
                    {
                        memory.Push(parts[1]);
                    }
                    else
                    {
                        var value = memory.Pop();
                        x += Int32.Parse(value);
                        linecounter++;
                    }
                }
            }

            var sum = strengths.Sum();
            Console.WriteLine($"Sum: {sum}");
        }

        public void Solve2()
        {
            var lines = SolverUtils.GetLines<string>("day10/input").ToList();

            var x = 1;
            var clockticks = 0;
            var linecounter = 0;
            var memory = new Stack<string>() { };
            var printer = "";
            while (linecounter < lines.Count)
            {
                var pixel = clockticks % 40;
                clockticks++;

                var parts = lines[linecounter].Split(" ");
                var operation = parts[0];

                var sprite = new List<int> {x - 1, x, x + 1};
                if (sprite.Contains(pixel))
                {
                    printer += "#";
                }
                else
                {
                    printer += ".";
                }

                if (pixel == 39)
                {
                    Console.WriteLine(printer);
                    printer = "";
                }

                if (operation == "noop")
                {
                    linecounter++;
                }

                if (operation == "addx")
                {
                    if (memory.Count == 0)
                    {
                        memory.Push(parts[1]);
                    }
                    else
                    {
                        var value = memory.Pop();
                        x += Int32.Parse(value);
                        linecounter++;
                    }
                }
            }
        }

    }
}
