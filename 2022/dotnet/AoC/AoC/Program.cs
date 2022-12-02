// See https://aka.ms/new-console-template for more information
using Solvers;
using System.ComponentModel.DataAnnotations;

namespace Solvers
{
    interface Solver
    {
        void Solve1();
        void Solve2();
    }

    public class Runner
    {
        public static void Main()
        {
            var solvers = new List<Solver>() {
                //new Day01Solver(),
                //new Day02Solver(),
                new Day03Solver(),
            };

            solvers.ForEach(s =>
            {
                Console.WriteLine($"{s.GetType()}");
                Console.WriteLine("-------------------\n");

                Console.WriteLine("Task 1");
                s.Solve1();

                Console.WriteLine("");

                Console.WriteLine("Task 2");
                s.Solve2();

                Console.WriteLine("");
            });

        }
    }
}

