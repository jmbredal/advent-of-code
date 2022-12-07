using AoC;

namespace Solvers
{

    class File
    {
        public string Name { get; set; }
        public long Size { get; set; }
        public File(string name, long size)
        {
            Name = name;
            Size = size;
        }
    }

    class Dir
    {
        public string Name { get; set; }
        public List<File> Files { get; set; }
        public List<Dir> Subdirs { get; set; }
        public long TotalSize { get; set; }

        public long Size => Files.Select(f => f.Size).Sum();

        public Dir(string dirName)
        {
            Name = dirName;
            Subdirs = new List<Dir>();
            Files = new List<File>();
        }
    }

    public class Day07Solver : ISolver
    {
        public void Solve1()
        {
            var root = new Dir("/");
            var allDirs = BuildTree(root);
            var sum = allDirs
                .Where(d => d.TotalSize <= 100000)
                .Select(d => d.TotalSize)
                .Sum();
            
            Console.WriteLine(sum);
        }

        public void Solve2()
        {
            var root = new Dir("/");
            var allDirs = BuildTree(root);

            var maxSum = 70000000;
            var target = 30000000;
            var currentSize = maxSum - root.TotalSize;
            var needed = target - currentSize;

            var smallest = allDirs
                .Where(d => d.TotalSize >= needed)
                .Select(d => d.TotalSize)
                .Min();

            Console.WriteLine(smallest);
        }

        List<Dir> BuildTree(Dir root)
        {
            var lines = SolverUtils.GetLines<string>("day07/input");
            var stack = new Stack<Dir>();

            foreach (var line in lines)
            {
                if (line.StartsWith("$"))
                {
                    // Sets stack, creates dirs
                    ParseCommand(stack, root, line);
                }
                else
                {
                    // Adds subdirs and files
                    ParseListing(stack, line);
                }
            }

            // Updates totalsize for all dirs
            SetTotalSize(root);

            // Returns a list of all dirs
            return GetAllDirs(new List<Dir>(), root);
        }

        void ParseCommand(Stack<Dir> stack, Dir root, string line)
        {
            var parts = line.Split(' ');
            if (parts.Length != 3) return;

            // This is a 'cd dir'
            var dirName = parts[2];
            switch (dirName)
            {
                case "/":
                    stack.Clear();
                    stack.Push(root);
                    break;
                case "..":
                    stack.Pop();
                    break;
                default:
                    var currentdir = stack.Peek();
                    var nextDir = currentdir.Subdirs.Find(d => d.Name == dirName)
                        ?? new Dir(dirName);
                    stack.Push(nextDir);
                    break;
            }
        }

        void ParseListing(Stack<Dir> stack, string line)
        {
            var dir = stack.Peek();
            var parts = line.Split(' ');
            var name = parts[1];

            // Add content
            if (parts[0] == "dir")
            {
                var hasDir = dir.Subdirs.Any(d => d.Name == name);
                if (!hasDir)
                {
                    dir.Subdirs.Add(new Dir(name));
                }
            }
            else
            {
                // its a file
                var hasFile = dir.Files.Any(d => d.Name == name);
                if (!hasFile)
                {
                    var fileSize = Int32.Parse(parts[0]);
                    dir.Files.Add(new File(name, fileSize));
                }
            }
        }

        long SetTotalSize(Dir dir)
        {
            var subdirsize = 0L;
            foreach (var subdir in dir.Subdirs)
            {
                subdirsize += SetTotalSize(subdir);
            }

            dir.TotalSize = dir.Size + subdirsize;

            return dir.TotalSize;
        }

        List<Dir> GetAllDirs(List<Dir> dirs, Dir dir)
        {
            dirs.Add(dir);

            foreach (var _dir in dir.Subdirs)
            {
                GetAllDirs(dirs, _dir);
            }

            return dirs;
        }

    }
}
