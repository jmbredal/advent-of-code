using AoC;

using System.Linq;
using System.Reflection;

namespace Solvers
{
    public class Day09Solver : ISolver
    {

        public List<List<(int x, int y)>> Snake { get; set; } = new();

        public Day09Solver()
        {
        }

        public void Solve1()
        {
            var headMoves = new List<(int x, int y)> { (0, 0) };
            var tailMoves = new List<(int x, int y)> { (0, 0) };
            var snake = new List<List<(int x, int y)>> { headMoves, tailMoves };
            var lines = SolverUtils.GetLines<string>("day09/input").ToList();

            lines.ForEach(line => HandleLine(line, snake));
            UpdatePositions(snake);

            var positions = snake.Last().Distinct().Count();

            Console.WriteLine($"Positions: {positions}");
        }

        public void Solve2()
        {
            var headMoves = new List<(int x, int y)> { (0, 0) };
            var snake = new List<List<(int x, int y)>> { headMoves };

            for (int i = 0; i < 9; i++)
            {
                snake.Add(new List<(int x, int y)> { (0, 0) });
            }

            var lines = SolverUtils.GetLines<string>("day09/input").ToList();

            lines.ForEach(line => HandleLine(line, snake));
            UpdatePositions(snake);

            var positions = snake.Last().Distinct().Count();

            Console.WriteLine($"Positions: {positions}");
            Console.WriteLine($"head {snake[0].Last()}");
        }

        void UpdatePositions(List<List<(int x, int y)>> snake)
        {
            var moves = snake[0];
            moves.ForEach(headMove =>
            {
                //Console.WriteLine(headMove);
                // for each element in the snake, move it according to the leader
                for (int i = 1; i < snake.Count; i++)
                {
                    var part = snake[i];
                    var myPos = part.Last();
                    var leaderPos = i == 1 ? headMove : snake[i - 1].Last();

                    var move = GetMove(myPos, leaderPos);
                    if (move.HasValue)
                    {
                        //Console.WriteLine($"Moving to {move.Value}");
                        part.Add(move.Value);
                    }
                }
            });

        }

        void HandleLine(string line, List<List<(int x, int y)>> snake)
        {
            var lineParts = line.Split(' ');
            var dir = lineParts[0];
            var count = Int32.Parse(lineParts[1]);

            var headMoves = snake[0];

            for (int i = 0; i < count; i++)
            {
                headMoves.Add(GetHeadMove(dir, headMoves.Last()));
            }
        }

        (int x, int y) GetHeadMove(string dir, (int x, int y) prevMove)
        {
            return dir switch
            {
                "R" => (prevMove.x + 1, prevMove.y),
                "U" => (prevMove.x, prevMove.y + 1),
                "L" => (prevMove.x - 1, prevMove.y),
                "D" => (prevMove.x, prevMove.y - 1),
                _ => throw new NotImplementedException(),
            };
        }

        (int x, int y)? GetMove((int x, int y) followerPos, (int x, int y) leaderPos)
        {
            var (followerX, followerY) = followerPos;
            var (leaderX, leaderY) = leaderPos;

            var x = followerX;
            var y = followerY;

            if (leaderX - followerX > 1)
            {
                x++;
                if (leaderY > followerY) y++;
                if (leaderY < followerY) y--;
                return (x, y);
            }

            if (followerX - leaderX > 1)
            {
                x--;
                if (leaderY > followerY) y++;
                if (leaderY < followerY) y--;
                return (x, y);
            }

            if (leaderY - followerY > 1)
            {
                y++;
                if (leaderX > followerX) x++;
                if (leaderX < followerX) x--;
                return (x, y);
            }

            if (followerY - leaderY > 1)
            {
                y--;
                if (leaderX > followerX) x++;
                if (leaderX < followerX) x--;
                return (x, y);
            }

            return null;
        }
    }
}
