using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

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
    }
}
