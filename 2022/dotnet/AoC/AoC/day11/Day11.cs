using AoC;
using System.Text.RegularExpressions;

namespace Solvers
{
    class Monkey
    {
        public Queue<long> Items { get; set; }
        public Func<long, long> Operation { get; set; }
        public Predicate<long> Test { get; set; }
        public int Denominator { get; set; }
        public (int t, int f) Targets { get; set; }
        public int InspectCounter { get; set; } = 0;

        public Monkey(Queue<long> items, Func<long, long> operation, Predicate<long> test, int denominator, (int t, int f) targets)
        {
            Items = items;
            Operation = operation;
            Test = test;
            Denominator = denominator;
            Targets = targets;
        }
    }

    // https://adventofcode.com/2022/day/11
    
    public class Day11Solver : ISolver
    {
        private List<List<string>> MonkeyDescriptions { get; set; }

        public Day11Solver()
        {
            var lines = SolverUtils.GetLines<string>("day11/input", filterNullLines: false).ToList();
            MonkeyDescriptions = SolverUtils.GroupLines<string>(lines);
        }

        public void Solve1()
        {
            var monkeys = MonkeyDescriptions.Select(CreateMonkey).ToList();
            Action<Monkey> handleMonkey = monkey => HandleItems(monkeys, monkey);

            var rounds = 20;
            for (int i = 0; i < rounds; i++)
            {
                monkeys.ForEach(handleMonkey);
            }

            Console.WriteLine($"Business: {GetBusiness(monkeys)}");
        }

        void HandleItems(List<Monkey> monkeys, Monkey monkey)
        {
            while (monkey.Items.Count > 0)
            {
                monkey.InspectCounter++;
                var item = monkey.Items.Dequeue();
                var worry = monkey.Operation(item);
                worry = (int)Math.Floor(worry / 3.0);

                var target = monkey.Test(worry) ? monkey.Targets.t : monkey.Targets.f;

                monkeys[target].Items.Enqueue(worry);
            }
        }

        public void Solve2()
        {
            var monkeys = MonkeyDescriptions.Select(CreateMonkey).ToList();
            var commonDenominator = monkeys.Select(m => m.Denominator).Aggregate(1, (product, factor) => product * factor);
            Action<Monkey> handleMonkey = monkey => HandleItems2(monkeys, monkey, commonDenominator);

            var rounds = 10000;
            for (int i = 0; i < rounds; i++)
            {
                monkeys.ForEach(handleMonkey);
            }

            Console.WriteLine($"Business: {GetBusiness(monkeys)}");
        }

        void HandleItems2(List<Monkey> monkeys, Monkey monkey, int commonDenominator)
        {
            while (monkey.Items.Count > 0)
            {
                monkey.InspectCounter++;
                var item = monkey.Items.Dequeue();
                var worry = monkey.Operation(item) % commonDenominator;
                var target = monkey.Test(worry) ? monkey.Targets.t : monkey.Targets.f;

                monkeys[target].Items.Enqueue(worry);
            }
        }

        long GetBusiness(List<Monkey> monkeys)
        {
            return monkeys.Select(m => m.InspectCounter)
                .OrderBy(i => i)
                .TakeLast(2)
                .Aggregate((long)1, (acc, curr) => acc * curr);
        }

        Monkey CreateMonkey(List<string> lines)
        {
            var numberRegex = new Regex(@"(\d+)");

            // Add starting items
            var matches = numberRegex.Matches(lines[1]);
            var items = matches.Select(m => Int32.Parse(m.Value));

            var queue = new Queue<long>();
            foreach (var item in items)
            {
                queue.Enqueue(item);
            }

            // Add operation
            var parts = lines[2].Split(' ');
            var op = parts[6];
            var factor = parts[7];
            Func<long, long> oper = old =>
            {
                var value = factor == "old" ? old : int.Parse(factor);

                return op switch
                {
                    "*" => old * value,
                    "+" => old + value,
                    "-" => old - value,
                    _ => throw new NotImplementedException(),
                };
            };

            // Add test
            var match = numberRegex.Match(lines[3]);
            var divisibleByNumber = int.Parse(match.Groups[0].Value);
            Predicate<long> test = i => i % divisibleByNumber == 0;

            // set target if true
            var truematch = numberRegex.Match(lines[4]);
            var trueTarget = int.Parse(truematch.Groups[0].Value);

            // set target if false
            var falsematch = numberRegex.Match(lines[5]);
            var falseTarget = int.Parse(falsematch.Groups[0].Value);

            return new Monkey(queue, oper, test, divisibleByNumber, (trueTarget, falseTarget));
        }

    }
}
