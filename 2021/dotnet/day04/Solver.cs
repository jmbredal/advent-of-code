using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;

namespace Solvers
{
    class Card
    {
        public List<int[]> Rows { get; set; }
        public List<int[]> Columns {
            get {
                var columns = new List<int[]>();
                for (var i = 0; i < 5; i++)
                {
                    var column = Rows.Select(r => r[i]).ToArray();
                    columns.Add(column);
                }
                return columns;
            }
        }
        
        public Card(IEnumerable<string> lines) {
            Rows = lines.Select(line => {
                var row = line.Split(" ", StringSplitOptions.RemoveEmptyEntries).Select(cell => Int32.Parse(cell)).ToArray();
                return row;
            }).ToList();
        }

        public void Update(int number)
        {
            Rows = Rows.Select(row => row.Select(n => n == number ? 0 : n).ToArray()).ToList();
        }

        public bool HasBingo()
        {
            return Rows.Any(row => row.Sum() == 0) || Columns.Any(column => column.Sum() == 0);
        }

        public int Sum()
        {
            return Rows.Select(r => r.Sum()).Sum();
        }
    }

    public class Day04Solver
    {
        public List<string> TestData { get; set; }
        public List<string> RealData { get; set; }

        public Day04Solver()
        {
            TestData = ParseFile("day04/testdata");
            RealData = ParseFile("day04/input", true);

            SolveTask1(TestData);
            SolveTask1(RealData);
            // SolveTask2(TestData);
            // SolveTask2(RealData);
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
            var numbers = data.First().Split(',').Select(c => Int32.Parse(c)).ToList();
            var rest = data.Skip(2);

            var cards = new List<Card>();
            while (rest.Count() >= 5 ) {
                var cardLines = rest.Take(5);
                cards.Add(new Card(cardLines));
                rest = rest.Skip(6);
            }

            for (int i = 0; i < numbers.Count(); i++)
            {
                var number = numbers[i];
                cards.ForEach(c => c.Update(number));
                var card = cards.SingleOrDefault(c => c.HasBingo());

                if (card != null) {
                    Console.WriteLine("Task 1: {0}", card.Sum() * number);
                    break;
                }
            }
        }

        public void SolveTask2(List<string> data)
        {
            Console.WriteLine("Task 2: {0}");
        }
    }
}
