using AoC;

namespace Solvers
{
    public class Day02Solver: ISolver
    {
        public void Solve1()
        {
            // A, X =  ROCK, B Y = PAPER, C Z Scissors
            var input = SolverUtils.ParseFile("day02/input").Where((x) => x != "");
            var sum = input.Select(Score).Sum();
            Console.WriteLine(sum);
        }

        public void Solve2()
        {
            // A, X =  ROCK, B Y = PAPER, C Z Scissors
            var input = SolverUtils.ParseFile("day02/input").Where((x) => x != "");
            var sum = input.Select(Score2).Sum();
            Console.WriteLine(sum);
        }

        public int Score(string game)
        {
            var wins = new List<string> { "A Y", "B Z", "C X" };
            var draws = new List<string> { "A X", "B Y", "C Z" };
            var losses = new List<string> { "A Z", "B X", "C Y" };
            var handScore = new Dictionary<char, int>
            {
                { 'X', 1 },
                { 'Y', 2 },
                { 'Z', 3 }
            };

            if (wins.Contains(game))
            {
                return 6 + handScore[game[2]];
            }
            if (draws.Contains(game))
            {
                return 3 + handScore[game[2]];
            }
            if (losses.Contains(game))
            {
                return 0 + handScore[game[2]];
            }
         
            return 0;
        }

        public int Score2(string game)
        {
            var handScore = new Dictionary<string, int>();
            // x lose, y, draw,  z win
            handScore.Add("A X", 3); // Z
            handScore.Add("B X", 1); // X
            handScore.Add("C X", 2); // Y

            handScore.Add("A Y", 4); //
            handScore.Add("B Y", 5);
            handScore.Add("C Y", 6);

            handScore.Add("A Z", 8); // Y
            handScore.Add("B Z", 9); // Z
            handScore.Add("C Z", 7); // X

            return handScore[game];
        }
    }
}
