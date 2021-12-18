
using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;

namespace AdventOfCode {
    public static class SolverUtils {
        public static List<string> ParseFile(string filename, bool unixStyle=false)
        {
            IEnumerable<string> lines;
            if (unixStyle) {
                lines = File.ReadAllText(filename).Split('\n');
            } else {
                lines = File.ReadAllText(filename).Split(Environment.NewLine);
            }
            return lines.Where(l => !string.IsNullOrEmpty(l)).ToList();
        }
    }
}
