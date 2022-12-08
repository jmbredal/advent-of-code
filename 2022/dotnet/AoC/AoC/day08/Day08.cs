using AoC;

namespace Solvers
{
    public class Day08Solver : ISolver
    {

        public List<int[]> GridHorizontal = new();
        public List<int[]> GridVertical = new();
        public List<(int x, int y)> Coords = new();
        public int Width = 0;
        public int Height = 0;

        public Day08Solver()
        {
            BuildGrid();
            BuildCoords();
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

            Width = GridVertical.Count;
            Height = GridHorizontal.Count;
        }

        void BuildCoords()
        {
            for (int y = 0; y < GridHorizontal.Count; y++)
            {
                for (int x = 0; x < GridHorizontal[0].Length; x++)
                {
                    Coords.Add((x, y));
                }
            }
        }

        public void Solve1()
        {
            var numVisible = Coords.Where(IsVisible).Count();

            Console.WriteLine($"Visible trees: {numVisible}");
        }

        public void Solve2()
        {
            var maxScore = Coords.Select(GetScore).Max();

            Console.WriteLine($"Max score: {maxScore}");
        }

        bool IsEdge(int x, int y)
        {
            var maxX = Width - 1;
            var maxY = Height - 1;
            if (x == 0 || x == maxX || y == 0 || y == maxY)
            {
                return true;
            }

            return false;
        }

        bool IsVisible((int x, int y) tuple)
        {
            var (x, y) = tuple;

            if (IsEdge(x, y)) return true;

            // If max height of trees in any direction is less than target height, it is visible
            return new List<int>() {
                GridHorizontal[y][0..x].Max(), // west
                GridHorizontal[y][(x + 1)..^0].Max(),  // east 
                GridVertical[x][0..y].Max(),  // north 
                GridVertical[x][(y + 1)..^0].Max(), // south
            }.Any(m => m < GridVertical[x][y]);
        }

        int GetScore((int x, int y) tuple)
        {
            var (x, y) = tuple;

            if (IsEdge(x, y)) return 0;

            var currentTreeHeight = GridHorizontal[y][x];
            Predicate<int> IsBlocking = h => h >= currentTreeHeight;
            Func<int[], int> GetTreeVisibility = trees => GetVisibility(IsBlocking, trees);

            // Get tree visibility in all directions and find score
            return new List<int[]>
            {
                GridHorizontal[y][0..x].Reverse().ToArray(), // west
                GridHorizontal[y][(x + 1)..^0], // east
                GridVertical[x][0..y].Reverse().ToArray(), // north
                GridVertical[x][(y + 1)..^0],  // south
            }.Select(GetTreeVisibility)
             .Aggregate(1, (totalScore, score) => totalScore * score);
        }

        int GetVisibility(Predicate<int> pred, int[] trees)
        {
            var index = trees.ToList().FindIndex(pred);
            
            return index < 0 ? trees.Length : index + 1;
        }
    }
}
