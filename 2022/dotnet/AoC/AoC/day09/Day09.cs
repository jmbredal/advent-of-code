using AoC;
using System.ComponentModel.DataAnnotations;
using System.Globalization;
using System.Security.Cryptography.X509Certificates;

namespace Solvers
{
    public class Day09Solver : ISolver
    {

        public Day09Solver()
        {
        }

        public void Solve1()
        {
            var lines = SolverUtils.GetLines<string>("day09/input").ToList();
            Run(lines);
        }

        public void Solve2()
        {
        }

        void Run(List<string> lines)
        {
            var headPositions = new List<(int x, int y)>
            {
                (0, 0),
            };

            var tailPositions = new List<(int x, int y)>
            {
                (0, 0),
            };

            lines.ForEach(line =>
            {
                var parts = line.Split(' ');
                var moveCount = Int32.Parse(parts[1]);
                var dir = parts[0];

                switch (dir)
                {
                    case "R":
                        for (int i = 0; i < moveCount; i++)
                        {
                            var lastPos = headPositions.Last();
                            var newPos = (lastPos.x + 1, lastPos.y);
                            headPositions.Add(newPos);

                            if (MustFollow(newPos, tailPositions.Last()))
                            {
                                tailPositions.Add(lastPos);
                            }
                        }
                        break;
                    case "L":
                        for (int i = 0; i < moveCount; i++)
                        {
                            var lastPos = headPositions.Last();
                            var newPos = (lastPos.x - 1, lastPos.y);
                            headPositions.Add(newPos);

                            if (MustFollow(newPos, tailPositions.Last()))
                            {
                                tailPositions.Add(lastPos);
                            }
                        }
                        break;
                    case "U":
                        for (int i = 0; i < moveCount; i++)
                        {
                            var lastPos = headPositions.Last();
                            var newPos = (lastPos.x, lastPos.y + 1);
                            headPositions.Add(newPos);

                            if (MustFollow(newPos, tailPositions.Last()))
                            {
                                tailPositions.Add(lastPos);
                            }
                        }
                        break;
                    case "D":
                        for (int i = 0; i < moveCount; i++)
                        {
                            var lastPos = headPositions.Last();
                            var newPos = (lastPos.x, lastPos.y - 1);
                            headPositions.Add(newPos);

                            if (MustFollow(newPos, tailPositions.Last()))
                            {
                                tailPositions.Add(lastPos);
                            }
                        }
                        break;
                }
            });

            headPositions.ForEach(p =>
            {
                Console.WriteLine(p);
            });

            Console.WriteLine("-");

            tailPositions.ForEach(p =>
            {
                Console.WriteLine(p);
            });

            Console.WriteLine(tailPositions.Distinct().Count());
        }

        bool MustFollow((int x, int y) head, (int x, int y) tail)
        {
            var (xHead, yHead) = head;
            var (xTail, yTail) = tail;

            return Math.Abs(xHead - xTail) > 1 || Math.Abs(yHead - yTail) > 1;
        }

    }
}
