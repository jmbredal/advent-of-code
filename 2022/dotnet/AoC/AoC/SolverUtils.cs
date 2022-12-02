namespace AoC
{
    public static class SolverUtils
    {
        public static List<string> ParseFile(string filename, bool filterNullLines = false, bool unixStyle = false)
        {
            IEnumerable<string> lines;
            if (unixStyle)
            {
                lines = File.ReadAllText(filename).Split('\n');
            }
            else
            {
                lines = File.ReadAllText(filename).Split(Environment.NewLine);
            }

            return filterNullLines 
                ? lines.Where(l => !string.IsNullOrEmpty(l)).ToList()
                : lines.ToList();
        }

        public static List<List<T>> GroupLines<T>(List<string> lines)
        {
            var groups = new List<List<T>>();
            var group = new List<T>();

            lines.ForEach((line) =>
            {
                if (line == "")
                {
                    groups.Add(group);
                    group = new List<T>();
                }
                else
                {
                    var value = (T) Convert.ChangeType(line, typeof(T));
                    group.Add(value);
                }
            });
            groups.Add(group);

            return groups;
        }
    }
}
