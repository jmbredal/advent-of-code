using AoC;
using System.Linq;

namespace Solvers
{
    public class Day08Solver : ISolver
    {

        public List<int[]> GridHorizontal = new List<int[]>();
        public List<int[]> GridVertical = new List<int[]>();

        public Day08Solver()
        {
            BuildGrid();
        }

        void BuildGrid()
        {
            var lines = SolverUtils.GetLines<string>("day08/input").ToList();
            foreach (var line in lines)
            {
                GridHorizontal.Add(line.Select(c => (int)Char.GetNumericValue(c)).ToArray());
            }

            for (int x = 0; x < lines[0].Length; x++)
            {
                var temp = new List<int>();
                for (int y = 0; y < lines.Count; y++)
                {
                    temp.Add((int)Char.GetNumericValue(lines[y][x]));
                }

                GridVertical.Add(temp.ToArray());
            }
        }

        public void Solve1()
        {
            var counter = 0;

            for (int y = 0; y < GridHorizontal.Count; y++)
            {
                for (int x = 0; x < GridHorizontal[0].Length; x++)
                {
                    if (IsVisible(x, y))
                    {
                        counter++;
                    }
                }
            }

            Console.WriteLine($"Visible trees: {counter}");
        }

        public void Solve2()
        {
            var max = 0;
            for (int y = 0; y < GridHorizontal.Count; y++)
            {
                for (int x = 0; x < GridHorizontal[0].Length; x++)
                {
                    var score = GetScore(x, y);
                    //Console.WriteLine($"Score: {x} {y} {score}");

                    max = score > max ? score : max;
                }
            }

            Console.WriteLine($"Max score: {max}");
        }

        bool IsEdge(int x, int y)
        {
            var maxX = GridHorizontal[0].Length - 1;
            var maxY = GridVertical[0].Length - 1;
            if (x == 0 || x == maxX || y == 0 || y == maxY)
            {
                return true;
            }

            return false;
        }

        bool IsVisible(int x, int y)
        {
            if (IsEdge(x, y))
            {
                return true;
            }

            // Target tree
            var target = GridVertical[x][y];

            var leftMax = GridHorizontal[y][0..x].Max();
            var rightMax = GridHorizontal[y][(x + 1)..^0].Max();
            var topMax = GridVertical[x][0..y].Max();
            var bottomMax = GridVertical[x][(y + 1)..^0].Max();

            var maxes = new List<int>() { leftMax, rightMax, topMax, bottomMax };

            // If max of all trees in any direction is less than target height, it is visible
            return maxes.Any(m => m < target);
        }

        int GetScore(int x, int y)
        {
            if (IsEdge(x, y))
            {
                return 0;
            }

            var counterLeft = 0;
            var counterRight = 0;
            var counterTop = 0;
            var counterBottom = 0;

            var currentTreeHeight = GridHorizontal[y][x];

            // Look left
            for (int i = x - 1; i >= 0; i--)
            {
                counterLeft++;

                if (GridHorizontal[y][i] >= currentTreeHeight)
                {
                    break;
                }
            }

            // Look right
            for (int i = x + 1; i < GridHorizontal[0].Length; i++)
            {
                counterRight++;

                if (GridHorizontal[y][i] >= currentTreeHeight)
                {
                    break;
                }
            }

            // Look north
            for (int i = y - 1; i >= 0; i--)
            {
                counterTop++;

                if (GridVertical[x][i] >= currentTreeHeight)
                {
                    break;
                }
            }

            // Look south
            for (int i = y + 1; i < GridVertical[0].Length; i++)
            {
                counterBottom++;

                if (GridVertical[x][i] >= currentTreeHeight)
                {
                    break;
                }
            }

            var score = counterLeft * counterRight * counterTop * counterBottom;
            return score;
        }
    }
}
